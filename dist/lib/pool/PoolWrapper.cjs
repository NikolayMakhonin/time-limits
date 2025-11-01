'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class PoolWrapper {
    constructor(pool) {
        this._pool = pool;
    }
    get heldCountMax() {
        return this._pool.heldCountMax;
    }
    get heldCount() {
        return this._pool.heldCount;
    }
    get holdAvailable() {
        return this._pool.holdAvailable;
    }
    get releaseAvailable() {
        return this._pool.releaseAvailable;
    }
    canHold(count) {
        return this._pool.canHold(count);
    }
    hold(count) {
        return this._pool.hold(count);
    }
    release(count, dontThrow) {
        return this._pool.release(count, dontThrow);
    }
    tick(abortSignal) {
        return this._pool.tick(abortSignal);
    }
}

exports.PoolWrapper = PoolWrapper;
