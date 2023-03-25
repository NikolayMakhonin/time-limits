import { toFuncWithFinally } from '@flemist/async-utils';
import { PoolHoldError } from './PoolHoldError.mjs';

function toFuncWithPoolThrow(pool, count, func) {
    return toFuncWithFinally(function funcWithPoolThrow() {
        const hold = pool.hold(count);
        if (!hold) {
            throw new PoolHoldError(count);
        }
        return func.apply(this, arguments);
    }, () => {
        void pool.release(count);
    });
}
function runPoolThrow(pool, count, func) {
    return toFuncWithPoolThrow(pool, count, func)();
}

export { runPoolThrow, toFuncWithPoolThrow };
