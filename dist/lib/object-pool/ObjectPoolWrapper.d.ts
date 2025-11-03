import { type IAbortSignalFast } from '@flemist/abort-controller-fast';
import { Priority, type AwaitPriority } from '@flemist/priority-queue';
import { IPool } from "../pool/Pool";
import { IObjectPool } from './ObjectPool';
export declare class ObjectPoolWrapper<TObject extends object> implements IObjectPool<TObject> {
    protected readonly _objectPool: IObjectPool<TObject>;
    constructor(objectPool: IObjectPool<TObject>);
    get availableObjects(): ReadonlyArray<TObject>;
    get pool(): IPool;
    allocate(size?: null | number): Promise<number> | number;
    get(count: number): TObject[];
    getWait(count: number, priority?: null | Priority, abortSignal?: null | IAbortSignalFast, awaitPriority?: null | AwaitPriority): Promise<TObject[]>;
    release(objects: TObject[], start?: null | number, count?: null | number): Promise<number> | number;
    tick(abortSignal?: null | IAbortSignalFast): Promise<void> | void;
    use<TResult>(count: number, func: (objects: ReadonlyArray<TObject>, abortSignal?: null | IAbortSignalFast) => (Promise<TResult> | TResult), priority?: null | Priority, abortSignal?: null | IAbortSignalFast, awaitPriority?: null | AwaitPriority): Promise<TResult>;
}
