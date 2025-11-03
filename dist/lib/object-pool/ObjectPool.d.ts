import { type IAbortSignalFast } from '@flemist/abort-controller-fast';
import { IStackPool } from "./StackPool";
import { IPool } from "../pool";
import { Priority, type AwaitPriority } from '@flemist/priority-queue';
export interface IObjectPool<TObject extends object> {
    readonly pool: IPool;
    readonly availableObjects: ReadonlyArray<TObject>;
    readonly heldObjects?: null | ReadonlySet<TObject>;
    get(count: number): TObject[];
    /** it returns false if the obj cannot be pushed into the object pool (if size >= maxSize) */
    release(objects: TObject[], start?: null | number, count?: null | number): Promise<number> | number;
    /** it will resolve when size > 0 */
    tick(abortSignal?: null | IAbortSignalFast): Promise<void> | void;
    /** wait available > 0 and get, use this for concurrency get */
    getWait(count: number, priority?: null | Priority, abortSignal?: null | IAbortSignalFast, awaitPriority?: null | AwaitPriority): Promise<TObject[]>;
    use<TResult>(count: number, func: (objects: ReadonlyArray<TObject>, abortSignal?: null | IAbortSignalFast) => Promise<TResult> | TResult, priority?: null | Priority, abortSignal?: null | IAbortSignalFast, awaitPriority?: null | AwaitPriority): Promise<TResult>;
    allocate(size?: null | number): Promise<number> | number;
}
export declare type ObjectPoolArgs<TObject extends object> = {
    pool: IPool;
    /** custom availableObjects */
    availableObjects?: null | IStackPool<TObject>;
    /** use heldObjects so that you can know which objects are taken and not released to the pool */
    heldObjects?: null | boolean | Set<TObject>;
    create: () => Promise<TObject> | TObject;
    destroy?: null | ((obj: TObject) => Promise<void> | void);
};
export declare class ObjectPool<TObject extends object> implements IObjectPool<TObject> {
    private readonly _pool;
    private readonly _allocatePool;
    private readonly _availableObjects;
    private readonly _heldObjects;
    private readonly _create?;
    private readonly _destroy?;
    constructor({ pool, availableObjects, heldObjects, destroy, create, }: ObjectPoolArgs<TObject>);
    get pool(): IPool;
    get availableObjects(): ReadonlyArray<TObject>;
    /** which objects are taken and not released to the pool */
    get heldObjects(): ReadonlySet<TObject>;
    get(count: number): TObject[];
    release(objects: TObject[], start?: null | number, end?: null | number): Promise<number>;
    private _release;
    tick(abortSignal?: null | IAbortSignalFast): Promise<void> | void;
    getWait(count: number, priority?: null | Priority, abortSignal?: null | IAbortSignalFast, awaitPriority?: null | AwaitPriority): Promise<TObject[]>;
    use<TResult>(count: number, func: (objects: ReadonlyArray<TObject>, abortSignal?: null | IAbortSignalFast) => Promise<TResult> | TResult, priority?: null | Priority, abortSignal?: null | IAbortSignalFast, awaitPriority?: null | AwaitPriority): Promise<TResult>;
    allocate(size?: null | number): Promise<number> | number;
}
