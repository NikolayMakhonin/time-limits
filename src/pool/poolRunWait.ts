import {IPool, Pool, poolWait} from './Pool'
import {type IAbortSignalFast} from '@flemist/abort-controller-fast'
import {type AwaitPriority, Priority} from '@flemist/priority-queue'
import {
  type PromiseLikeOrValue,
  runWithFinally,
  promiseLikeToPromise,
} from '@flemist/async-utils'

export type PoolRunWaitArgs<T> = {
  pool: IPool
  count: number
  /** @param holdPool - pool with `count` size, you can use it for nested checks using poolRunThrow */
  func: (holdPool: IPool, abortSignal?: null | IAbortSignalFast) => T
  priority?: null | Priority
  abortSignal?: null | IAbortSignalFast
  awaitPriority?: null | AwaitPriority
}

export function poolRunWait<T>({
  pool,
  count,
  func,
  priority,
  abortSignal,
  awaitPriority,
}: PoolRunWaitArgs<PromiseLikeOrValue<T>>): Promise<T> {
  return promiseLikeToPromise(runWithFinally(
    () => {
      return poolWait({ pool, count, hold: true, priority, abortSignal, awaitPriority })
    },
    () => {
      const holdPool = new Pool(count)
      return func(holdPool, abortSignal)
    },
    () => {
      return pool.release(count)
    },
  ) as PromiseLike<T>)
}
