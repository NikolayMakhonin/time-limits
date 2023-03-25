import {IPool, Pool} from '~/src'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {AwaitPriority, Priority} from '@flemist/priority-queue'
import {toFuncWithFinally} from '@flemist/async-utils'

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
  return toFuncWithFinally(
    async function funcWithPoolThrow() {
      await pool.holdWait(count, priority, abortSignal, awaitPriority)
      const holdPool = new Pool(count)
      return func(holdPool, abortSignal)
    },
    () => {
      void pool.release(count)
    },
  )()
}
