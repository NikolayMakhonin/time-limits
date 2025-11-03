import { promiseLikeToPromise, runWithFinally } from '@flemist/async-utils';
import { PoolHoldError } from './PoolHoldError.mjs';

function poolRunThrow(pool, count, func) {
    return promiseLikeToPromise(runWithFinally(() => {
        const hold = pool.hold(count);
        if (!hold) {
            throw new PoolHoldError(count);
        }
    }, func, () => {
        void pool.release(count);
    }));
}

export { poolRunThrow };
