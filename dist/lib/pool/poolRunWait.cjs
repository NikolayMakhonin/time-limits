'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var pool_Pool = require('./Pool.cjs');
require('tslib');
require('@flemist/priority-queue');
var asyncUtils = require('@flemist/async-utils');
require('@flemist/time-controller');

function poolRunWait({ pool, count, func, priority, abortSignal, awaitPriority, }) {
    return asyncUtils.runWithFinally(() => {
        return pool.holdWait(count, priority, abortSignal, awaitPriority);
    }, () => {
        const holdPool = new pool_Pool.Pool(count);
        return func(holdPool, abortSignal);
    }, () => {
        return pool.release(count);
    });
}

exports.poolRunWait = poolRunWait;
