import { __awaiter } from 'tslib';
import { CustomPromise } from '@flemist/async-utils';
import { PriorityQueue } from '@flemist/priority-queue';
import { promiseToAbortable } from './abort-controller-fast-utils/promiseToAbortable.mjs';
import { timeControllerDefault } from '@flemist/time-controller';

class TimeLimit {
    constructor({ maxCount, timeMs, priorityQueue, timeController, }) {
        this._activeCount = 0;
        this._tickPromise = new CustomPromise();
        this._timeController = timeController || timeControllerDefault;
        this._maxCount = maxCount;
        this._timeMs = timeMs;
        this._priorityQueue = priorityQueue || new PriorityQueue();
        this._releaseFunc = () => {
            this._release();
        };
        this._tickFunc = (abortSignal) => this.tick(abortSignal);
        this._tasks = new Set();
    }
    hold() {
        this._activeCount++;
        if (this._activeCount === this._maxCount) {
            this._tasks.forEach(task => {
                task.setReadyToRun(false);
            });
        }
    }
    release() {
        this._timeController.setTimeout(this._releaseFunc, this._timeMs);
    }
    _release() {
        this._activeCount--;
        if (this._activeCount === this._maxCount - 1) {
            const tickPromise = this._tickPromise;
            this._tickPromise = new CustomPromise();
            tickPromise.resolve();
            this._tasks.forEach(task => {
                task.setReadyToRun(true);
            });
        }
    }
    available() {
        return this._activeCount < this._maxCount;
    }
    tick(abortSignal) {
        return promiseToAbortable(abortSignal, this._tickPromise.promise);
    }
    run(func, priority, abortSignal, force) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!force) {
                const task = this._priorityQueue.runTask(null, priority, abortSignal);
                this._tasks.add(task);
                task.setReadyToRun(this.available());
                yield task.result;
                this._tasks.delete(task);
            }
            this.hold();
            try {
                const result = yield func(abortSignal);
                return result;
            }
            finally {
                this.release();
            }
        });
    }
}

export { TimeLimit };
