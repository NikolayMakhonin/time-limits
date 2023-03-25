'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var asyncUtils = require('@flemist/async-utils');
var pool_PoolHoldError = require('./PoolHoldError.cjs');

function toFuncWithPoolThrow(pool, count, func) {
    return asyncUtils.toFuncWithFinally(function funcWithPoolThrow() {
        const hold = pool.hold(count);
        if (!hold) {
            throw new pool_PoolHoldError.PoolHoldError(count);
        }
        return func.apply(this, arguments);
    }, () => {
        void pool.release(count);
    });
}
function runPoolThrow(pool, count, func) {
    return toFuncWithPoolThrow(pool, count, func)();
}

exports.runPoolThrow = runPoolThrow;
exports.toFuncWithPoolThrow = toFuncWithPoolThrow;
