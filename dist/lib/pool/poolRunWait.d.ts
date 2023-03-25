import { IPool } from "./..";
import { IAbortSignalFast } from '@flemist/abort-controller-fast';
import { AwaitPriority, Priority } from '@flemist/priority-queue';
export declare type PoolRunWaitArgs<T> = {
    pool: IPool;
    count: number;
    /** @param holdPool - pool with `count` size, you can use it for nested checks using poolRunThrow */
    func: (holdPool: IPool, abortSignal?: IAbortSignalFast) => Promise<T> | T;
    priority?: Priority;
    abortSignal?: IAbortSignalFast;
    awaitPriority?: AwaitPriority;
};
export declare function runPoolWait<T>({ pool, count, func, priority, abortSignal, awaitPriority, }: PoolRunWaitArgs<T>): Promise<T>;
