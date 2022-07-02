import { IAbortSignalFast } from '@flemist/abort-controller-fast';
import { Priority } from '@flemist/priority-queue';
import { IPool } from "./Pool";
export interface IPoolWrapper extends IPool {
}
export declare type PoolWrapperParams = {
    pool: IPool;
};
export declare class PoolWrapper implements IPoolWrapper {
    protected readonly _pool: IPool;
    constructor({ pool, }: PoolWrapperParams);
    get size(): number;
    get maxSize(): number;
    get holdAvailable(): number;
    get releaseAvailable(): number;
    hold(count: number): boolean;
    release(count: number): number | Promise<number>;
    tick(abortSignal?: IAbortSignalFast): Promise<void>;
    holdWait(count: number, priority?: Priority, abortSignal?: IAbortSignalFast): Promise<void>;
}
