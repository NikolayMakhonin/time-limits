import { type IAbortSignalFast } from '@flemist/abort-controller-fast';
import { IPool } from './Pool';
import { PoolWrapper } from './PoolWrapper';
/**
 * К текущему size прибавляется size всех зависимостей.
 * Таким образом, этому пулу нужно будет ждать все зависимые пулы, но при этом не блокировать их.
 * Пример использования: есть 2 пула на загрузку данных, один загружает данные фоново, а второй для срочной загрузки по требованию. Чтобы добавить новую фоновую задачу, нужно убедиться что общее количество задач во всех пулах не превышает лимит. Но если нужно добавить срочную задачу, то нужно убедиться что только в срочном пуле есть место. В худшем случае будут заняты оба пула, но ненадолго, т.к. фоновые задачи будут завершаться, а новые фоновые задачи не будут добавляться, пока не освободится место.
 */
export declare class DependentPool extends PoolWrapper {
    private readonly _pools;
    constructor(pool: IPool, ...dependencies: IPool[]);
    get heldCount(): number;
    get holdAvailable(): number;
    canHold(count: number): boolean;
    hold(count: number): boolean;
    tick(abortSignal?: null | IAbortSignalFast): Promise<void> | void;
}
