import { type IAbortSignalFast } from '@flemist/abort-controller-fast';
import { type AwaitPriority, Priority } from '@flemist/priority-queue';
import { IPool } from './Pool';
/** @deprecated use poolRunWait */
export interface IPoolRunner {
    pool: IPool;
    run<T>(count: number, func: (abortSignal?: null | IAbortSignalFast) => Promise<T> | T, priority?: null | Priority, abortSignal?: null | IAbortSignalFast, awaitPriority?: null | AwaitPriority): Promise<T>;
}
/** @deprecated use poolRunWait */
export declare class PoolRunner implements IPoolRunner {
    private readonly _pool;
    constructor(pool: IPool);
    get pool(): IPool;
    run<T>(count: number, func: (abortSignal?: null | IAbortSignalFast) => Promise<T> | T, priority?: null | Priority, abortSignal?: null | IAbortSignalFast, awaitPriority?: null | AwaitPriority): Promise<T>;
}
