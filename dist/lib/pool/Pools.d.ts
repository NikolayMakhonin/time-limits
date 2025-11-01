import { type IAbortSignalFast } from '@flemist/abort-controller-fast';
import { Priority, type AwaitPriority } from '@flemist/priority-queue';
import { IPool } from './Pool';
export declare class Pools implements IPool {
    private readonly _pools;
    constructor(...pools: IPool[]);
    get heldCountMax(): number;
    get heldCount(): number;
    get holdAvailable(): number;
    get releaseAvailable(): number;
    canHold(count: number | number[]): boolean;
    hold(count: number | number[]): boolean;
    release(count: number, dontThrow?: boolean): Promise<number> | number;
    release(count: number[], dontThrow?: boolean): Promise<number[]> | number[];
    tick(abortSignal?: IAbortSignalFast): Promise<void> | void;
}
export declare function poolsCanHold(pools: IPool[], count: number | number[]): boolean;
export declare function poolsHold(pools: IPool[], count: number | number[]): boolean;
export declare function poolsRelease(pools: IPool[], count: number, dontThrow?: boolean): Promise<number> | number;
export declare function poolsRelease(pools: IPool[], count: number[], dontThrow?: boolean): Promise<number[]> | number[];
export declare function poolsRelease(pools: IPool[], count: number | number[], dontThrow?: boolean): Promise<number | number[]> | number | number[];
export declare function poolsTick(pools: IPool[], abortSignal?: IAbortSignalFast): Promise<void>;
export declare function poolsWait({ pools, count, priority, abortSignal, awaitPriority, }: {
    pools: IPool[];
    count: number | number[];
    priority?: Priority;
    abortSignal?: IAbortSignalFast;
    awaitPriority?: AwaitPriority;
}): Promise<void>;
export declare function poolsWaitHold({ pools, count, priority, abortSignal, awaitPriority, }: {
    pools: IPool[];
    count: number | number[];
    priority?: Priority;
    abortSignal?: IAbortSignalFast;
    awaitPriority?: AwaitPriority;
}): Promise<void>;
