import {IStackPool, IObjectPool, IPool} from './contracts'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {StackPool} from 'src/object-pool/StackPool'
import {isPromiseLike} from '../isPromiseLike'
import {Pool} from './Pool'

export type ObjectPoolArgs<TObject extends object> = {
  maxSize?: number,
  pool?: IPool,
  availableObjects?: IStackPool<TObject>
  holdObjects?: boolean | Set<TObject>,
  create?: () => Promise<TObject>|TObject,
  destroy?: (obj: TObject) => Promise<void>|void,
}

export class ObjectPool<TObject extends object> implements IObjectPool<TObject> {
  private readonly _pool: IPool
  private readonly _availableObjects: IStackPool<TObject>
  private readonly _holdObjects: Set<TObject>
  private readonly _create?: () => Promise<TObject> | TObject
  private readonly _destroy?: (obj: TObject) => Promise<void>|void

  constructor({
    maxSize,
    pool,
    availableObjects,
    holdObjects,
    destroy,
    create,
  }: ObjectPoolArgs<TObject>) {
    this._pool = pool || new Pool(maxSize)
    this._availableObjects = availableObjects || new StackPool()
    this._holdObjects = holdObjects === true ? new Set<TObject>() : holdObjects || null
    this._create = create
    this._destroy = destroy
  }

  get available(): number {
    return this._pool.size
  }

  get maxSize(): number {
    return this._pool.maxSize
  }

  get availableObjects(): ReadonlyArray<TObject> {
    return this._availableObjects.objects
  }

  get holdObjects(): ReadonlySet<TObject> {
    return this._holdObjects
  }

  get(): TObject {
    const obj = this._availableObjects.get()
    if (obj != null && this._holdObjects) {
      this._holdObjects.add(obj)
    }
    return obj
  }

  release(obj: TObject): boolean {
    if (obj != null && this._holdObjects) {
      this._holdObjects.delete(obj)
    }
    if (this._pool.maxReleaseCount > 0) {
      if (obj != null) {
        this._availableObjects.release(obj)
      }
      this._pool.release(1)
      return true
    }
    return false
  }

  tick(abortSignal?: IAbortSignalFast): Promise<void> {
    return this._pool.tick()
  }

  async getWait(abortSignal?: IAbortSignalFast): Promise<TObject> {
    await this._pool.holdWait(1, abortSignal)
    return this.get()
  }

  async use<TResult>(
    func: (obj: TObject, abortSignal?: IAbortSignalFast) => Promise<TResult> | TResult,
    abortSignal?: IAbortSignalFast,
  ): Promise<TResult> {
    let obj = await this.getWait(abortSignal)
    if (obj == null && this._create) {
      obj = await this._create()
      if (this._holdObjects) {
        this._holdObjects.add(obj)
      }
    }
    try {
      const result = await func(obj, abortSignal)
      return result
    }
    finally {
      if (!this.release(obj) && this._destroy) {
        await this._destroy(obj)
      }
    }
  }

  allocate<TResult extends PromiseLike<TObject>|TObject>(
    size?: number,
  ): TResult extends PromiseLike<any> ? Promise<void> : void {
    if (!this._create) {
      throw new Error('You should specify create function in the constructor')
    }
    const promises: Promise<void>[] = []
    let tryHoldCount = this._pool.size - this._availableObjects.size
    if (size != null && size < tryHoldCount) {
      tryHoldCount = size
    }
    if (tryHoldCount < 0) {
      throw new Error('Unexpected behavior: tryHoldCount < 0')
    }
    const holdCount = this._pool.hold(tryHoldCount)
    for (let i = 0; i < holdCount; i++) {
      const objectOrPromise = this._create()
      if (isPromiseLike(objectOrPromise)) {
        promises.push(
          (objectOrPromise as any as Promise<TObject>)
            .then(obj => {
              this.release(obj)
            })
            .catch(err => {
              this.release(null)
              throw err
            }),
        )
      }
      else {
        this.release(objectOrPromise as TObject)
      }
    }
    if (promises.length) {
      return Promise.all(promises) as any
    }
  }
}
