'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var timeController = require('@flemist/time-controller');
var pool_Pool = require('./pool/Pool.cjs');
require('@flemist/async-utils');

class TimeLimit {
    constructor({ maxCount, pool, time, priorityQueue, timeController: timeController$1, }) {
        this._timeController = timeController$1 || timeController.timeControllerDefault;
        this._maxCount = maxCount;
        this._pool = pool || new pool_Pool.Pool({
            maxSize: maxCount,
            priorityQueue,
        });
        this._time = time;
        this._priorityQueue = priorityQueue;
        this._releaseFunc = () => {
            this._release();
        };
        this._tickFunc = (abortSignal) => this.tick(abortSignal);
    }
    // private _activeCount: number = 0
    // private _tickPromise: CustomPromise<void> = new CustomPromise()
    hold() {
        this._pool.hold(1);
        // this._activeCount++
    }
    release() {
        this._timeController.setTimeout(this._releaseFunc, this._time);
    }
    _release() {
        void this._pool.release(1);
        // this._activeCount--
        // if (this._activeCount === this._maxCount - 1) {
        //   const tickPromise = this._tickPromise
        //   this._tickPromise = new CustomPromise()
        //   tickPromise.resolve()
        // }
    }
    available() {
        return this._pool.size > 0;
        // return this._activeCount < this._maxCount
    }
    tick(abortSignal) {
        return this._pool.tick(abortSignal);
        // return promiseToAbortable(abortSignal, this._tickPromise.promise)
    }
    run(func, priority, abortSignal, force) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            if (force) {
                if (!this._pool.hold(1)) {
                    if (force) {
                        throw new Error(`hold count (${1}) > holdAvailable (${this._pool.size})`);
                    }
                }
            }
            else {
                yield this._pool.holdWait(1, priority, abortSignal);
            }
            // if (!force && this._priorityQueue) {
            //   await this._priorityQueue.run(null, priority, abortSignal)
            // }
            //
            // while (!this.available()) {
            //   if (!force && this._priorityQueue) {
            //     await this._priorityQueue.run(this._tickFunc, priority, abortSignal)
            //   }
            //   else {
            //     await this.tick(abortSignal)
            //   }
            // }
            //
            // this.hold()
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
