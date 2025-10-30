import { type IAbortSignalFast } from '@flemist/abort-controller-fast';
import { Priority, type AwaitPriority } from '@flemist/priority-queue';
import { IPool } from './Pool';
export declare class Pools implements IPool {
    private readonly _priorityQueue;
    private readonly _pools;
    constructor(...pools: IPool[]);
    get maxSize(): number;
    get size(): number;
    get holdCount(): number;
    get holdAvailable(): number;
    get releaseAvailable(): number;
    tick(abortSignal?: IAbortSignalFast): Promise<void> | void;
    hold(count: number): boolean;
    release(count: number, dontThrow?: boolean): Promise<number> | number;
    holdWait(count: number, priority?: Priority, abortSignal?: IAbortSignalFast, awaitPriority?: AwaitPriority): Promise<void>;
}
