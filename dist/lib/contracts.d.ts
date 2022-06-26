import { IAbortSignalFast } from '@flemist/abort-controller-fast';
import { Priority, PriorityQueue } from '@flemist/priority-queue';
import { ITimeController } from '@flemist/time-controller';
export declare type PromiseOrValue<T> = T | Promise<T>;
export interface ITimeLimit {
    tick(abortSignal?: IAbortSignalFast): Promise<void>;
    available(): boolean;
    run<T>(func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>, priority?: Priority, abortSignal?: IAbortSignalFast, force?: boolean): Promise<T>;
}
export declare type TimeLimitParams = {
    maxCount: number;
    timeMs: number;
    priorityQueue?: PriorityQueue;
    timeController?: ITimeController;
};
export declare type TimeLimitsParams = {
    timeLimits: ITimeLimit[];
    priorityQueue?: PriorityQueue;
};
