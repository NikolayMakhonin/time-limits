import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {IPriorityQueue, Priority} from '@flemist/priority-queue'
import {IPool} from './Pool'

export interface IPoolRunner {
  pool: IPool
  run<T>(
    count: number,
    func: (abortSignal?: IAbortSignalFast) => Promise<T> | T,
    abortSignal?: IAbortSignalFast,
    priorityQueue?: IPriorityQueue,
    priority?: Priority,
  ): Promise<T>
}

export class PoolRunner implements IPoolRunner {
  private readonly _pool: IPool

  constructor(pool: IPool) {
    this._pool = pool
  }

  get pool() {
    return this._pool
  }

  async run<T>(
    count: number,
    func: (abortSignal?: IAbortSignalFast) => Promise<T> | T,
    abortSignal?: IAbortSignalFast,
    priorityQueue?: IPriorityQueue,
    priority?: Priority,
  ): Promise<T> {
    await this._pool.holdWait(count, abortSignal, priorityQueue, priority)

    try {
      const result = await func(abortSignal)
      return result
    }
    finally {
      void this._pool.release(1)
    }
  }
}
