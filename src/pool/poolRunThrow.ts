import {IPool} from '~/src'
import {type PromiseLikeOrValue, runWithFinally} from '@flemist/async-utils'
import {PoolHoldError} from 'src/pool/PoolHoldError'

export function poolRunThrow<Result>(
  pool: IPool,
  count: number,
  func: (() => Result) | null | undefined,
): Result
export function poolRunThrow<Result>(
  pool: IPool,
  count: number,
  func: (() => PromiseLikeOrValue<Result>) | null | undefined,
): PromiseLikeOrValue<Result>
export function poolRunThrow<Result>(
  pool: IPool,
  count: number,
  func: (() => PromiseLikeOrValue<Result>) | null | undefined,
): PromiseLikeOrValue<Result> {
  return runWithFinally(
    () => {
      const hold = pool.hold(count)
      if (!hold) {
        throw new PoolHoldError(count)
      }
    },
    func,
    () => {
      void pool.release(count)
    },
  )
}

