import { __awaiter } from 'tslib';
import { Pool } from './Pool.mjs';
import '@flemist/priority-queue';
import { toFuncWithFinally } from '@flemist/async-utils';
import '@flemist/time-controller';

function poolRunWait({ pool, count, func, priority, abortSignal, awaitPriority, }) {
    return __awaiter(this, void 0, void 0, function* () {
        return toFuncWithFinally(function funcWithPoolThrow() {
            return __awaiter(this, void 0, void 0, function* () {
                yield pool.holdWait(count, priority, abortSignal, awaitPriority);
                const holdPool = new Pool(count);
                return func(holdPool, abortSignal);
            });
        }, () => {
            void pool.release(count);
        })();
    });
}

export { poolRunWait };
