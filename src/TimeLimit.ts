import {ITimeLimit, PromiseOrValue, TimeLimitParams} from './contracts'
import {Priority, PriorityQueue} from '@flemist/priority-queue'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {ITimeController, timeControllerDefault} from '@flemist/time-controller'
import {IPool} from 'src/object-pool/contracts'
import {Pool} from 'src/object-pool/Pool'

export class TimeLimit implements ITimeLimit {
  private readonly _timeController: ITimeController
  private readonly _maxCount: number
  private readonly _pool: IPool
  private readonly _time: number
  private readonly _priorityQueue: PriorityQueue

  constructor({
    maxCount,
    pool,
    time,
    priorityQueue,
    timeController,
  }: TimeLimitParams) {
    this._timeController = timeController || timeControllerDefault
    this._maxCount = maxCount
    this._pool = pool || new Pool({
      maxSize: maxCount,
      priorityQueue,
    })
    this._time = time
    this._priorityQueue = priorityQueue
    this._releaseFunc = () => {
      this._release()
    }
    this._tickFunc = (abortSignal?: IAbortSignalFast) => this.tick(abortSignal)
  }

  // private _activeCount: number = 0
  // private _tickPromise: CustomPromise<void> = new CustomPromise()

  hold() {
    this._pool.hold(1)
    // this._activeCount++
  }

  release() {
    this._timeController.setTimeout(this._releaseFunc, this._time)
  }

  private readonly _releaseFunc: () => void
  private _release() {
    this._pool.release(1)
    // this._activeCount--
    // if (this._activeCount === this._maxCount - 1) {
    //   const tickPromise = this._tickPromise
    //   this._tickPromise = new CustomPromise()
    //   tickPromise.resolve()
    // }
  }

  available() {
    return this._pool.size > 0
    // return this._activeCount < this._maxCount
  }

  private readonly _tickFunc: (abortSignal?: IAbortSignalFast) => Promise<void>
  tick(abortSignal?: IAbortSignalFast): Promise<void> {
    return this._pool.tick(abortSignal)
    // return promiseToAbortable(abortSignal, this._tickPromise.promise)
  }

  async run<T>(
    func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
    force?: boolean,
  ): Promise<T> {
    await this._pool.holdWait(1, priority, abortSignal, force)
    // if (!force && this._priorityQueue) {
    //   await this._priorityQueue.run(null, priority, abortSignal)
    // }
    //
    // while (!this.available()) {
    //   if (!force && this._priorityQueue) {
    //     await this._priorityQueue.run(this._tickFunc, priority, abortSignal)
    //   }
    //   else {
    //     await this.tick(abortSignal)
    //   }
    // }
    //
    // this.hold()

    try {
      const result = await func(abortSignal)
      return result
    }
    finally {
      this.release()
    }
  }
}
