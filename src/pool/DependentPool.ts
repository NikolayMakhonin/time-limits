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

  get heldCountMax() {
    return this._pool.heldCountMax
  }

  get heldCount() {
    let heldCount: number = this._pool.heldCount
    const pools = this._pools
    for (let i = 0, len = pools.length; i < len; i++) {
      heldCount += pools[i].heldCount
    }
    return heldCount
  }

  get holdAvailable() {
    return Math.min(0, this.heldCountMax - this.heldCount)
  }

  get releaseAvailable() {
    return this._pool.releaseAvailable
  }

  hold(count: number): boolean {
    const heldCount = this.heldCount
    if (heldCount !== 0 && count > this.holdAvailable) {
      return false
    }
    return this._pool.hold(count)
  }

  release(count: number, dontThrow?: boolean): Promise<number> | number {
    return this._pool.release(count, dontThrow)
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

  async holdWait(
    count: number,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
    awaitPriority?: AwaitPriority,
  ) {
    if (count > this.heldCountMax) {
      throw new Error(`holdCount (${count} > maxSize (${this.heldCountMax}))`)
    }

    if (!awaitPriority) {
      awaitPriority = awaitPriorityDefault
    }

    await this._priorityQueue.run(async (abortSignal) => {
      while (this.heldCount !== 0 && count > this.holdAvailable) {
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
