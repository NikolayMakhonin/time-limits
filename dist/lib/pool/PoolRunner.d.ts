import { IAbortSignalFast } from '@flemist/abort-controller-fast';
import { Priority, AwaitPriority } from '@flemist/priority-queue';
import { IPool } from './Pool';
export interface IPoolRunner {
    pool: IPool;
    run<T>(count: number, func: (abortSignal?: IAbortSignalFast) => Promise<T> | T, priority?: Priority, abortSignal?: IAbortSignalFast, awaitPriority?: AwaitPriority): Promise<T>;
}
export declare class PoolRunner implements IPoolRunner {
    private readonly _pool;
    constructor(pool: IPool);
    get pool(): IPool;
    run<T>(count: number, func: (abortSignal?: IAbortSignalFast) => Promise<T> | T, priority?: Priority, abortSignal?: IAbortSignalFast, awaitPriority?: AwaitPriority): Promise<T>;
}
