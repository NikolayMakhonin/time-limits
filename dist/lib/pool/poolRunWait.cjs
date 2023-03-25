'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var pool_Pool = require('./Pool.cjs');
require('@flemist/priority-queue');
require('@flemist/async-utils');
require('@flemist/time-controller');

function poolRunWait({ pool, count, func, priority, abortSignal, awaitPriority, }) {
    return tslib.__awaiter(this, void 0, void 0, function* () {
        yield pool.holdWait(count, priority, abortSignal, awaitPriority);
        try {
            const holdPool = new pool_Pool.Pool(count);
            const result = yield func(holdPool, abortSignal);
            return result;
        }
        finally {
            void this._pool.release(count);
        }
    });
}

exports.poolRunWait = poolRunWait;
