import { ITimeLimit, PromiseOrValue, TimeLimitsParams } from './contracts';
import { Priority } from '@flemist/priority-queue';
import { IAbortSignalFast } from '@flemist/abort-controller-fast';
export declare class TimeLimits implements ITimeLimit {
    private readonly _timeLimits;
    private readonly _priorityQueue;
    constructor({ timeLimits, priorityQueue, }: TimeLimitsParams);
    hold(): void;
    release(): void;
    available(): boolean;
    private readonly _tickFunc;
    tick(abortSignal?: IAbortSignalFast): Promise<void>;
    run<T>(func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>, priority?: Priority, abortSignal?: IAbortSignalFast, force?: boolean): Promise<T>;
}
