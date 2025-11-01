import { __awaiter } from 'tslib';
import { CustomPromise, promiseToAbortable } from '@flemist/async-utils';
import { PriorityQueue, awaitPriorityDefault } from '@flemist/priority-queue';

// export interface IPoolSync extends IPool {
//   release(count: number): number
// }
class Pool {
    constructor(heldCountMax) {
        this._heldCountMax = 0;
        this._heldCount = 0;
        this._tickPromise = new CustomPromise();
        if (!heldCountMax) {
            throw new Error('[Pool][constructor] heldCountMax should be > 0');
        }
        this._heldCountMax = heldCountMax;
    }
    get heldCountMax() {
        return this._heldCountMax;
    }
    get heldCount() {
        return this._heldCount;
    }
    get holdAvailable() {
        return Math.max(0, this._heldCountMax - this._heldCount);
    }
    get releaseAvailable() {
        return this._heldCount;
    }
    canHold(count) {
        return this.heldCount === 0 || count <= this.holdAvailable;
    }
    hold(count) {
        const heldCount = this._heldCount;
        if (heldCount !== 0 && count > this.holdAvailable) {
            return false;
        }
        this._heldCount = heldCount + count;
        return true;
    }
    release(count, dontThrow) {
        const heldCount = this._heldCount;
        if (count > heldCount) {
            if (dontThrow) {
                count = heldCount;
            }
            else {
                throw new Error(`[Pool][release] count (${count} > heldCount (${heldCount}))`);
            }
        }
        if (count > 0) {
            this._heldCount = heldCount - count;
            if (this._tickPromise) {
                const tickPromise = this._tickPromise;
                this._tickPromise = null;
                tickPromise.resolve();
            }
        }
        return count;
    }
    tick(abortSignal) {
        if (this._heldCount === 0) {
            return;
        }
        if (!this._tickPromise) {
            this._tickPromise = new CustomPromise();
        }
        return promiseToAbortable(abortSignal, this._tickPromise.promise);
    }
}
const poolPriorityQueue = new PriorityQueue();
function poolWait({ pool, count, priority, abortSignal, awaitPriority, }) {
    if (!awaitPriority) {
        awaitPriority = awaitPriorityDefault;
    }
    return poolPriorityQueue.run((abortSignal) => __awaiter(this, void 0, void 0, function* () {
        while (!pool.canHold(count)) {
            yield pool.tick(abortSignal);
            yield awaitPriority(priority, abortSignal);
        }
    }), priority, abortSignal);
}
function poolWaitHold({ pool, count, priority, abortSignal, awaitPriority, }) {
    return __awaiter(this, void 0, void 0, function* () {
        yield poolWait({ pool, count, priority, abortSignal, awaitPriority });
        if (!pool.hold(count)) {
            throw new Error('[poolHoldWait] Unexpected behavior');
        }
    });
}

export { Pool, poolPriorityQueue, poolWait, poolWaitHold };
