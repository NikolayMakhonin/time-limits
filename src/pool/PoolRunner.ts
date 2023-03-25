import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {AwaitPriority, Priority} from '@flemist/priority-queue'
import {IPool} from './Pool'

/** @deprecated use poolRunWait */
export interface IPoolRunner {
  pool: IPool
  run<T>(
    count: number,
    func: (abortSignal?: IAbortSignalFast) => Promise<T> | T,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
    awaitPriority?: AwaitPriority,
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
    func: (abortSignal?: IAbortSignalFast) => Promise<T> | T,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
    awaitPriority?: AwaitPriority,
  ): Promise<T> {
    await this._pool.holdWait(count, priority, abortSignal, awaitPriority)

    try {
      const result = await func(abortSignal)
      return result
    }
    finally {
      void this._pool.release(count)
    }
  }
}
