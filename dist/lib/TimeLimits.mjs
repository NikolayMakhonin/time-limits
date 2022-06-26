import { __awaiter } from 'tslib';
import { CustomPromise } from '@flemist/async-utils';
import { PriorityQueue } from '@flemist/priority-queue';

class TimeLimits {
    constructor({ timeLimits, priorityQueue, }) {
        this._timeLimits = timeLimits;
        this._priorityQueue = priorityQueue || new PriorityQueue();
        this._tickFunc = (abortSignal) => this.tick(abortSignal);
        this._tasks = new Set();
        void this._availableUpdater();
    }
    _hold() {
        const waitPromise = new CustomPromise();
        const waitFunc = () => waitPromise.promise;
        for (let i = 0; i < this._timeLimits.length; i++) {
            void this._timeLimits[i].run(waitFunc, null, null, true);
        }
        if (!this.available()) {
            this._tasks.forEach(task => {
                task.setReadyToRun(false);
            });
        }
        return () => {
            waitPromise.resolve();
            if (this.available()) {
                this._tasks.forEach(task => {
                    task.setReadyToRun(true);
                });
            }
        };
    }
    tick(abortSignal) {
        return Promise.race(this._timeLimits.map(o => o.tick(abortSignal)));
    }
    _availableUpdater() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                yield this.tick();
                if (this.available()) {
                    this._tasks.forEach(task => {
                        task.setReadyToRun(true);
                    });
                }
            }
        });
    }
    available() {
        return this._timeLimits.every(o => o.available());
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
            const release = this._hold();
            try {
                const result = yield func(abortSignal);
                return result;
            }
            finally {
                release();
            }
        });
    }
}

export { TimeLimits };
