'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var pool_Pool = require('./Pool.cjs');
require('@flemist/async-utils');
require('@flemist/priority-queue');

/** @deprecated use poolRunWait */
class PoolRunner {
    constructor(pool) {
        this._pool = pool;
    }
    get pool() {
        return this._pool;
    }
    run(count, func, priority, abortSignal, awaitPriority) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            yield pool_Pool.poolWaitHold({ pool: this._pool, count, priority, abortSignal, awaitPriority });
            try {
                const result = yield func(abortSignal);
                return result;
            }
            finally {
                void this._pool.release(count);
            }
        });
    }
}

exports.PoolRunner = PoolRunner;
