import { ITimeLimit, PromiseOrValue } from './contracts';
import { PriorityQueue, Priority } from '@flemist/priority-queue';
import { IAbortSignalFast } from '@flemist/abort-controller-fast';
export declare class TimeLimits implements ITimeLimit {
    private readonly _timeLimits;
    private readonly _priorityQueue;
    constructor({ timeLimits, priorityQueue, }: {
        timeLimits: ITimeLimit[];
        priorityQueue?: PriorityQueue;
    });
    private readonly _tickFunc;
    tick(abortSignal?: IAbortSignalFast): Promise<void>;
    available(): boolean;
    run<T>(func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>, priority?: Priority, abortSignal?: IAbortSignalFast): Promise<T>;
    private _run;
}
