import { IPool } from "./..";
import { type IAbortSignalFast } from '@flemist/abort-controller-fast';
import { type AwaitPriority, Priority } from '@flemist/priority-queue';
import { type PromiseLikeOrValue } from '@flemist/async-utils';
export declare type PoolRunWaitArgs<T> = {
    pool: IPool;
    count: number;
    /** @param holdPool - pool with `count` size, you can use it for nested checks using poolRunThrow */
    func: (holdPool: IPool, abortSignal?: IAbortSignalFast) => T;
    priority?: Priority;
    abortSignal?: IAbortSignalFast;
    awaitPriority?: AwaitPriority;
};
export declare function poolRunWait<T>({ pool, count, func, priority, abortSignal, awaitPriority, }: PoolRunWaitArgs<PromiseLikeOrValue<T>>): PromiseLike<T>;
