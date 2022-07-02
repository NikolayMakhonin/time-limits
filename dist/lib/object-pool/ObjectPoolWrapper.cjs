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
    getWait(count, abortSignal) {
        return this._objectPool.getWait(count, abortSignal);
    }
    release(objects, start, count) {
        return this._objectPool.release(objects, start, count);
    }
    tick(abortSignal) {
        return this._objectPool.tick(abortSignal);
    }
    use(count, func, abortSignal, priorityQueue, priority) {
        return this._objectPool.use(count, func, abortSignal, priorityQueue, priority);
    }
}

exports.ObjectPoolWrapper = ObjectPoolWrapper;
