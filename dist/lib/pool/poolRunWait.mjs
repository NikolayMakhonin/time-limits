import { __awaiter } from 'tslib';
import { Pool } from './Pool.mjs';
import '@flemist/priority-queue';
import '@flemist/async-utils';
import '@flemist/time-controller';

function poolRunWait({ pool, count, func, priority, abortSignal, awaitPriority, }) {
    return __awaiter(this, void 0, void 0, function* () {
        yield pool.holdWait(count, priority, abortSignal, awaitPriority);
        try {
            const holdPool = new Pool(count);
            const result = yield func(holdPool, abortSignal);
            return result;
        }
        finally {
            void this._pool.release(count);
        }
    });
}

export { poolRunWait };
