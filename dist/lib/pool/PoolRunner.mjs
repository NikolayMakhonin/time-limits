import { __awaiter } from 'tslib';
import { poolWaitHold } from './Pool.mjs';
import '@flemist/async-utils';
import '@flemist/priority-queue';

/** @deprecated use poolRunWait */
class PoolRunner {
    constructor(pool) {
        this._pool = pool;
    }
    get pool() {
        return this._pool;
    }
    run(count, func, priority, abortSignal, awaitPriority) {
        return __awaiter(this, void 0, void 0, function* () {
            yield poolWaitHold({ pool: this._pool, count, priority, abortSignal, awaitPriority });
            try {
                const result = yield func(abortSignal);
                return result;
            }
            finally {
                void this._pool.release(count);
            }
        });
    }
}

export { PoolRunner };
