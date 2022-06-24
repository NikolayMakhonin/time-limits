import {ITimeLimit, PromiseOrValue} from './contracts'
import {CustomPromise} from '@flemist/async-utils'
import {PriorityQueue, Priority} from '@flemist/priority-queue'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'

export class TimeLimits implements ITimeLimit {
  private readonly _timeLimits: ITimeLimit[]
  private readonly _priorityQueue: PriorityQueue

  constructor({
    timeLimits,
    priorityQueue,
  }: {
    timeLimits: ITimeLimit[],
    priorityQueue?: PriorityQueue,
  }) {
    this._timeLimits = timeLimits
    this._priorityQueue = priorityQueue
    this._tickFunc = (abortSignal?: IAbortSignalFast) => this.tick(abortSignal)
  }

  private readonly _tickFunc: () => Promise<void>
  tick(abortSignal?: IAbortSignalFast): Promise<void> {
    return Promise.race(this._timeLimits.map(o => o.tick(abortSignal)))
  }

  available() {
    return this._timeLimits.every(o => o.available())
  }


  async run<T>(
    func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
  ): Promise<T> {
    if (this._priorityQueue) {
      await this._priorityQueue.run(null, priority, abortSignal)
    }

    return this._run(func, priority, abortSignal)
  }

  private async _run<T>(
    func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
  ): Promise<T> {
    while (!this.available()) {
      await this.tick(abortSignal)
      if (this._priorityQueue) {
        await this._priorityQueue.run(null, priority, abortSignal)
      }
    }

    const waitPromise = new CustomPromise()
    const waitFunc = () => waitPromise.promise
    for (let i = 0; i < this._timeLimits.length; i++) {
      void (this._timeLimits[i] as any)._run(waitFunc)
    }

    try {
      const result = await func(abortSignal)
      return result
    }
    finally {
      waitPromise.resolve()
    }
  }
}