import {IPool} from './Pool'
import {
  type PromiseLikeOrValue,
  type PromiseOrValue,
  runWithFinally,
  promiseLikeToPromise,
} from '@flemist/async-utils'
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
): PromiseOrValue<Result>
export function poolRunThrow<Result>(
  pool: IPool,
  count: number,
  func: (() => PromiseLikeOrValue<Result>) | null | undefined,
): PromiseOrValue<Result> {
  return promiseLikeToPromise(runWithFinally(
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
  ))
}

