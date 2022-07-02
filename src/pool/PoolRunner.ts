import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {IPriorityQueue, Priority} from '@flemist/priority-queue'
import {IPool} from './Pool'

export interface IPoolRunner extends IPriorityQueue {
  pool: IPool
}

export type PoolRunnerParams = {
  pool: IPool
}

export class PoolRunner implements IPoolRunner {
  private readonly _pool: IPool

  constructor({
    pool,
  }: PoolRunnerParams) {
    this._pool = pool
  }

  get pool() {
    return this._pool
  }

  async run<T>(
    func: (abortSignal?: IAbortSignalFast) => Promise<T> | T,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
  ): Promise<T> {
    await this._pool.holdWait(1, priority, abortSignal)

    try {
      const result = await func(abortSignal)
      return result
    }
    finally {
      void this._pool.release(1)
    }
  }
}
