'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class PoolHoldError extends Error {
    constructor(count) {
        super(`Pool hold(${count}) failed`);
        this.count = count;
    }
}

exports.PoolHoldError = PoolHoldError;
