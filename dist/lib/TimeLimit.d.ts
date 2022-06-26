import { ITimeLimit, PromiseOrValue, TimeLimitParams } from './contracts';
import { Priority } from '@flemist/priority-queue';
import { IAbortSignalFast } from '@flemist/abort-controller-fast';
export declare class TimeLimit implements ITimeLimit {
    private readonly _timeController;
    private readonly _maxCount;
    private readonly _timeMs;
    private readonly _priorityQueue;
    private readonly _tasks;
    constructor({ maxCount, timeMs, priorityQueue, timeController, }: TimeLimitParams);
    private _activeCount;
    private _tickPromise;
    private _hold;
    private readonly _releaseFunc;
    private _release;
    private readonly _tickFunc;
    tick(abortSignal?: IAbortSignalFast): Promise<void>;
    available(): boolean;
    run<T>(func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>, priority?: Priority, abortSignal?: IAbortSignalFast, force?: boolean): Promise<T>;
}
