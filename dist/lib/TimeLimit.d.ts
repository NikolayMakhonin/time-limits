import { ITimeLimit, PromiseOrValue } from './contracts';
import { PriorityQueue, Priority } from '@flemist/priority-queue';
import { IAbortSignalFast } from '@flemist/abort-controller-fast';
import { ITimeController } from '@flemist/time-controller';
export declare class TimeLimit implements ITimeLimit {
    private readonly _timeController;
    private readonly _maxCount;
    private readonly _timeMs;
    private readonly _priorityQueue;
    constructor({ maxCount, timeMs, priorityQueue, timeController, }: {
        maxCount: number;
        timeMs: number;
        priorityQueue?: PriorityQueue;
        timeController?: ITimeController;
    });
    private _activeCount;
    private _tickPromise;
    private readonly _releaseFunc;
    private _release;
    private readonly _tickFunc;
    tick(abortSignal?: IAbortSignalFast): Promise<void>;
    available(): boolean;
    run<T>(func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>, priority?: Priority, abortSignal?: IAbortSignalFast): Promise<T>;
    private _run;
}
