'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var pool_Pool = require('./Pool.cjs');
var asyncUtils = require('@flemist/async-utils');
require('tslib');
require('@flemist/priority-queue');

function poolRunWait({ pool, count, func, priority, abortSignal, awaitPriority, }) {
    return asyncUtils.promiseLikeToPromise(asyncUtils.runWithFinally(() => {
        return pool_Pool.poolWaitHold({ pool, count, priority, abortSignal, awaitPriority });
    }, () => {
        const holdPool = new pool_Pool.Pool(count);
        return func(holdPool, abortSignal);
    }, () => {
        return pool.release(count);
    }));
}

exports.poolRunWait = poolRunWait;
