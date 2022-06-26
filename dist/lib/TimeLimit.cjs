'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var asyncUtils = require('@flemist/async-utils');
var priorityQueue = require('@flemist/priority-queue');
var abortControllerFastUtils_promiseToAbortable = require('./abort-controller-fast-utils/promiseToAbortable.cjs');
var timeController = require('@flemist/time-controller');

class TimeLimit {
    constructor({ maxCount, timeMs, priorityQueue: priorityQueue$1, timeController: timeController$1, }) {
        this._activeCount = 0;
        this._tickPromise = new asyncUtils.CustomPromise();
        this._timeController = timeController$1 || timeController.timeControllerDefault;
        this._maxCount = maxCount;
        this._timeMs = timeMs;
        this._priorityQueue = priorityQueue$1 || new priorityQueue.PriorityQueue();
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
            this._tickPromise = new asyncUtils.CustomPromise();
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
        return abortControllerFastUtils_promiseToAbortable.promiseToAbortable(abortSignal, this._tickPromise.promise);
    }
    run(func, priority, abortSignal, force) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
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

exports.TimeLimit = TimeLimit;
