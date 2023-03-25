'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var asyncUtils = require('@flemist/async-utils');
var pool_PoolHoldError = require('./PoolHoldError.cjs');

function poolRunThrow(pool, count, func) {
    const hold = pool.hold(count);
    if (!hold) {
        throw new pool_PoolHoldError.PoolHoldError(count);
    }
    try {
        const resultOrPromise = func();
        if (!asyncUtils.isPromiseLike(resultOrPromise)) {
            return resultOrPromise;
        }
        return (() => tslib.__awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield resultOrPromise;
                return result;
            }
            finally {
                void pool.release(count);
            }
        }))();
    }
    finally {
        void this._pool.release(count);
    }
}

exports.poolRunThrow = poolRunThrow;
