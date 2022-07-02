import {IStackPool} from './contracts'

export class StackPool<TObject> implements IStackPool<TObject> {
  private readonly _objects: TObject[] = []

  get objects(): ReadonlyArray<TObject> {
    return this._objects
  }

  get size() {
    return this._objects.length
  }

  get(): TObject {
    const lastIndex = this._objects.length - 1
    if (lastIndex >= 0) {
      const obj = this._objects[lastIndex]
      this._objects.length = lastIndex
      return obj
    }
    return null
  }

  release(obj: TObject) {
    if (obj == null) {
      throw new Error('object should not be null')
    }
    this._objects.push(obj)
  }
}
