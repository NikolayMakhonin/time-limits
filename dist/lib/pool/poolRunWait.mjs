import { poolWaitHold, Pool } from './Pool.mjs';
import { promiseLikeToPromise, runWithFinally } from '@flemist/async-utils';
import 'tslib';
import '@flemist/priority-queue';

function poolRunWait({ pool, count, func, priority, abortSignal, awaitPriority, }) {
    return promiseLikeToPromise(runWithFinally(() => {
        return poolWaitHold({ pool, count, priority, abortSignal, awaitPriority });
    }, () => {
        const holdPool = new Pool(count);
        return func(holdPool, abortSignal);
    }, () => {
        return pool.release(count);
    }));
}

export { poolRunWait };
