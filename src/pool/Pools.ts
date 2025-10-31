import {type IAbortSignalFast} from '@flemist/abort-controller-fast'
import {
  Priority,
  type IPriorityQueue,
  PriorityQueue,
  type AwaitPriority,
  awaitPriorityDefault,
} from '@flemist/priority-queue'
import {isPromiseLike, promiseAll, promiseRace} from '@flemist/async-utils'
import {IPool} from './Pool'

export class Pools implements IPool {
  private readonly _priorityQueue: IPriorityQueue
  private readonly _pools: IPool[]

  constructor(...pools: IPool[]) {
    if (!pools?.length) {
      throw new Error('pools should not be empty')
    }
    this._pools = pools
    this._priorityQueue = new PriorityQueue()
  }

  get heldCountMax() {
    const pools = this._pools
    let min: number
    for (let i = 0, len = pools.length; i < len; i++) {
      const value = pools[i].heldCountMax
      if (i === 0 || value < min) {
        min = value
      }
    }
    return min
  }

  get heldCount() {
    const pools = this._pools
    let max: number
    for (let i = 0, len = pools.length; i < len; i++) {
      const value = pools[i].heldCount
      if (i === 0 || value > max) {
        max = value
      }
    }
    return max
  }

  get holdAvailable() {
    const pools = this._pools
    let min: number
    for (let i = 0, len = pools.length; i < len; i++) {
      const value = pools[i].holdAvailable
      if (i === 0 || value < min) {
        min = value
      }
    }
    return min
  }

  get releaseAvailable() {
    const pools = this._pools
    let min: number
    for (let i = 0, len = pools.length; i < len; i++) {
      const value = pools[i].heldCount
      if (i === 0 || value < min) {
        min = value
      }
    }
    return min
  }

  hold(count: number): boolean {
    if (this.heldCount !== 0 && count > this.holdAvailable) {
      return false
    }
    const pools = this._pools
    for (let i = 0, len = pools.length; i < len; i++) {
      if (!pools[i].hold(count)) {
        throw new Error('Unexpected behavior')
      }
    }
    return true
  }

  release(count: number, dontThrow?: boolean): Promise<number> | number {
    const releaseAvailable = this.releaseAvailable
    if (count > releaseAvailable) {
      if (dontThrow) {
        count = releaseAvailable
      }
      else {
        throw new Error(`count (${count} > releaseAvailable (${releaseAvailable}))`)
      }
    }
    if (count > 0) {
      const pools = this._pools
      let promises: Promise<number>[] = null
      for (let i = 0, len = pools.length; i < len; i++) {
        const promise = pools[i].release(count, dontThrow)
        if (isPromiseLike(promise)) {
          if (!promises) {
            promises = [promise]
          }
          else {
            promises.push(promise)
          }
        }
      }
      if (promises) {
        return promiseAll(promises).then(() => count)
      }
    }
    return count
  }

  tick(abortSignal?: IAbortSignalFast): Promise<void> | void {
    let promises: Promise<void>[]
    for (let i = 0, len = this._pools.length; i < len; i++) {
      const promise = this._pools[i].tick(abortSignal)
      if (promise) {
        if (!promises) {
          promises = [promise]
        }
        else {
          promises.push(promise)
        }
      }
    }

    if (!promises) {
      return null
    }

    return promiseRace(promises)
  }

  async holdWait(
    count: number,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
    awaitPriority?: AwaitPriority,
  ) {
    if (count > this.heldCountMax) {
      throw new Error(`holdCount (${count} > maxSize (${this.heldCountMax}))`)
    }

    if (!awaitPriority) {
      awaitPriority = awaitPriorityDefault
    }

    await this._priorityQueue.run(async (abortSignal) => {
      while (this.heldCount !== 0 && count > this.holdAvailable) {
        await this.tick(abortSignal)
        if (awaitPriority) {
          await awaitPriority(priority, abortSignal)
        }
      }
      if (!this.hold(count)) {
        throw new Error('Unexpected behavior')
      }
    }, priority, abortSignal)
  }
}
