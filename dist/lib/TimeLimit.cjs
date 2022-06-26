'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var asyncUtils = require('@flemist/async-utils');
var abortControllerFastUtils_promiseToAbortable = require('./abort-controller-fast-utils/promiseToAbortable.cjs');
var timeController = require('@flemist/time-controller');

class TimeLimit {
    constructor({ maxCount, timeMs, priorityQueue, timeController: timeController$1, }) {
        this._activeCount = 0;
        this._tickPromise = new asyncUtils.CustomPromise();
        this._timeController = timeController$1 || timeController.timeControllerDefault;
        this._maxCount = maxCount;
        this._timeMs = timeMs;
        this._priorityQueue = priorityQueue;
        this._releaseFunc = () => {
            this._release();
        };
        this._tickFunc = (abortSignal) => this.tick(abortSignal);
    }
    hold() {
        this._activeCount++;
    }
    release() {
        this._timeController.setTimeout(this._releaseFunc, this._timeMs);
    }
    _release() {
        this._activeCount--;
        if (this._activeCount === this._maxCount - 1) {
            const tickPromise = this._tickPromise;
            this._tickPromise = new asyncUtils.CustomPromise();
            tickPromise.resolve();
        }
    }
    available() {
        return this._activeCount < this._maxCount;
    }
    tick(abortSignal) {
        return abortControllerFastUtils_promiseToAbortable.promiseToAbortable(abortSignal, this._tickPromise.promise);
    }
    run(func, priority, abortSignal, force) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
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

exports.TimeLimit = TimeLimit;
