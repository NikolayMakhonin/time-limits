import { IAbortSignalFast } from '@flemist/abort-controller-fast';
import { Priority, IPriorityQueue } from '@flemist/priority-queue';
export interface IPool {
    readonly size: number;
    readonly maxSize: number;
    holdAvailable: number;
    hold(count: number): boolean;
    /** it returns false if the obj cannot be pushed into the object pool (if size >= maxSize) */
    releaseAvailable: number;
    release(count: number): Promise<number> | number;
    /** it will resolve when size > 0 */
    tick(abortSignal?: IAbortSignalFast): Promise<void>;
    /** wait size > 0 and hold, use this for concurrency hold */
    holdWait(count: number, abortSignal?: IAbortSignalFast, priorityQueue?: IPriorityQueue, priority?: Priority): Promise<void>;
}
export declare class Pool implements IPool {
    private readonly _maxSize;
    private _size;
    constructor(maxSize: number);
    get maxSize(): number;
    get size(): number;
    get holdAvailable(): number;
    hold(count: number): boolean;
    get releaseAvailable(): number;
    release(count: number): number;
    private readonly _tickFunc;
    private _tickPromise;
    tick(abortSignal?: IAbortSignalFast): Promise<void>;
    holdWait(count: number, abortSignal?: IAbortSignalFast, priorityQueue?: IPriorityQueue, priority?: Priority): Promise<void>;
}