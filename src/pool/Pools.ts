import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {Priority, IPriorityQueue} from '@flemist/priority-queue'
import {isPromiseLike} from '@flemist/async-utils'
import {IPool} from './Pool'

export class Pools implements IPool {
  private readonly _pools: IPool[]

  constructor(...pools: IPool[]) {
    if (!pools?.length) {
      throw new Error('pools should not be empty')
    }
    this._pools = pools
    this._tickFunc = (abortSignal?: IAbortSignalFast) => this.tick(abortSignal)
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
    let min: number
    for (let i = 0, len = pools.length; i < len; i++) {
      const value = pools[i].size
      if (i === 0 || value < min) {
        min = value
      }
    }
    return min
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

  release(count: number): Promise<number> | number {
    const size = this.size
    const maxReleaseCount = this.maxSize - size
    if (count > maxReleaseCount) {
      count = maxReleaseCount
    }
    if (count > 0) {
      const pools = this._pools
      let promises: Promise<number>[] = null
      for (let i = 0, len = pools.length; i < len; i++) {
        const promise = pools[i].release(count)
        if (isPromiseLike(promise)) {
          if (!promises) {
            promises = [promise as Promise<number>]
          }
          else {
            promises.push(promise as Promise<number>)
          }
        }
      }
      if (promises) {
        return Promise.all(promises).then(() => count)
      }
    }
    return count
  }

  private readonly _tickFunc: () => Promise<void>
  tick(abortSignal?: IAbortSignalFast): Promise<void> {
    return Promise.race(this._pools.map(o => o.tick(abortSignal)))
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

    while (count > this.size) {
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
