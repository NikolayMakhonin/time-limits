import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {Priority, PriorityQueue} from '@flemist/priority-queue'
import {ITimeController} from '@flemist/time-controller'

export type PromiseOrValue<T> = T | Promise<T>

export interface ITimeLimit {
  tick(abortSignal?: IAbortSignalFast): Promise<void>
  available(): boolean
  hold(): void
  release(): void
  run<T>(
    func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
    ignorePriority?: boolean,
  ): Promise<T>;
}

export type TimeLimitParams = {
  maxCount: number,
  timeMs: number,
  priorityQueue?: PriorityQueue,
  timeController?: ITimeController,
}

export type TimeLimitsParams = {
  timeLimits: ITimeLimit[],
  priorityQueue?: PriorityQueue,
}
