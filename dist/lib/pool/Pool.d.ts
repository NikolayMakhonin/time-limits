import { type IAbortSignalFast } from '@flemist/abort-controller-fast';
import { type AwaitPriority, Priority, PriorityQueue } from '@flemist/priority-queue';
export interface IPool {
    readonly heldCountMax: number;
    readonly heldCount: number;
    readonly holdAvailable: number;
    readonly releaseAvailable: number;
    canHold(count: number): boolean;
    hold(count: number): boolean;
    release(count: number, dontThrow?: boolean): Promise<number> | number;
    tick(abortSignal?: IAbortSignalFast): Promise<void> | void;
}
export declare class Pool implements IPool {
    private readonly _heldCountMax;
    private _heldCount;
    constructor(heldCountMax: number);
    get heldCountMax(): number;
    get heldCount(): number;
    get holdAvailable(): number;
    get releaseAvailable(): number;
    canHold(count: number): boolean;
    hold(count: number): boolean;
    release(count: number, dontThrow?: boolean): number;
    private _tickPromise;
    tick(abortSignal?: IAbortSignalFast): Promise<void> | void;
}
export declare const poolPriorityQueue: PriorityQueue;
export declare function poolWait({ pool, count, priority, abortSignal, awaitPriority, }: {
    pool: IPool;
    count: number;
    priority?: Priority;
    abortSignal?: IAbortSignalFast;
    awaitPriority?: AwaitPriority;
}): Promise<void>;
export declare function poolWaitHold({ pool, count, priority, abortSignal, awaitPriority, }: {
    pool: IPool;
    count: number;
    priority?: Priority;
    abortSignal?: IAbortSignalFast;
    awaitPriority?: AwaitPriority;
}): Promise<void>;
