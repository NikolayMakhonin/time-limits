import { IAbortSignalFast } from '@flemist/abort-controller-fast';
import { IStackPool } from "./StackPool";
import { IPool } from "../pool";
export interface IObjectPool<TObject extends object> {
    readonly pool: IPool;
    readonly availableObjects: ReadonlyArray<TObject>;
    readonly holdObjects?: ReadonlySet<TObject>;
    get(count: number): TObject[];
    /** it returns false if the obj cannot be pushed into the object pool (if size >= maxSize) */
    release(objects: TObject[], start?: number, count?: number): Promise<number> | number;
    /** it will resolve when size > 0 */
    tick(abortSignal?: IAbortSignalFast): Promise<void>;
    /** wait available > 0 and get, use this for concurrency get */
    getWait(count: number, abortSignal?: IAbortSignalFast): Promise<TObject[]>;
    use<TResult>(count: number, func: (objects: ReadonlyArray<TObject>, abortSignal?: IAbortSignalFast) => Promise<TResult> | TResult, abortSignal?: IAbortSignalFast): Promise<TResult>;
    allocate(size?: number): Promise<number> | number;
}
export declare type ObjectPoolArgs<TObject extends object> = {
    maxSize?: number;
    pool?: IPool;
    availableObjects?: IStackPool<TObject>;
    holdObjects?: boolean | Set<TObject>;
    create?: () => Promise<TObject> | TObject;
    destroy?: (obj: TObject) => Promise<void> | void;
};
export declare class ObjectPool<TObject extends object> implements IObjectPool<TObject> {
    private readonly _pool;
    private readonly _availableObjects;
    private readonly _holdObjects;
    private readonly _create?;
    private readonly _destroy?;
    constructor({ maxSize, pool, availableObjects, holdObjects, destroy, create, }: ObjectPoolArgs<TObject>);
    get pool(): IPool;
    get availableObjects(): ReadonlyArray<TObject>;
    get holdObjects(): ReadonlySet<TObject>;
    get(count: number): TObject[];
    release(objects: TObject[], start?: number, end?: number): Promise<number>;
    tick(abortSignal?: IAbortSignalFast): Promise<void>;
    getWait(count: number, abortSignal?: IAbortSignalFast): Promise<TObject[]>;
    use<TResult>(count: number, func: (objects: ReadonlyArray<TObject>, abortSignal?: IAbortSignalFast) => Promise<TResult> | TResult, abortSignal?: IAbortSignalFast): Promise<TResult>;
    allocate(size?: number): Promise<number> | number;
}
