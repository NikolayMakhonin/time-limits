import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {Priority} from '@flemist/priority-queue'
import {IPool} from 'src/pool/Pool'

export interface IPoolWrapper extends IPool {

}

export type PoolWrapperParams = {
  pool: IPool,
}

export class PoolWrapper implements IPoolWrapper {
  protected readonly _pool: IPool

  constructor({
    pool,
  }: PoolWrapperParams) {
    this._pool = pool
  }

  get size(): number {
    return this._pool.size
  }

  get maxSize(): number {
    return this._pool.maxSize
  }

  get holdAvailable(): number {
    return this._pool.holdAvailable
  }

  get releaseAvailable(): number {
    return this._pool.releaseAvailable
  }

  hold(count: number) {
    return this._pool.hold(count)
  }

  release(count: number) {
    return this._pool.release(count)
  }

  tick(abortSignal?: IAbortSignalFast): Promise<void> {
    return this._pool.tick(abortSignal)
  }

  holdWait(
    count: number,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
    force?: boolean,
  ): Promise<void> {
    return this._pool.holdWait(count, priority, abortSignal, force)
  }
}
