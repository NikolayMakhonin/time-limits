import { IAbortSignalFast } from '@flemist/abort-controller-fast';
import { Priority, IPriorityQueue } from '@flemist/priority-queue';
import { IPool } from './Pool';
export declare class Pools implements IPool {
    private readonly _priorityQueue;
    private readonly _pools;
    constructor(...pools: IPool[]);
    get maxSize(): number;
    get size(): number;
    get holdAvailable(): number;
    hold(count: number): boolean;
    get releaseAvailable(): number;
    release(count: number): Promise<number> | number;
    tick(abortSignal?: IAbortSignalFast): Promise<void> | void;
    holdWait(count: number, priority?: Priority, abortSignal?: IAbortSignalFast, priorityQueue?: IPriorityQueue): Promise<void>;
}
