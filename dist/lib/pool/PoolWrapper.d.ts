import { type IAbortSignalFast } from '@flemist/abort-controller-fast';
import { IPool } from "./Pool";
export declare class PoolWrapper implements IPool {
    protected readonly _pool: IPool;
    constructor(pool: IPool);
    get heldCountMax(): number;
    get heldCount(): number;
    get holdAvailable(): number;
    get releaseAvailable(): number;
    canHold(count: number): boolean;
    hold(count: number): boolean;
    release(count: number, dontThrow?: null | boolean): number | Promise<number>;
    tick(abortSignal?: null | IAbortSignalFast): Promise<void> | void;
}
