import {type IAbortSignalFast} from '@flemist/abort-controller-fast'
import {CustomPromise, promiseToAbortable} from '@flemist/async-utils'
import {
  Priority,
  type IPriorityQueue,
  PriorityQueue,
  type AwaitPriority,
  awaitPriorityDefault,
} from '@flemist/priority-queue'

export interface IPool {
  readonly size: number
  readonly maxSize: number
  readonly holdCount: number

  holdAvailable: number

  hold(count: number): boolean

  /** it returns false if the obj cannot be pushed into the object pool (if size >= maxSize) */
  releaseAvailable: number

  release(count: number, dontThrow?: boolean): Promise<number> | number

  /** it will resolve when size > 0 */
  tick(abortSignal?: IAbortSignalFast): Promise<void> | void

  /** wait size > 0 and hold, use this for concurrency hold */
  holdWait(
    count: number,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
    awaitPriority?: AwaitPriority,
  ): Promise<void>
}

// export interface IPoolSync extends IPool {
//   release(count: number): number
// }

export class Pool implements IPool {
  private readonly _priorityQueue: IPriorityQueue
  private readonly _maxSize: number = 0
  private _size: number = 0

  constructor(maxSize: number) {
    if (!maxSize) {
      throw new Error('maxSize should be > 0')
    }
    this._maxSize = maxSize
    this._size = maxSize
    this._priorityQueue = new PriorityQueue()
  }

  get maxSize() {
    return this._maxSize
  }

  get size() {
    return this._size
  }

  get holdCount() {
    return this._maxSize - this._size
  }

  get holdAvailable() {
    return this._size
  }

  hold(count: number): boolean {
    const size = this._size
    if (count > size) {
      return false
    }
    this._size = size - count
    return true
  }

  get releaseAvailable() {
    return this._maxSize - this._size
  }

  release(count: number, dontThrow?: boolean): number {
    const size = this._size
    const maxReleaseCount = this._maxSize - size
    if (count > maxReleaseCount) {
      if (dontThrow) {
        count = maxReleaseCount
      }
      else {
        throw new Error(`count (${count} > maxReleaseCount (${maxReleaseCount}))`)
      }
    }
    if (count > 0) {
      this._size = size + count

      if (this._tickPromise) {
        const tickPromise = this._tickPromise
        this._tickPromise = null
        tickPromise.resolve()
      }
    }
    return count
  }

  private _tickPromise: CustomPromise = new CustomPromise()
  tick(abortSignal?: IAbortSignalFast): Promise<void> | void {
    if (this._size >= this._maxSize) {
      return
    }
    if (!this._tickPromise) {
      this._tickPromise = new CustomPromise()
    }
    return promiseToAbortable(abortSignal, this._tickPromise.promise)
  }

  holdWait(
    count: number,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
    awaitPriority?: AwaitPriority,
  ) {
    if (count > this._maxSize) {
      throw new Error(`holdCount (${count} > maxSize (${this._maxSize}))`)
    }

    if (!awaitPriority) {
      awaitPriority = awaitPriorityDefault
    }

    return this._priorityQueue.run(async (abortSignal) => {
      while (count > this._size) {
        await this.tick(abortSignal)
        await awaitPriority(priority, abortSignal)
      }
      if (!this.hold(count)) {
        throw new Error('Unexpected behavior')
      }
    }, priority, abortSignal)
  }
}

