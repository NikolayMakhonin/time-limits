import {type IAbortSignalFast} from '@flemist/abort-controller-fast'
import {CustomPromise, promiseToAbortable} from '@flemist/async-utils'
import {type AwaitPriority, awaitPriorityDefault, Priority, PriorityQueue} from '@flemist/priority-queue'

export interface IPool {
  readonly heldCountMax: number
  readonly heldCount: number
  readonly holdAvailable: number
  readonly releaseAvailable: number

  canHold(count: number): boolean
  hold(count: number): boolean
  release(count: number, dontThrow?: boolean): Promise<number> | number

  tick(abortSignal?: IAbortSignalFast): Promise<void> | void
}

// export interface IPoolSync extends IPool {
//   release(count: number): number
// }

export class Pool implements IPool {
  private readonly _heldCountMax: number = 0
  private _heldCount: number = 0

  constructor(heldCountMax: number) {
    if (!heldCountMax) {
      throw new Error('[Pool][constructor] heldCountMax should be > 0')
    }
    this._heldCountMax = heldCountMax
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

  canHold(count: number): boolean {
    return this.heldCount === 0 || count <= this.holdAvailable
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
        throw new Error(`[Pool][release] count (${count} > heldCount (${heldCount}))`)
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
}

export const poolPriorityQueue = new PriorityQueue()

export function poolWait({
  pool,
  count,
  priority,
  abortSignal,
  awaitPriority,
}: {
  pool: IPool
  count: number
  priority?: Priority
  abortSignal?: IAbortSignalFast
  awaitPriority?: AwaitPriority
}): Promise<void> {
  if (!awaitPriority) {
    awaitPriority = awaitPriorityDefault
  }

  return poolPriorityQueue.run(async (abortSignal) => {
    while (!pool.canHold(count)) {
      await pool.tick(abortSignal)
      await awaitPriority(priority, abortSignal)
    }
  }, priority, abortSignal)
}

export async function poolWaitHold({
  pool,
  count,
  priority,
  abortSignal,
  awaitPriority,
}: {
  pool: IPool
  count: number
  priority?: Priority
  abortSignal?: IAbortSignalFast
  awaitPriority?: AwaitPriority
}): Promise<void> {
  await poolWait({ pool, count, priority, abortSignal, awaitPriority })
  if (!pool.hold(count)) {
    throw new Error('[poolHoldWait] Unexpected behavior')
  }
}
