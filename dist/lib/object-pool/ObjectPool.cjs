'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var objectPool_StackPool = require('./StackPool.cjs');
var pool_Pool = require('../pool/Pool.cjs');
var pool_Pools = require('../pool/Pools.cjs');
var asyncUtils = require('@flemist/async-utils');

class ObjectPool {
    constructor({ pool, availableObjects, holdObjects, destroy, create, }) {
        this._allocatePool = new pool_Pool.Pool(pool.maxSize);
        this._pool = new pool_Pools.Pools(pool, this._allocatePool);
        this._availableObjects = availableObjects || new objectPool_StackPool.StackPool();
        this._holdObjects = holdObjects === true ? new Set() : holdObjects || null;
        this._create = create;
        this._destroy = destroy;
    }
    get pool() {
        return this._pool;
    }
    get availableObjects() {
        return this._availableObjects.objects;
    }
    get holdObjects() {
        return this._holdObjects;
    }
    get(count) {
        const objects = this._availableObjects.get(count);
        if (this._holdObjects && objects) {
            for (let i = 0, len = objects.length; i < len; i++) {
                this._holdObjects.add(objects[i]);
            }
        }
        return objects;
    }
    release(objects, start, end) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            if (start == null) {
                start = 0;
            }
            if (end == null) {
                end = objects.length;
            }
            const tryReleaseCount = end - start;
            const releasedCount = yield this._pool.release(tryReleaseCount);
            end = Math.min(objects.length, releasedCount);
            this._availableObjects.release(objects, start, end);
            if (this._holdObjects) {
                for (let i = start; i < end; i++) {
                    const obj = objects[i];
                    if (obj != null) {
                        if (this._holdObjects) {
                            this._holdObjects.delete(obj);
                        }
                    }
                }
            }
            return releasedCount;
        });
    }
    tick(abortSignal) {
        return this._pool.tick();
    }
    getWait(count, abortSignal, priorityQueue, priority) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            yield this._pool.holdWait(count, abortSignal, priorityQueue, priority);
            return this.get(count);
        });
    }
    use(count, func, abortSignal) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            let objects = yield this.getWait(count, abortSignal);
            if (!this._create) {
                throw new Error('You should specify create function in the constructor');
            }
            let start;
            if (!objects) {
                objects = new Array(count);
                start = 0;
            }
            else {
                start = objects.length;
            }
            for (let i = start; i < count; i++) {
                const obj = yield this._create();
                if (obj == null) {
                    throw new Error('create function should return not null object');
                }
                if (this._holdObjects) {
                    this._holdObjects.add(obj);
                }
                objects[i] = obj;
            }
            try {
                const result = yield func(objects, abortSignal);
                return result;
            }
            finally {
                const releasedCount = yield this.release(objects);
                if (this._destroy) {
                    for (let i = releasedCount, len = objects.length; i < len; i++) {
                        const obj = objects[i];
                        yield this._destroy(obj);
                    }
                }
            }
        });
    }
    allocate(size) {
        if (!this._create) {
            throw new Error('You should specify create function in the constructor');
        }
        const promises = [];
        let tryHoldCount = this._allocatePool.size - this._availableObjects.size;
        if (size != null && size < tryHoldCount) {
            tryHoldCount = size;
        }
        if (tryHoldCount < 0) {
            throw new Error('Unexpected behavior: tryHoldCount < 0');
        }
        const holdCount = this._allocatePool.hold(tryHoldCount) ? tryHoldCount : 0;
        let allocatedCount = 0;
        const _this = this;
        function releasePromiseObject(objectPromise) {
            return tslib.__awaiter(this, void 0, void 0, function* () {
                let obj;
                try {
                    obj = yield objectPromise;
                }
                catch (err) {
                    yield _this._allocatePool.release(1);
                    throw err;
                }
                const count = yield _this.release([obj]);
                allocatedCount += count;
            });
        }
        function releasePromise(promise) {
            return tslib.__awaiter(this, void 0, void 0, function* () {
                const count = yield promise;
                allocatedCount += count;
            });
        }
        for (let i = 0; i < holdCount; i++) {
            const objectOrPromise = this._create();
            if (asyncUtils.isPromiseLike(objectOrPromise)) {
                promises.push(releasePromiseObject(objectOrPromise));
            }
            else {
                const promise = this.release([objectOrPromise]);
                if (asyncUtils.isPromiseLike(promise)) {
                    promises.push(releasePromise(promise));
                }
            }
        }
        if (promises.length) {
            return Promise.all(promises).then(o => allocatedCount);
        }
        return allocatedCount;
    }
}

exports.ObjectPool = ObjectPool;
