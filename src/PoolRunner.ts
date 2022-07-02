import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import { Priority } from '@flemist/priority-queue'
import {PromiseOrValue} from 'src/contracts'
import {IPool} from 'src/object-pool'

export interface IPoolRunner {
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
    func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
    force?: boolean,
  ): Promise<T> {
    await this._pool.holdWait(1, priority, abortSignal, force)

    try {
      const result = await func(abortSignal)
      return result
    }
    finally {
      void this._pool.release(1)
    }
  }
}
