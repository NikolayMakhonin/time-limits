import { IAbortSignalFast } from '@flemist/abort-controller-fast';
import { IPriorityQueue, Priority } from '@flemist/priority-queue';
import { IPool } from "../pool/Pool";
import { IObjectPool } from './ObjectPool';
export declare class ObjectPoolWrapper<TObject extends object> implements IObjectPool<TObject> {
    protected readonly _objectPool: IObjectPool<TObject>;
    constructor(objectPool: IObjectPool<TObject>);
    get availableObjects(): ReadonlyArray<TObject>;
    get pool(): IPool;
    allocate(size?: number): Promise<number> | number;
    get(count: number): TObject[];
    getWait(count: number, priority?: Priority, abortSignal?: IAbortSignalFast, priorityQueue?: IPriorityQueue): Promise<TObject[]>;
    release(objects: TObject[], start?: number, count?: number): Promise<number> | number;
    tick(abortSignal?: IAbortSignalFast): Promise<void> | void;
    use<TResult>(count: number, func: (objects: ReadonlyArray<TObject>, abortSignal?: IAbortSignalFast) => (Promise<TResult> | TResult), priority?: Priority, abortSignal?: IAbortSignalFast, priorityQueue?: IPriorityQueue): Promise<TResult>;
}
