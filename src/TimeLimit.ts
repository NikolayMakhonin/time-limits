import {ITimeLimit, PromiseOrValue, TimeLimitParams} from './contracts'
import {CustomPromise} from '@flemist/async-utils'
import {PriorityQueue, Priority} from '@flemist/priority-queue'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {promiseToAbortable} from 'src/abort-controller-fast-utils'
import {ITimeController, timeControllerDefault} from '@flemist/time-controller'
import {Task} from '@flemist/priority-queue/dist/lib/priority-queue/contracts'

export class TimeLimit implements ITimeLimit {
  private readonly _timeController: ITimeController
  private readonly _maxCount: number
  private readonly _timeMs: number
  private readonly _priorityQueue: PriorityQueue
  private readonly _tasks: Set<Task<any>>

  constructor({
    maxCount,
    timeMs,
    priorityQueue,
    timeController,
  }: TimeLimitParams) {
    this._timeController = timeController || timeControllerDefault
    this._maxCount = maxCount
    this._timeMs = timeMs
    this._priorityQueue = priorityQueue || new PriorityQueue()
    this._releaseFunc = () => {
      this._release()
    }
    this._tickFunc = (abortSignal?: IAbortSignalFast) => this.tick(abortSignal)
    this._tasks = new Set()
  }

  private _activeCount: number = 0
  private _tickPromise: CustomPromise<void> = new CustomPromise()

  hold() {
    this._activeCount++
    if (this._activeCount === this._maxCount) {
      this._tasks.forEach(task => {
        task.setReadyToRun(false)
      })
    }
  }
  
  release() {
    this._timeController.setTimeout(this._releaseFunc, this._timeMs)
  }

  private readonly _releaseFunc: () => void
  private _release() {
    this._activeCount--
    if (this._activeCount === this._maxCount - 1) {
      const tickPromise = this._tickPromise
      this._tickPromise = new CustomPromise()
      tickPromise.resolve()
      this._tasks.forEach(task => {
        task.setReadyToRun(true)
      })
    }
  }

  available() {
    return this._activeCount < this._maxCount
  }

  private readonly _tickFunc: (abortSignal?: IAbortSignalFast) => Promise<void>
  tick(abortSignal?: IAbortSignalFast): Promise<void> {
    return promiseToAbortable(abortSignal, this._tickPromise.promise)
  }

  async run<T>(
    func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
    force?: boolean,
  ): Promise<T> {
    if (!force) {
      const task = this._priorityQueue.runTask(null, priority, abortSignal)

      this._tasks.add(task)
      task.setReadyToRun(this.available())

      await task.result
      this._tasks.delete(task)
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
