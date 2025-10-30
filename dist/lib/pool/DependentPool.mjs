import { __awaiter } from 'tslib';
import { PriorityQueue, awaitPriorityDefault } from '@flemist/priority-queue';
import { promiseRace } from '@flemist/async-utils';

/**
 * К текущему size прибавляется size всех зависимостей.
 * Таким образом, этому пулу нужно будет ждать все зависимые пулы, но при этом не блокировать их.
 * Пример использования: есть 2 пула на загрузку данных, один загружает данные фоново, а второй для срочной загрузки по требованию. Чтобы добавить новую фоновую задачу, нужно убедиться что общее количество задач во всех пулах не превышает лимит. Но если нужно добавить срочную задачу, то нужно убедиться что только в срочном пуле есть место. В худшем случае будут заняты оба пула, но ненадолго, т.к. фоновые задачи будут завершаться, а новые фоновые задачи не будут добавляться, пока не освободится место.
 */
class DependentPool {
    constructor(pool, ...dependencies) {
        this._pool = pool;
        this._pools = dependencies;
        this._priorityQueue = new PriorityQueue();
    }
    get maxSize() {
        return this._pool.maxSize;
    }
    get size() {
        return Math.min(0, this.maxSize - this.holdCount);
    }
    get holdCount() {
        let holdCount = this._pool.holdCount;
        const pools = this._pools;
        for (let i = 0, len = pools.length; i < len; i++) {
            holdCount += pools[i].holdCount;
        }
        return holdCount;
    }
    get holdAvailable() {
        return this.size;
    }
    get releaseAvailable() {
        return this._pool.releaseAvailable;
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
    hold(count) {
        const size = this.size;
        if (count > size) {
            return false;
        }
        return this._pool.hold(count);
    }
    release(count, dontThrow) {
        return this._pool.release(count, dontThrow);
    }
    holdWait(count, priority, abortSignal, awaitPriority) {
        return __awaiter(this, void 0, void 0, function* () {
            if (count > this.maxSize) {
                throw new Error(`holdCount (${count} > maxSize (${this.maxSize}))`);
            }
            if (!awaitPriority) {
                awaitPriority = awaitPriorityDefault;
            }
            yield this._priorityQueue.run((abortSignal) => __awaiter(this, void 0, void 0, function* () {
                while (count > this.size) {
                    yield this.tick(abortSignal);
                    if (awaitPriority) {
                        yield awaitPriority(priority, abortSignal);
                    }
                }
                if (!this.hold(count)) {
                    throw new Error('Unexpected behavior');
                }
            }), priority, abortSignal);
        });
    }
}

export { DependentPool };
