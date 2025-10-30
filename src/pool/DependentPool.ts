import {type IAbortSignalFast} from '@flemist/abort-controller-fast'
import {
  Priority,
  type IPriorityQueue,
  PriorityQueue,
  type AwaitPriority,
  awaitPriorityDefault,
} from '@flemist/priority-queue'
import {promiseRace} from '@flemist/async-utils'
import {IPool} from './Pool'

/**
 * К текущему size прибавляется size всех зависимостей.
 * Таким образом, этому пулу нужно будет ждать все зависимые пулы, но при этом не блокировать их.
 * Пример использования: есть 2 пула на загрузку данных, один загружает данные фоново, а второй для срочной загрузки по требованию. Чтобы добавить новую фоновую задачу, нужно убедиться что общее количество задач во всех пулах не превышает лимит. Но если нужно добавить срочную задачу, то нужно убедиться что только в срочном пуле есть место. В худшем случае будут заняты оба пула, но ненадолго, т.к. фоновые задачи будут завершаться, а новые фоновые задачи не будут добавляться, пока не освободится место.
 */
export class DependentPool implements IPool {
  private readonly _priorityQueue: IPriorityQueue
  private readonly _pool: IPool
  private readonly _pools: IPool[]

  constructor(pool: IPool, ...dependencies: IPool[]) {
    this._pool = pool
    this._pools = dependencies
    this._priorityQueue = new PriorityQueue()
  }

  get maxSize() {
    return this._pool.maxSize
  }

  get size() {
    return Math.min(0, this.maxSize - this.holdCount)
  }

  get holdCount() {
    let holdCount: number = this._pool.holdCount
    const pools = this._pools
    for (let i = 0, len = pools.length; i < len; i++) {
      holdCount += pools[i].holdCount
    }
    return holdCount
  }

  get holdAvailable() {
    return this.size
  }

  get releaseAvailable() {
    return this._pool.releaseAvailable
  }

  tick(abortSignal?: IAbortSignalFast): Promise<void> | void {
    let promises: Promise<void>[]
    const promise = this._pool.tick(abortSignal)
    if (promise) {
      promises = [promise]
    }
    for (let i = 0, len = this._pools.length; i < len; i++) {
      const promise = this._pools[i].tick(abortSignal)
      if (promise) {
        if (!promises) {
          promises = [promise]
        }
        else {
          promises.push(promise)
        }
      }
    }

    if (!promises) {
      return null
    }

    return promiseRace(promises)
  }

  hold(count: number): boolean {
    const size = this.size
    if (count > size) {
      return false
    }
    return this._pool.hold(count)
  }

  release(count: number, dontThrow?: boolean): Promise<number> | number {
    return this._pool.release(count, dontThrow)
  }

  async holdWait(
    count: number,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
    awaitPriority?: AwaitPriority,
  ) {
    if (count > this.maxSize) {
      throw new Error(`holdCount (${count} > maxSize (${this.maxSize}))`)
    }

    if (!awaitPriority) {
      awaitPriority = awaitPriorityDefault
    }

    await this._priorityQueue.run(async (abortSignal) => {
      while (count > this.size) {
        await this.tick(abortSignal)
        if (awaitPriority) {
          await awaitPriority(priority, abortSignal)
        }
      }
      if (!this.hold(count)) {
        throw new Error('Unexpected behavior')
      }
    }, priority, abortSignal)
  }
}
