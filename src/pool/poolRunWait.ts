import {IPool, Pool, poolWaitHold} from '~/src'
import {type IAbortSignalFast} from '@flemist/abort-controller-fast'
import {type AwaitPriority, Priority} from '@flemist/priority-queue'
import {
  type PromiseLikeOrValue,
  runWithFinally,
} from '@flemist/async-utils'

export type PoolRunWaitArgs<T> = {
  pool: IPool
  count: number
  /** @param holdPool - pool with `count` size, you can use it for nested checks using poolRunThrow */
  func: (holdPool: IPool, abortSignal?: IAbortSignalFast) => T
  priority?: Priority
  abortSignal?: IAbortSignalFast
  awaitPriority?: AwaitPriority
}

export function poolRunWait<T>({
  pool,
  count,
  func,
  priority,
  abortSignal,
  awaitPriority,
}: PoolRunWaitArgs<PromiseLikeOrValue<T>>): PromiseLike<T> {
  return runWithFinally(
    () => {
      return poolWaitHold({ pool, count, priority, abortSignal, awaitPriority })
    },
    () => {
      const holdPool = new Pool(count)
      return func(holdPool, abortSignal)
    },
    () => {
      return pool.release(count)
    },
  ) as PromiseLike<T>
}
