import { IAbortSignalFast } from '@flemist/abort-controller-fast';
import { Priority, IPriorityQueue } from '@flemist/priority-queue';
import { IPool } from './Pool';
export declare class Pools implements IPool {
    private readonly _pools;
    private readonly _priorityQueue;
    constructor({ pools, priorityQueue, }: {
        pools: IPool[];
        priorityQueue?: IPriorityQueue;
    });
    get maxSize(): number;
    get size(): number;
    get holdAvailable(): number;
    hold(count: number): boolean;
    get releaseAvailable(): number;
    release(count: number): Promise<number> | number;
    private readonly _tickFunc;
    tick(abortSignal?: IAbortSignalFast): Promise<void>;
    holdWait(count: number, priority?: Priority, abortSignal?: IAbortSignalFast): Promise<void>;
}
