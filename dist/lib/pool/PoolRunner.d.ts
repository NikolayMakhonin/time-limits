import { IAbortSignalFast } from '@flemist/abort-controller-fast';
import { IPriorityQueue, Priority } from '@flemist/priority-queue';
import { IPool } from './Pool';
export interface IPoolRunner extends IPriorityQueue {
    pool: IPool;
}
export declare type PoolRunnerParams = {
    pool: IPool;
};
export declare class PoolRunner implements IPoolRunner {
    private readonly _pool;
    constructor({ pool, }: PoolRunnerParams);
    get pool(): IPool;
    run<T>(func: (abortSignal?: IAbortSignalFast) => Promise<T> | T, priority?: Priority, abortSignal?: IAbortSignalFast): Promise<T>;
}
