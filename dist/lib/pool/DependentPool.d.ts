import { type IAbortSignalFast } from '@flemist/abort-controller-fast';
import { Priority, type AwaitPriority } from '@flemist/priority-queue';
import { IPool } from './Pool';
/**
 * К текущему size прибавляется size всех зависимостей.
 * Таким образом, этому пулу нужно будет ждать все зависимые пулы, но при этом не блокировать их.
 * Пример использования: есть 2 пула на загрузку данных, один загружает данные фоново, а второй для срочной загрузки по требованию. Чтобы добавить новую фоновую задачу, нужно убедиться что общее количество задач во всех пулах не превышает лимит. Но если нужно добавить срочную задачу, то нужно убедиться что только в срочном пуле есть место. В худшем случае будут заняты оба пула, но ненадолго, т.к. фоновые задачи будут завершаться, а новые фоновые задачи не будут добавляться, пока не освободится место.
 */
export declare class DependentPool implements IPool {
    private readonly _priorityQueue;
    private readonly _pool;
    private readonly _pools;
    constructor(pool: IPool, ...dependencies: IPool[]);
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
