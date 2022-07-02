import {IPool} from './contracts'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {Priority, PriorityQueue} from '@flemist/priority-queue'

export class Pools implements IPool {
  private readonly _pools: IPool[]
  private readonly _priorityQueue: PriorityQueue

  constructor({
    pools,
    priorityQueue,
  }: {
    pools: IPool[],
    priorityQueue?: PriorityQueue,
  }) {
    if (!pools?.length) {
      throw new Error('pools should not be empty')
    }
    this._pools = pools
    this._priorityQueue = priorityQueue
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

  release(count: number): number {
    const size = this.size
    const maxReleaseCount = this.maxSize - size
    if (count > maxReleaseCount) {
      count = maxReleaseCount
    }
    if (count > 0) {
      const pools = this._pools
      for (let i = 0, len = pools.length; i < len; i++) {
        pools[i].release(count)
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
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
    force?: boolean,
  ) {
    if (count > this.maxSize) {
      throw new Error(`holdCount (${count} > maxSize (${this.maxSize}))`)
    }

    if (!force) {
      if (this._priorityQueue) {
        await this._priorityQueue.run(null, priority, abortSignal)
      }

      while (count > this.size) {
        if (this._priorityQueue) {
          await this._priorityQueue.run(this._tickFunc, priority, abortSignal)
        }
        else {
          await this.tick(abortSignal)
        }
      }
    }

    if (!this.hold(count)) {
      if (force) {
        throw new Error(`hold count (${count}) > holdAvailable (${this.size})`)
      }
      throw new Error('Unexpected behavior')
    }
  }
}
