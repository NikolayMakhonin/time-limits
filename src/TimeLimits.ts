import {ITimeLimit, PromiseOrValue, TimeLimitsParams} from './contracts'
import {PriorityQueue, Priority} from '@flemist/priority-queue'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'

export class TimeLimits implements ITimeLimit {
  private readonly _timeLimits: ITimeLimit[]
  private readonly _priorityQueue: PriorityQueue

  constructor({
    timeLimits,
    priorityQueue,
  }: TimeLimitsParams) {
    this._timeLimits = timeLimits
    this._priorityQueue = priorityQueue
    this._tickFunc = (abortSignal?: IAbortSignalFast) => this.tick(abortSignal)
  }

  hold() {
    for (let i = 0; i < this._timeLimits.length; i++) {
      this._timeLimits[i].hold()
    }
  }

  release() {
    for (let i = 0; i < this._timeLimits.length; i++) {
      this._timeLimits[i].release()
    }
  }

  available() {
    return this._timeLimits.every(o => o.available())
  }

  private readonly _tickFunc: () => Promise<void>
  tick(abortSignal?: IAbortSignalFast): Promise<void> {
    return Promise.race(this._timeLimits.map(o => o.tick(abortSignal)))
  }

  async run<T>(
    func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
    force?: boolean,
  ): Promise<T> {
    if (!force && this._priorityQueue) {
      await this._priorityQueue.run(null, priority, abortSignal)
    }

    while (!this.available()) {
      if (!force && this._priorityQueue) {
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
