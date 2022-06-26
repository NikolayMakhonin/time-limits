import { __awaiter } from 'tslib';
import { CustomPromise } from '@flemist/async-utils';

class TimeLimits {
    constructor({ timeLimits, priorityQueue, }) {
        this._timeLimits = timeLimits;
        this._priorityQueue = priorityQueue;
        this._tickFunc = (abortSignal) => this.tick(abortSignal);
    }
    tick(abortSignal) {
        return Promise.race(this._timeLimits.map(o => o.tick(abortSignal)));
    }
    available() {
        return this._timeLimits.every(o => o.available());
    }
    run(func, priority, abortSignal, ignorePriority) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ignorePriority && this._priorityQueue) {
                yield this._priorityQueue.run(null, priority, abortSignal);
            }
            while (!this.available()) {
                if (!ignorePriority && this._priorityQueue) {
                    yield this._priorityQueue.run(this._tickFunc, priority, abortSignal);
                }
                else {
                    yield this.tick(abortSignal);
                }
            }
            const waitPromise = new CustomPromise();
            const waitFunc = () => waitPromise.promise;
            for (let i = 0; i < this._timeLimits.length; i++) {
                void this._timeLimits[i].run(waitFunc, null, null, true);
            }
            try {
                const result = yield func(abortSignal);
                return result;
            }
            finally {
                waitPromise.resolve();
            }
        });
    }
}

export { TimeLimits };
