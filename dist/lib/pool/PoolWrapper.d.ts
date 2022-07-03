import { IAbortSignalFast } from '@flemist/abort-controller-fast';
import { Priority, AwaitPriority } from '@flemist/priority-queue';
import { IPool } from "./Pool";
export declare class PoolWrapper implements IPool {
    protected readonly _pool: IPool;
    constructor(pool: IPool);
    get size(): number;
    get maxSize(): number;
    get holdAvailable(): number;
    get releaseAvailable(): number;
    hold(count: number): boolean;
    release(count: number): number | Promise<number>;
    tick(abortSignal?: IAbortSignalFast): Promise<void> | void;
    holdWait(count: number, priority?: Priority, abortSignal?: IAbortSignalFast, awaitPriority?: AwaitPriority): Promise<void>;
}
