import {IPool} from '~/src'
import {toFuncWithFinally} from '@flemist/async-utils'
import {PoolHoldError} from 'src/pool/PoolHoldError'
import {FuncAny} from 'src/contracts'

export function toFuncWithPoolThrow<TFunc extends FuncAny>(
  pool: IPool,
  count: number,
  func: TFunc,
): TFunc {
  return toFuncWithFinally(
    function funcWithPoolThrow() {
      const hold = pool.hold(count)
      if (!hold) {
        throw new PoolHoldError(count)
      }

      return func.apply(this, arguments)
    } as TFunc,
    () => {
      void pool.release(count)
    },
  )
}

export function runPoolThrow<T>(
  pool: IPool,
  count: number,
  func: () => T,
): T {
  return toFuncWithPoolThrow(pool, count, func)()
}
