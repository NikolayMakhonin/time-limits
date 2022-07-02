import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {IPriorityQueue, Priority} from '@flemist/priority-queue'
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

  getWait(count: number, abortSignal?: IAbortSignalFast): Promise<TObject[]> {
    return this._objectPool.getWait(count, abortSignal)
  }

  release(objects: TObject[], start?: number, count?: number): Promise<number> | number {
    return this._objectPool.release(objects, start, count)
  }

  tick(abortSignal?: IAbortSignalFast): Promise<void> {
    return this._objectPool.tick(abortSignal)
  }

  use<TResult>(
    count: number,
    func: (objects: ReadonlyArray<TObject>, abortSignal?: IAbortSignalFast) => (Promise<TResult> | TResult),
    abortSignal?: IAbortSignalFast,
    priorityQueue?: IPriorityQueue,
    priority?: Priority,
  ): Promise<TResult> {
    return this._objectPool.use(count, func, abortSignal, priorityQueue, priority)
  }
}
