'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class ObjectPoolWrapper {
    constructor(objectPool) {
        this._objectPool = objectPool;
    }
    get availableObjects() {
        return this._objectPool.availableObjects;
    }
    get pool() {
        return this._objectPool.pool;
    }
    allocate(size) {
        return this._objectPool.allocate(size);
    }
    get(count) {
        return this._objectPool.get(count);
    }
    getWait(count, priority, abortSignal, awaitPriority) {
        return this._objectPool.getWait(count, priority, abortSignal, awaitPriority);
    }
    release(objects, start, count) {
        return this._objectPool.release(objects, start, count);
    }
    tick(abortSignal) {
        return this._objectPool.tick(abortSignal);
    }
    use(count, func, priority, abortSignal, awaitPriority) {
        return this._objectPool.use(count, func, priority, abortSignal, awaitPriority);
    }
}

exports.ObjectPoolWrapper = ObjectPoolWrapper;
