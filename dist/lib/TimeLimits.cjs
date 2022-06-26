'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var priorityQueue = require('@flemist/priority-queue');

class TimeLimits {
    constructor({ timeLimits, priorityQueue: priorityQueue$1, }) {
        this._timeLimits = timeLimits;
        this._priorityQueue = priorityQueue$1 || new priorityQueue.PriorityQueue();
        this._tickFunc = (abortSignal) => this.tick(abortSignal);
        this._tasks = new Set();
        void this._availableUpdater();
    }
    hold() {
        for (let i = 0; i < this._timeLimits.length; i++) {
            this._timeLimits[i].hold();
        }
        if (!this.available()) {
            this._tasks.forEach(task => {
                task.setReadyToRun(false);
            });
        }
    }
    release() {
        for (let i = 0; i < this._timeLimits.length; i++) {
            this._timeLimits[i].release();
        }
        if (this.available()) {
            this._tasks.forEach(task => {
                task.setReadyToRun(true);
            });
        }
    }
    available() {
        return this._timeLimits.every(o => o.available());
    }
    tick(abortSignal) {
        return Promise.race(this._timeLimits.map(o => o.tick(abortSignal)));
    }
    _availableUpdater() {
        return tslib.__awaiter(this, void 0, void 0, function* () {
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

exports.TimeLimits = TimeLimits;
