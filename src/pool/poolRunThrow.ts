import {IPool} from '~/src'
import {isPromiseLike} from '@flemist/async-utils'
import {PoolHoldError} from 'src/pool/PoolHoldError'

export function poolRunThrow<T>(
  pool: IPool,
  count: number,
  func: () => T,
): T {
  const hold = pool.hold(count)
  if (!hold) {
    throw new PoolHoldError(count)
  }

  try {
    const resultOrPromise = func()
    if (!isPromiseLike(resultOrPromise)) {
      return resultOrPromise
    }
    return (async () => {
      try {
        const result = await resultOrPromise
        return result
      }
      finally {
        void pool.release(count)
      }
    })() as any
  }
  finally {
    void this._pool.release(count)
  }
}
