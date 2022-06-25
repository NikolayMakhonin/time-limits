import {ITimeLimit, PromiseOrValue, TimeLimitsParams} from './contracts'
import {CustomPromise} from '@flemist/async-utils'
import {PriorityQueue, Priority} from '@flemist/priority-queue'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {Task} from '@flemist/priority-queue/dist/lib/priority-queue/contracts'

export class TimeLimits implements ITimeLimit {
  private readonly _timeLimits: ITimeLimit[]
  private readonly _priorityQueue: PriorityQueue
  private readonly _tasks: Set<Task<any>>

  constructor({
    timeLimits,
    priorityQueue,
  }: TimeLimitsParams) {
    this._timeLimits = timeLimits
    this._priorityQueue = priorityQueue || new PriorityQueue()
    this._tickFunc = (abortSignal?: IAbortSignalFast) => this.tick(abortSignal)
    this._tasks = new Set()
    void this._availableUpdater()
  }

  private _hold() {
    const waitPromise = new CustomPromise()
    const waitFunc = () => waitPromise.promise
    for (let i = 0; i < this._timeLimits.length; i++) {
      void this._timeLimits[i].run(waitFunc, null, null, true)
    }

    if (!this.available()) {
      this._tasks.forEach(task => {
        task.setReadyToRun(false)
      })
    }

    return () => {
      waitPromise.resolve()
      if (this.available()) {
        this._tasks.forEach(task => {
          task.setReadyToRun(true)
        })
      }
    }
  }

  private readonly _tickFunc: () => Promise<void>
  tick(abortSignal?: IAbortSignalFast): Promise<void> {
    return Promise.race(this._timeLimits.map(o => o.tick(abortSignal)))
  }

  async _availableUpdater() {
    while (true) {
      await this.tick()
      if (this.available()) {
        this._tasks.forEach(task => {
          task.setReadyToRun(true)
        })
      }
    }
  }

  available() {
    return this._timeLimits.every(o => o.available())
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

    const release = this._hold()

    try {
      const result = await func(abortSignal)
      return result
    }
    finally {
      release()
    }
  }
}
