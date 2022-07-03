'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var asyncUtils = require('@flemist/async-utils');
var priorityQueue = require('@flemist/priority-queue');

// export interface IPoolSync extends IPool {
//   release(count: number): number
// }
class Pool {
    constructor(maxSize) {
        this._maxSize = 0;
        this._size = 0;
        this._tickPromise = new asyncUtils.CustomPromise();
        if (!maxSize) {
            throw new Error('maxSize should be > 0');
        }
        this._maxSize = maxSize;
        this._size = maxSize;
        this._priorityQueue = new priorityQueue.PriorityQueue();
    }
    get maxSize() {
        return this._maxSize;
    }
    get size() {
        return this._size;
    }
    get holdAvailable() {
        return this._size;
    }
    hold(count) {
        const size = this._size;
        if (count > size) {
            return false;
        }
        this._size = size - count;
        return true;
    }
    get releaseAvailable() {
        return this.maxSize - this._size;
    }
    release(count) {
        const size = this._size;
        const maxReleaseCount = this.maxSize - size;
        if (count > maxReleaseCount) {
            count = maxReleaseCount;
        }
        if (count > 0) {
            this._size = size + count;
            if (this._tickPromise) {
                const tickPromise = this._tickPromise;
                this._tickPromise = null;
                tickPromise.resolve();
            }
        }
        return count;
    }
    tick(abortSignal) {
        if (this._size > 0) {
            return;
        }
        if (!this._tickPromise) {
            this._tickPromise = new asyncUtils.CustomPromise();
        }
        return asyncUtils.promiseToAbortable(abortSignal, this._tickPromise.promise);
    }
    holdWait(count, priority, abortSignal, priorityQueue) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            if (count > this.maxSize) {
                throw new Error(`holdCount (${count} > maxSize (${this.maxSize}))`);
            }
            yield this._priorityQueue.run((abortSignal) => tslib.__awaiter(this, void 0, void 0, function* () {
                while (count > this._size) {
                    yield this.tick(abortSignal);
                    if (priorityQueue) {
                        yield priorityQueue.run(null, priority, abortSignal);
                    }
                }
                if (!this.hold(count)) {
                    throw new Error('Unexpected behavior');
                }
            }), priority, abortSignal);
        });
    }
}

exports.Pool = Pool;
