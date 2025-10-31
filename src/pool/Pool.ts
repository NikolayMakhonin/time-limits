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
  readonly heldCountMax: number
  readonly heldCount: number
  readonly holdAvailable: number
  readonly releaseAvailable: number

  hold(count: number): boolean
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
  private readonly _heldCountMax: number = 0
  private _heldCount: number = 0

  constructor(heldCountMax: number) {
    if (!heldCountMax) {
      throw new Error('heldCountMax should be > 0')
    }
    this._heldCountMax = heldCountMax
    this._priorityQueue = new PriorityQueue()
  }

  get heldCountMax() {
    return this._heldCountMax
  }

  get heldCount() {
    return this._heldCount
  }

  get holdAvailable() {
    return Math.max(0, this._heldCountMax - this._heldCount)
  }

  get releaseAvailable() {
    return this._heldCount
  }

  hold(count: number): boolean {
    const heldCount = this._heldCount
    if (heldCount !== 0 && count > this.holdAvailable) {
      return false
    }
    this._heldCount = heldCount + count
    return true
  }

  release(count: number, dontThrow?: boolean): number {
    const heldCount = this._heldCount
    if (count > heldCount) {
      if (dontThrow) {
        count = heldCount
      }
      else {
        throw new Error(`count (${count} > heldCount (${heldCount}))`)
      }
    }
    if (count > 0) {
      this._heldCount = heldCount - count

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
    if (this._heldCount === 0) {
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
    if (count > this._heldCountMax) {
      throw new Error(`holdCount (${count} > maxSize (${this._heldCountMax}))`)
    }

    if (!awaitPriority) {
      awaitPriority = awaitPriorityDefault
    }

    return this._priorityQueue.run(async (abortSignal) => {
      while (this._heldCount !== 0 && count > this.holdAvailable) {
        await this.tick(abortSignal)
        await awaitPriority(priority, abortSignal)
      }
      if (!this.hold(count)) {
        throw new Error('Unexpected behavior')
      }
    }, priority, abortSignal)
  }
}

