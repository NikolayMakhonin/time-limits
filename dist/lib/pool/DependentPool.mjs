import { promiseRace } from '@flemist/async-utils';
import { PoolWrapper } from './PoolWrapper.mjs';

/**
 * К текущему size прибавляется size всех зависимостей.
 * Таким образом, этому пулу нужно будет ждать все зависимые пулы, но при этом не блокировать их.
 * Пример использования: есть 2 пула на загрузку данных, один загружает данные фоново, а второй для срочной загрузки по требованию. Чтобы добавить новую фоновую задачу, нужно убедиться что общее количество задач во всех пулах не превышает лимит. Но если нужно добавить срочную задачу, то нужно убедиться что только в срочном пуле есть место. В худшем случае будут заняты оба пула, но ненадолго, т.к. фоновые задачи будут завершаться, а новые фоновые задачи не будут добавляться, пока не освободится место.
 */
class DependentPool extends PoolWrapper {
    constructor(pool, ...dependencies) {
        super(pool);
        this._pools = dependencies;
    }
    get heldCount() {
        let heldCount = this._pool.heldCount;
        const pools = this._pools;
        for (let i = 0, len = pools.length; i < len; i++) {
            heldCount += pools[i].heldCount;
        }
        return heldCount;
    }
    get holdAvailable() {
        return Math.min(0, this.heldCountMax - this.heldCount);
    }
    canHold(count) {
        return this.heldCount === 0 || count <= this.holdAvailable;
    }
    hold(count) {
        if (!this.canHold(count)) {
            return false;
        }
        return this._pool.hold(count);
    }
    tick(abortSignal) {
        let promises;
        const promise = this._pool.tick(abortSignal);
        if (promise) {
            promises = [promise];
        }
        for (let i = 0, len = this._pools.length; i < len; i++) {
            const promise = this._pools[i].tick(abortSignal);
            if (promise) {
                if (!promises) {
                    promises = [promise];
                }
                else {
                    promises.push(promise);
                }
            }
        }
        if (!promises) {
            return null;
        }
        return promiseRace(promises);
    }
}

export { DependentPool };
