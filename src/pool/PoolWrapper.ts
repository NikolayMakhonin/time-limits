import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {IPriorityQueue, Priority} from '@flemist/priority-queue'
import {IPool} from 'src/pool/Pool'

export class PoolWrapper implements IPool {
  protected readonly _pool: IPool

  constructor(pool: IPool) {
    this._pool = pool
  }

  get size(): number {
    return this._pool.size
  }

  get maxSize(): number {
    return this._pool.maxSize
  }

  get holdAvailable(): number {
    return this._pool.holdAvailable
  }

  get releaseAvailable(): number {
    return this._pool.releaseAvailable
  }

  hold(count: number) {
    return this._pool.hold(count)
  }

  release(count: number) {
    return this._pool.release(count)
  }

  tick(abortSignal?: IAbortSignalFast): Promise<void> | void {
    return this._pool.tick(abortSignal)
  }

  holdWait(
    count: number,
    abortSignal?: IAbortSignalFast,
    priorityQueue?: IPriorityQueue,
    priority?: Priority,
  ): Promise<void> {
    return this._pool.holdWait(count, abortSignal, priorityQueue, priority)
  }
}
