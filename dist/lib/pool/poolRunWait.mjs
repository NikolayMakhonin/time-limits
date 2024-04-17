import { Pool } from './Pool.mjs';
import 'tslib';
import '@flemist/priority-queue';
import { runWithFinally } from '@flemist/async-utils';
import '@flemist/time-controller';

function poolRunWait({ pool, count, func, priority, abortSignal, awaitPriority, }) {
    return runWithFinally(() => {
        return pool.holdWait(count, priority, abortSignal, awaitPriority);
    }, () => {
        const holdPool = new Pool(count);
        return func(holdPool, abortSignal);
    }, () => {
        return pool.release(count);
    });
}

export { poolRunWait };
