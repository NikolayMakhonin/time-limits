import {type IAbortSignalFast} from '@flemist/abort-controller-fast'
import {type AwaitPriority, Priority} from '@flemist/priority-queue'
import {IPool, poolWaitHold} from './Pool'

/** @deprecated use poolRunWait */
export interface IPoolRunner {
  pool: IPool
  run<T>(
    count: number,
    func: (abortSignal?: null | IAbortSignalFast) => Promise<T> | T,
    priority?: null | Priority,
    abortSignal?: null | IAbortSignalFast,
    awaitPriority?: null | AwaitPriority,
  ): Promise<T>
}

/** @deprecated use poolRunWait */
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
    func: (abortSignal?: null | IAbortSignalFast) => Promise<T> | T,
    priority?: null | Priority,
    abortSignal?: null | IAbortSignalFast,
    awaitPriority?: null | AwaitPriority,
  ): Promise<T> {
    await poolWaitHold({ pool: this._pool, count, priority, abortSignal, awaitPriority})

    try {
      const result = await func(abortSignal)
      return result
    }
    finally {
      void this._pool.release(count)
    }
  }
}
