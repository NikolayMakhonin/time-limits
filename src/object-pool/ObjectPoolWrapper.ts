import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {Priority, AwaitPriority} from '@flemist/priority-queue'
import {IPool} from 'src/pool/Pool'
import {IObjectPool} from './ObjectPool'

export class ObjectPoolWrapper<TObject extends object> implements IObjectPool<TObject> {
  protected readonly _objectPool: IObjectPool<TObject>

  constructor(objectPool: IObjectPool<TObject>) {
    this._objectPool = objectPool
  }

  get availableObjects(): ReadonlyArray<TObject> {
    return this._objectPool.availableObjects
  }

  get pool(): IPool {
    return this._objectPool.pool
  }

  allocate(size?: number): Promise<number> | number {
    return this._objectPool.allocate(size)
  }

  get(count: number): TObject[] {
    return this._objectPool.get(count)
  }

  getWait(
    count: number,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
    awaitPriority?: AwaitPriority,
  ): Promise<TObject[]> {
    return this._objectPool.getWait(count, priority, abortSignal, awaitPriority)
  }

  release(objects: TObject[], start?: number, count?: number): Promise<number> | number {
    return this._objectPool.release(objects, start, count)
  }

  tick(abortSignal?: IAbortSignalFast): Promise<void> | void {
    return this._objectPool.tick(abortSignal)
  }

  use<TResult>(
    count: number,
    func: (objects: ReadonlyArray<TObject>, abortSignal?: IAbortSignalFast) => (Promise<TResult> | TResult),
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
    awaitPriority?: AwaitPriority,
  ): Promise<TResult> {
    return this._objectPool.use(count, func, priority, abortSignal, awaitPriority)
  }
}
