import { __awaiter } from 'tslib';
import { isPromiseLike } from '@flemist/async-utils';
import { PoolHoldError } from './PoolHoldError.mjs';

function poolRunThrow(pool, count, func) {
    const hold = pool.hold(count);
    if (!hold) {
        throw new PoolHoldError(count);
    }
    try {
        const resultOrPromise = func();
        if (!isPromiseLike(resultOrPromise)) {
            return resultOrPromise;
        }
        return (() => __awaiter(this, void 0, void 0, function* () {
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

export { poolRunThrow };
