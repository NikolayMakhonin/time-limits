import {IPool, Pool} from '~/src'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {AwaitPriority, Priority} from '@flemist/priority-queue'

export type PoolRunWaitArgs<T> = {
  pool: IPool
  count: number
  /** @param holdPool - pool with `count` size, you can use it for nested checks using poolRunThrow */
  func: (holdPool: IPool, abortSignal?: IAbortSignalFast) => Promise<T> | T
  priority?: Priority
  abortSignal?: IAbortSignalFast
  awaitPriority?: AwaitPriority
}

export async function poolRunWait<T>({
  pool,
  count,
  func,
  priority,
  abortSignal,
  awaitPriority,
}: PoolRunWaitArgs<T>): Promise<T> {
  await pool.holdWait(count, priority, abortSignal, awaitPriority)

  try {
    const holdPool = new Pool(count)
    const result = await func(holdPool, abortSignal)
    return result
  }
  finally {
    void this._pool.release(count)
  }
}
