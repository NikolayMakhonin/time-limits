import { __awaiter } from 'tslib';
import { CustomPromise } from '@flemist/async-utils';
import { promiseToAbortable } from './abort-controller-fast-utils/promiseToAbortable.mjs';
import { timeControllerDefault } from '@flemist/time-controller';

class TimeLimit {
    constructor({ maxCount, timeMs, priorityQueue, timeController, }) {
        this._activeCount = 0;
        this._tickPromise = new CustomPromise();
        this._timeController = timeController || timeControllerDefault;
        this._maxCount = maxCount;
        this._timeMs = timeMs;
        this._priorityQueue = priorityQueue;
        this._releaseFunc = () => {
            this._release();
        };
        this._tickFunc = (abortSignal) => this.tick(abortSignal);
    }
    _release() {
        this._activeCount--;
        if (this._activeCount === this._maxCount - 1) {
            const tickPromise = this._tickPromise;
            this._tickPromise = new CustomPromise();
            tickPromise.resolve();
        }
    }
    tick(abortSignal) {
        return promiseToAbortable(abortSignal, this._tickPromise.promise);
    }
    available() {
        return this._activeCount < this._maxCount;
    }
    run(func, priority, abortSignal) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._priorityQueue) {
                yield this._priorityQueue.run(null, priority, abortSignal);
            }
            return this._run(func, priority, abortSignal);
        });
    }
    _run(func, priority, abortSignal) {
        return __awaiter(this, void 0, void 0, function* () {
            while (!this.available()) {
                yield this.tick(abortSignal);
                if (this._priorityQueue) {
                    yield this._priorityQueue.run(null, priority, abortSignal);
                }
            }
            this._activeCount++;
            try {
                const result = yield func(abortSignal);
                return result;
            }
            finally {
                this._timeController.setTimeout(this._releaseFunc, this._timeMs);
            }
        });
    }
}

export { TimeLimit };
