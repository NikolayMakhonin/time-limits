import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {IStackPool, StackPool} from 'src/object-pool/StackPool'
import {IPool, Pool, Pools} from 'src/pool'
import {isPromiseLike, promiseAll} from '@flemist/async-utils'
import {Priority, AwaitPriority} from '@flemist/priority-queue'

export interface IObjectPool<TObject extends object> {
  readonly pool: IPool

  readonly availableObjects: ReadonlyArray<TObject>
  readonly holdObjects?: ReadonlySet<TObject>

  get(count: number): TObject[]

  /** it returns false if the obj cannot be pushed into the object pool (if size >= maxSize) */
  release(objects: TObject[], start?: number, count?: number): Promise<number> | number

  /** it will resolve when size > 0 */
  tick(abortSignal?: IAbortSignalFast): Promise<void> | void

  /** wait available > 0 and get, use this for concurrency get */
  getWait(
    count: number,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
    awaitPriority?: AwaitPriority,
  ): Promise<TObject[]>

  use<TResult>(
    count: number,
    func: (objects: ReadonlyArray<TObject>, abortSignal?: IAbortSignalFast) => Promise<TResult> | TResult,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
    awaitPriority?: AwaitPriority,
  ): Promise<TResult>

  allocate(
    size?: number,
  ): Promise<number> | number
}

export type ObjectPoolArgs<TObject extends object> = {
  pool: IPool,
  /** custom availableObjects */
  availableObjects?: IStackPool<TObject>
  /** use holdObjects so that you can know which objects are taken and not released to the pool */
  holdObjects?: boolean | Set<TObject>
  create: () => Promise<TObject>|TObject
  destroy?: (obj: TObject) => Promise<void>|void
}

export class ObjectPool<TObject extends object> implements IObjectPool<TObject> {
  private readonly _pool: IPool
  private readonly _allocatePool: IPool
  private readonly _availableObjects: IStackPool<TObject>
  private readonly _holdObjects: Set<TObject>
  private readonly _create?: () => Promise<TObject> | TObject
  private readonly _destroy?: (obj: TObject) => Promise<void>|void

  constructor({
    pool,
    availableObjects,
    holdObjects,
    destroy,
    create,
  }: ObjectPoolArgs<TObject>) {
    this._allocatePool = new Pool(pool.maxSize)
    this._pool = new Pools(pool, this._allocatePool)
    this._availableObjects = availableObjects || new StackPool()
    this._holdObjects = holdObjects === true
      ? new Set<TObject>()
      : holdObjects || null
    this._create = create
    this._destroy = destroy
  }

  get pool() {
    return this._pool
  }

  get availableObjects(): ReadonlyArray<TObject> {
    return this._availableObjects.objects
  }

  /** which objects are taken and not released to the pool */
  get holdObjects(): ReadonlySet<TObject> {
    return this._holdObjects
  }

  get(count: number): TObject[] {
    const objects = this._availableObjects.get(count)
    if (this._holdObjects && objects) {
      for (let i = 0, len = objects.length; i < len; i++) {
        this._holdObjects.add(objects[i])
      }
    }
    return objects
  }

  async release(objects: TObject[], start?: number, end?: number): Promise<number> {
    return this._release(objects, this._pool, start, end)
  }

  private async _release(objects: TObject[], pool: IPool, start?: number, end?: number): Promise<number> {
    if (start == null) {
      start = 0
    }
    if (end == null) {
      end = objects.length
    }
    const tryReleaseCount = end - start
    const releasedCount = await pool.release(tryReleaseCount, true)

    end = Math.min(objects.length, releasedCount)
    this._availableObjects.release(objects, start, end)

    if (this._holdObjects) {
      for (let i = start; i < end; i++) {
        const obj = objects[i]
        if (obj != null) {
          if (this._holdObjects) {
            this._holdObjects.delete(obj)
          }
        }
      }
    }

    return releasedCount
  }

  tick(abortSignal?: IAbortSignalFast): Promise<void> | void {
    return this._pool.tick(abortSignal)
  }

  async getWait(
    count: number,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
    awaitPriority?: AwaitPriority,
  ): Promise<TObject[]> {
    await this._pool.holdWait(count, priority, abortSignal, awaitPriority)
    return this.get(count)
  }

  async use<TResult>(
    count: number,
    func: (objects: ReadonlyArray<TObject>, abortSignal?: IAbortSignalFast) => Promise<TResult> | TResult,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
    awaitPriority?: AwaitPriority,
  ): Promise<TResult> {
    let objects = await this.getWait(count, priority, abortSignal, awaitPriority)
    if (!this._create) {
      throw new Error('You should specify create function in the constructor')
    }

    let start
    if (!objects) {
      objects = new Array<TObject>(count)
      start = 0
    }
    else {
      start = objects.length
    }

    for (let i = start; i < count; i++) {
      const obj = await this._create()
      if (obj == null) {
        throw new Error('create function should return not null object')
      }
      if (this._holdObjects) {
        this._holdObjects.add(obj)
      }
      objects[i] = obj
    }
    try {
      const result = await func(objects, abortSignal)
      return result
    }
    finally {
      const releasedCount = await this.release(objects)
      if (this._destroy) {
        for (let i = releasedCount, len = objects.length; i < len; i++) {
          const obj = objects[i]
          await this._destroy(obj)
        }
      }
    }
  }

  allocate(
    size?: number,
  ): Promise<number> | number {
    if (!this._create) {
      throw new Error('You should specify create function in the constructor')
    }
    const promises: Promise<void>[] = []
    let tryHoldCount = this._allocatePool.size - this._availableObjects.size
    if (size != null && size < tryHoldCount) {
      tryHoldCount = size
    }
    if (tryHoldCount < 0) {
      throw new Error('Unexpected behavior: tryHoldCount < 0')
    }
    const holdCount = this._allocatePool.hold(tryHoldCount) ? tryHoldCount : 0

    let allocatedCount = 0
    const _this = this
    async function releasePromiseObject(objectPromise: Promise<TObject>) {
      let obj: TObject
      try {
        obj = await objectPromise
      }
      catch (err) {
        await _this._allocatePool.release(1)
        throw err
      }
      const count = await _this._release([obj], _this._allocatePool)
      allocatedCount += count
    }

    async function releasePromise(promise: Promise<number>) {
      const count = await promise
      allocatedCount += count
    }

    for (let i = 0; i < holdCount; i++) {
      const objectOrPromise = this._create()
      if (isPromiseLike(objectOrPromise)) {
        promises.push(releasePromiseObject(objectOrPromise))
      }
      else {
        const promise = this._release([objectOrPromise], this._allocatePool)
        if (isPromiseLike(promise)) {
          promises.push(releasePromise(promise))
        }
      }
    }
    if (promises.length) {
      return promiseAll(promises).then(o => allocatedCount)
    }

    return allocatedCount
  }
}
