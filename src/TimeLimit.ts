import {ITimeLimit, PromiseOrValue, TimeLimitParams} from './contracts'
import {CustomPromise} from '@flemist/async-utils'
import {PriorityQueue, Priority} from '@flemist/priority-queue'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {promiseToAbortable} from 'src/abort-controller-fast-utils'
import {ITimeController, timeControllerDefault} from '@flemist/time-controller'

export class TimeLimit implements ITimeLimit {
  private readonly _timeController: ITimeController
  private readonly _maxCount: number
  private readonly _timeMs: number
  private readonly _priorityQueue: PriorityQueue

  constructor({
    maxCount,
    timeMs,
    priorityQueue,
    timeController,
  }: TimeLimitParams) {
    this._timeController = timeController || timeControllerDefault
    this._maxCount = maxCount
    this._timeMs = timeMs
    this._priorityQueue = priorityQueue
    this._releaseFunc = () => {
      this._release()
    }
    this._tickFunc = (abortSignal?: IAbortSignalFast) => this.tick(abortSignal)
  }

  private _activeCount: number = 0
  private _tickPromise: CustomPromise<void> = new CustomPromise()

  private readonly _releaseFunc: () => void
  release() {
    this._timeController.setTimeout(this._releaseFunc, this._timeMs)
  }

  private _release() {
    this._activeCount--
    if (this._activeCount === this._maxCount - 1) {
      const tickPromise = this._tickPromise
      this._tickPromise = new CustomPromise()
      tickPromise.resolve()
    }
  }

  hold() {
    this._activeCount++
  }

  private readonly _tickFunc: (abortSignal?: IAbortSignalFast) => Promise<void>
  tick(abortSignal?: IAbortSignalFast): Promise<void> {
    return promiseToAbortable(abortSignal, this._tickPromise.promise)
  }

  available() {
    return this._activeCount < this._maxCount
  }

  async run<T>(
    func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
    ignorePriority?: boolean,
  ): Promise<T> {
    if (!ignorePriority && this._priorityQueue) {
      await this._priorityQueue.run(null, priority, abortSignal)
    }

    while (!this.available()) {
      if (!ignorePriority && this._priorityQueue) {
        await this._priorityQueue.run(this._tickFunc, priority, abortSignal)
      }
      else {
        await this.tick(abortSignal)
      }
    }

    this.hold()
    try {
      const result = await func(abortSignal)
      return result
    }
    finally {
      this.release()
    }
  }
}
