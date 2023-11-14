class PoolWrapper {
    constructor(pool) {
        this._pool = pool;
    }
    get size() {
        return this._pool.size;
    }
    get maxSize() {
        return this._pool.maxSize;
    }
    get holdAvailable() {
        return this._pool.holdAvailable;
    }
    get releaseAvailable() {
        return this._pool.releaseAvailable;
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
    holdWait(count, priority, abortSignal, awaitPriority) {
        return this._pool.holdWait(count, priority, abortSignal, awaitPriority);
    }
}

export { PoolWrapper };
