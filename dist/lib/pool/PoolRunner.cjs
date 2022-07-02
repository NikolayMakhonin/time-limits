'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');

class PoolRunner {
    constructor({ pool, }) {
        this._pool = pool;
    }
    get pool() {
        return this._pool;
    }
    run(func, priority, abortSignal) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            yield this._pool.holdWait(1, priority, abortSignal);
            try {
                const result = yield func(abortSignal);
                return result;
            }
            finally {
                void this._pool.release(1);
            }
        });
    }
}

exports.PoolRunner = PoolRunner;
