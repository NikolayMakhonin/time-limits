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
            const waitPromise = new CustomPromise();
            const waitFunc = () => waitPromise.promise;
            for (let i = 0; i < this._timeLimits.length; i++) {
                void this._timeLimits[i]._run(waitFunc);
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
