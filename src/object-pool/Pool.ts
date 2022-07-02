import {IPool} from './contracts'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {promiseToAbortable, CustomPromise} from '@flemist/async-utils'
import {PriorityQueue, Priority} from '@flemist/priority-queue'

export type PoolParams = {
  maxSize?: number,
  priorityQueue?: PriorityQueue,
}

export class Pool implements IPool {
  private readonly _maxSize: number = 0
  private readonly _priorityQueue: PriorityQueue
  private _size: number = 0

  constructor({
    maxSize,
    priorityQueue,
  }: PoolParams) {
    if (!maxSize) {
      throw new Error('maxSize should be > 0')
    }
    this._maxSize = maxSize
    this._size = maxSize
    this._priorityQueue = priorityQueue
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

      while (count > this._size) {
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
        throw new Error(`hold count (${count}) > holdAvailable (${this._size})`)
      }
      throw new Error('Unexpected behavior')
    }
  }
}
