import { IAbortSignalFast } from '@flemist/abort-controller-fast';
import { Priority, IPriorityQueue } from '@flemist/priority-queue';
import { IPool } from './Pool';
export declare class Pools implements IPool {
    private readonly _pools;
    constructor(...pools: IPool[]);
    get maxSize(): number;
    get size(): number;
    get holdAvailable(): number;
    hold(count: number): boolean;
    get releaseAvailable(): number;
    release(count: number): Promise<number> | number;
    private readonly _tickFunc;
    tick(abortSignal?: IAbortSignalFast): Promise<void>;
    holdWait(count: number, abortSignal?: IAbortSignalFast, priorityQueue?: IPriorityQueue, priority?: Priority): Promise<void>;
}
