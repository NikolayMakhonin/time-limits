import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {
  Priority,
  IPriorityQueue,
  PriorityQueue,
  AwaitPriority,
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

  get maxSize() {
    const pools = this._pools
    let min: number
    for (let i = 0, len = pools.length; i < len; i++) {
      const value = pools[i].maxSize
      if (i === 0 || value < min) {
        min = value
      }
    }
    return min
  }

  get size() {
    const pools = this._pools
    let max: number
    for (let i = 0, len = pools.length; i < len; i++) {
      const value = pools[i].size
      if (i === 0 || value < max) {
        max = value
      }
    }
    return max
  }

  get holdAvailable() {
    return this.size
  }

  hold(count: number): boolean {
    const size = this.size
    if (count > size) {
      return false
    }
    const pools = this._pools
    for (let i = 0, len = pools.length; i < len; i++) {
      pools[i].hold(count)
    }
    return true
  }

  get releaseAvailable() {
    return this.maxSize - this.size
  }

  release(count: number, dontThrow?: boolean): Promise<number> | number {
    const size = this.size
    const maxReleaseCount = this.maxSize - size
    if (count > maxReleaseCount) {
      if (dontThrow) {
        count = maxReleaseCount
      }
      else {
        throw new Error(`count (${count} > maxReleaseCount (${maxReleaseCount}))`)
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
    if (count > this.maxSize) {
      throw new Error(`holdCount (${count} > maxSize (${this.maxSize}))`)
    }

    if (!awaitPriority) {
      awaitPriority = awaitPriorityDefault
    }

    await this._priorityQueue.run(async (abortSignal) => {
      while (count > this.size) {
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
