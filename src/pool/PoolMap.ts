import {type IAbortSignalFast} from '@flemist/abort-controller-fast'
import {WeakOrMapFull} from 'src/weak-or/WeakOrMapFull'
import {IPool, Pool} from './Pool'
import {PoolMult} from './PoolMult'
import {Pools} from './Pools'

export interface IPoolMap<Key> extends IPool {
  get(key: Key): IPool
}

export type PoolMapOptions<Key> = {
  heldCountMax?: null | number
  createKeyPool?: null | ((key: Key) => IPool)
}

export class PoolMap<Key> implements IPoolMap<Key> {
  private readonly _commonPool: IPool
  private readonly _bulkPool: IPool
  private readonly _createKeyPool: (key: Key) => IPool
  private readonly _keyPools: WeakOrMapFull<Key, IPool> = new WeakOrMapFull()

  constructor(options?: null | PoolMapOptions<Key>) {
    const heldCountMax = options?.heldCountMax ?? Number.MAX_SAFE_INTEGER
    this._commonPool = new Pool(heldCountMax)
    this._bulkPool = new PoolMult(this._commonPool, heldCountMax)
    this._createKeyPool = options?.createKeyPool ?? createKeyPoolDefault
  }

  get(key: Key): IPool {
    let pool = this._keyPools.get(key)
    if (!pool) {
      pool = new Pools(this._commonPool, this._createKeyPool(key))
      this._keyPools.set(key, pool)
    }
    return pool
  }

  get heldCountMax(): number {
    return this._bulkPool.heldCountMax
  }

  get heldCount(): number {
    return this._bulkPool.heldCount
  }

  get holdAvailable(): number {
    return this._bulkPool.holdAvailable
  }

  get releaseAvailable(): number {
    return this._bulkPool.releaseAvailable
  }

  canHold(count: number): boolean {
    return this._bulkPool.canHold(count)
  }

  hold(count: number): boolean {
    return this._bulkPool.hold(count)
  }

  release(count: number, dontThrow?: null | boolean): Promise<number> | number {
    return this._bulkPool.release(count, dontThrow)
  }

  tick(abortSignal?: null | IAbortSignalFast): Promise<void> | void {
    return this._bulkPool.tick(abortSignal)
  }
}

function createKeyPoolDefault(): IPool {
  return new Pool(1)
}
