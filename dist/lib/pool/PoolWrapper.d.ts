import { IAbortSignalFast } from '@flemist/abort-controller-fast';
import { IPriorityQueue, Priority } from '@flemist/priority-queue';
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
    tick(abortSignal?: IAbortSignalFast): Promise<void>;
    holdWait(count: number, abortSignal?: IAbortSignalFast, priorityQueue?: IPriorityQueue, priority?: Priority): Promise<void>;
}
