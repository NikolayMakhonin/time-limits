'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var pool_Pool = require('./Pool.cjs');
require('@flemist/priority-queue');
var asyncUtils = require('@flemist/async-utils');
require('@flemist/time-controller');

function poolRunWait({ pool, count, func, priority, abortSignal, awaitPriority, }) {
    return tslib.__awaiter(this, void 0, void 0, function* () {
        return asyncUtils.toFuncWithFinally(function funcWithPoolThrow() {
            return tslib.__awaiter(this, void 0, void 0, function* () {
                yield pool.holdWait(count, priority, abortSignal, awaitPriority);
                const holdPool = new pool_Pool.Pool(count);
                return func(holdPool, abortSignal);
            });
        }, () => {
            void pool.release(count);
        })();
    });
}

exports.poolRunWait = poolRunWait;
