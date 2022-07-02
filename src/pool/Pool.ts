import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {CustomPromise, promiseToAbortable} from '@flemist/async-utils'
import {Priority, IPriorityQueue} from '@flemist/priority-queue'

export interface IPool {
  readonly size: number
  readonly maxSize: number

  holdAvailable: number

  hold(count: number): boolean

  /** it returns false if the obj cannot be pushed into the object pool (if size >= maxSize) */
  releaseAvailable: number

  release(count: number): Promise<number> | number

  /** it will resolve when size > 0 */
  tick(abortSignal?: IAbortSignalFast): Promise<void>

  /** wait size > 0 and hold, use this for concurrency hold */
  holdWait(
    count: number,
    abortSignal?: IAbortSignalFast,
    priorityQueue?: IPriorityQueue,
    priority?: Priority,
  ): Promise<void>
}

export class Pool implements IPool {
  private readonly _maxSize: number = 0
  private _size: number = 0

  constructor(maxSize: number) {
    if (!maxSize) {
      throw new Error('maxSize should be > 0')
    }
    this._maxSize = maxSize
    this._size = maxSize
    this._tickFunc = (abortSignal?: IAbortSignalFast) => this.tick(abortSignal)
  }

  get maxSize() {
    return this._maxSize
  }

  get size() {
    return this._size
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
    return this.maxSize - this._size
  }

  release(count: number): number {
    const size = this._size
    const maxReleaseCount = this.maxSize - size
    if (count > maxReleaseCount) {
      count = maxReleaseCount
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

  private readonly _tickFunc: (abortSignal?: IAbortSignalFast) => Promise<void>
  private _tickPromise: CustomPromise<void> = new CustomPromise()
  tick(abortSignal?: IAbortSignalFast): Promise<void> {
    if (!this._tickPromise) {
      this._tickPromise = new CustomPromise()
    }
    return promiseToAbortable(abortSignal, this._tickPromise.promise)
  }

  async holdWait(
    count: number,
    abortSignal?: IAbortSignalFast,
    priorityQueue?: IPriorityQueue,
    priority?: Priority,
  ) {
    if (count > this.maxSize) {
      throw new Error(`holdCount (${count} > maxSize (${this.maxSize}))`)
    }

    if (priorityQueue) {
      await priorityQueue.run(null, priority, abortSignal)
    }

    while (count > this._size) {
      if (priorityQueue) {
        await priorityQueue.run(this._tickFunc, priority, abortSignal)
      }
      else {
        await this.tick(abortSignal)
      }
    }

    if (!this.hold(count)) {
      throw new Error('Unexpected behavior')
    }
  }
}
