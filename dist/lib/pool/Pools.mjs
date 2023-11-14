import { __awaiter } from 'tslib';
import { PriorityQueue, awaitPriorityDefault } from '@flemist/priority-queue';
import { isPromiseLike, promiseAll, promiseRace } from '@flemist/async-utils';

class Pools {
    constructor(...pools) {
        if (!(pools === null || pools === void 0 ? void 0 : pools.length)) {
            throw new Error('pools should not be empty');
        }
        this._pools = pools;
        this._priorityQueue = new PriorityQueue();
    }
    get maxSize() {
        const pools = this._pools;
        let min;
        for (let i = 0, len = pools.length; i < len; i++) {
            const value = pools[i].maxSize;
            if (i === 0 || value < min) {
                min = value;
            }
        }
        return min;
    }
    get size() {
        const pools = this._pools;
        let min;
        for (let i = 0, len = pools.length; i < len; i++) {
            const value = pools[i].size;
            if (i === 0 || value < min) {
                min = value;
            }
        }
        return min;
    }
    get holdAvailable() {
        return this.size;
    }
    hold(count) {
        const size = this.size;
        if (count > size) {
            return false;
        }
        const pools = this._pools;
        for (let i = 0, len = pools.length; i < len; i++) {
            pools[i].hold(count);
        }
        return true;
    }
    get releaseAvailable() {
        return this.maxSize - this.size;
    }
    release(count, dontThrow) {
        const size = this.size;
        const maxReleaseCount = this.maxSize - size;
        if (count > maxReleaseCount) {
            if (dontThrow) {
                count = maxReleaseCount;
            }
            else {
                throw new Error(`count (${count} > maxReleaseCount (${maxReleaseCount}))`);
            }
        }
        if (count > 0) {
            const pools = this._pools;
            let promises = null;
            for (let i = 0, len = pools.length; i < len; i++) {
                const promise = pools[i].release(count, dontThrow);
                if (isPromiseLike(promise)) {
                    if (!promises) {
                        promises = [promise];
                    }
                    else {
                        promises.push(promise);
                    }
                }
            }
            if (promises) {
                return promiseAll(promises).then(() => count);
            }
        }
        return count;
    }
    tick(abortSignal) {
        let promises;
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

export { Pools };
