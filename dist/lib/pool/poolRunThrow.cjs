'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var asyncUtils = require('@flemist/async-utils');
var pool_PoolHoldError = require('./PoolHoldError.cjs');

function poolRunThrow(pool, count, func) {
    return asyncUtils.promiseLikeToPromise(asyncUtils.runWithFinally(() => {
        const hold = pool.hold(count);
        if (!hold) {
            throw new pool_PoolHoldError.PoolHoldError(count);
        }
    }, func, () => {
        void pool.release(count);
    }));
}

exports.poolRunThrow = poolRunThrow;
