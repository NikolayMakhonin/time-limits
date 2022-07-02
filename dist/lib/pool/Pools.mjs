import { __awaiter } from 'tslib';
import { isPromiseLike } from '@flemist/async-utils';

class Pools {
    constructor({ pools, priorityQueue, }) {
        if (!(pools === null || pools === void 0 ? void 0 : pools.length)) {
            throw new Error('pools should not be empty');
        }
        this._pools = pools;
        this._priorityQueue = priorityQueue;
        this._tickFunc = (abortSignal) => this.tick(abortSignal);
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
    release(count) {
        const size = this.size;
        const maxReleaseCount = this.maxSize - size;
        if (count > maxReleaseCount) {
            count = maxReleaseCount;
        }
        if (count > 0) {
            const pools = this._pools;
            let promises = null;
            for (let i = 0, len = pools.length; i < len; i++) {
                const promise = pools[i].release(count);
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
                return Promise.all(promises).then(() => count);
            }
        }
        return count;
    }
    tick(abortSignal) {
        return Promise.race(this._pools.map(o => o.tick(abortSignal)));
    }
    holdWait(count, priority, abortSignal) {
        return __awaiter(this, void 0, void 0, function* () {
            if (count > this.maxSize) {
                throw new Error(`holdCount (${count} > maxSize (${this.maxSize}))`);
            }
            if (this._priorityQueue) {
                yield this._priorityQueue.run(null, priority, abortSignal);
            }
            while (count > this.size) {
                if (this._priorityQueue) {
                    yield this._priorityQueue.run(this._tickFunc, priority, abortSignal);
                }
                else {
                    yield this.tick(abortSignal);
                }
            }
            if (!this.hold(count)) {
                throw new Error('Unexpected behavior');
            }
        });
    }
}

export { Pools };
