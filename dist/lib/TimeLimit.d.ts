import { ITimeLimit, PromiseOrValue, TimeLimitParams } from './contracts';
import { Priority } from '@flemist/priority-queue';
import { IAbortSignalFast } from '@flemist/abort-controller-fast';
export declare class TimeLimit implements ITimeLimit {
    private readonly _timeController;
    private readonly _maxCount;
    private readonly _timeMs;
    private readonly _priorityQueue;
    constructor({ maxCount, timeMs, priorityQueue, timeController, }: TimeLimitParams);
    private _activeCount;
    private _tickPromise;
    hold(): void;
    release(): void;
    private readonly _releaseFunc;
    private _release;
    available(): boolean;
    private readonly _tickFunc;
    tick(abortSignal?: IAbortSignalFast): Promise<void>;
    run<T>(func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>, priority?: Priority, abortSignal?: IAbortSignalFast, force?: boolean): Promise<T>;
}
