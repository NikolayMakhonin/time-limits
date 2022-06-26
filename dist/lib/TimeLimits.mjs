import { __awaiter } from 'tslib';

class TimeLimits {
    constructor({ timeLimits, priorityQueue, }) {
        this._timeLimits = timeLimits;
        this._priorityQueue = priorityQueue;
        this._tickFunc = (abortSignal) => this.tick(abortSignal);
    }
    hold() {
        for (let i = 0; i < this._timeLimits.length; i++) {
            this._timeLimits[i].hold();
        }
    }
    release() {
        for (let i = 0; i < this._timeLimits.length; i++) {
            this._timeLimits[i].release();
        }
    }
    available() {
        return this._timeLimits.every(o => o.available());
    }
    tick(abortSignal) {
        return Promise.race(this._timeLimits.map(o => o.tick(abortSignal)));
    }
    run(func, priority, abortSignal, force) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!force && this._priorityQueue) {
                yield this._priorityQueue.run(null, priority, abortSignal);
            }
            while (!this.available()) {
                if (!force && this._priorityQueue) {
                    yield this._priorityQueue.run(this._tickFunc, priority, abortSignal);
                }
                else {
                    yield this.tick(abortSignal);
                }
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

export { TimeLimits };
