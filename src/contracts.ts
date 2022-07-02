import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {Priority, IPriorityQueue} from '@flemist/priority-queue'
import {ITimeController} from '@flemist/time-controller'
import {IPool} from 'src/pool'

export type PromiseOrValue<T> = T | Promise<T>

export interface ITimeLimit {
  hold(): void
  release(): void
  available(): boolean
  tick(abortSignal?: IAbortSignalFast): Promise<void>
  run<T>(
    func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
    force?: boolean,
  ): Promise<T>;
}

export type TimeLimitParams = {
  maxCount?: number,
  pool?: IPool,
  time: number,
  priorityQueue?: IPriorityQueue,
  timeController?: ITimeController,
}

export type TimeLimitsParams = {
  timeLimits: ITimeLimit[],
  priorityQueue?: IPriorityQueue,
}
