import { ITimeLimit, PromiseOrValue, TimeLimitsParams } from './contracts';
import { Priority } from '@flemist/priority-queue';
import { IAbortSignalFast } from '@flemist/abort-controller-fast';
export declare class TimeLimits implements ITimeLimit {
    private readonly _timeLimits;
    private readonly _priorityQueue;
    constructor({ timeLimits, priorityQueue, }: TimeLimitsParams);
    private readonly _tickFunc;
    tick(abortSignal?: IAbortSignalFast): Promise<void>;
    available(): boolean;
    run<T>(func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>, priority?: Priority, abortSignal?: IAbortSignalFast, ignorePriority?: boolean): Promise<T>;
}
