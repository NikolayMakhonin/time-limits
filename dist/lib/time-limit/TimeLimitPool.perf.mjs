import { __awaiter } from 'tslib';
import { calcPerformanceAsync } from 'rdtsc';
import { TimeControllerMock } from '@flemist/time-controller';
import { PriorityQueue } from '@flemist/priority-queue';
import { TimeLimitPool } from './TimeLimitPool.mjs';
import { Pool } from '../pool/Pool.mjs';
import { Pools } from '../pool/Pools.mjs';
import { PoolRunner } from '../pool/PoolRunner.mjs';
import '@flemist/async-utils';
import '../pool/PoolWrapper.mjs';

describe('time-limits > TimeLimits perf', function () {
    this.timeout(600000);
    it('base', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const emptyFunc = o => o;
            const priorityQueue = new PriorityQueue();
            const timeController = new TimeControllerMock();
            const timeLimit = new PoolRunner({ pool: new TimeLimitPool({
                    pool: new Pool({ maxSize: 1, priorityQueue }),
                    time: 1,
                    timeController,
                }) });
            const timeLimits = new PoolRunner({ pool: new Pools({
                    pools: [timeLimit.pool],
                    priorityQueue,
                }) });
            const count = 100;
            const result = yield calcPerformanceAsync(10000, () => {
            }, 
            // async () => {
            //   const promises = []
            //   for (let i = 0; i < count; i++) {
            //     promises.push(timeLimit.run(emptyFunc))
            //   }
            //   for (let i = 0; i < count; i++) {
            //     timeController.addTime(1)
            //     await 0
            //     await 0
            //     await 0
            //   }
            //   timeController.addTime(1)
            //   await Promise.all(promises)
            // },
            () => __awaiter(this, void 0, void 0, function* () {
                const promises = [];
                for (let i = 0; i < count; i++) {
                    promises.push(timeLimits.run(emptyFunc));
                }
                for (let i = 0; i < count; i++) {
                    timeController.addTime(1);
                    yield 0;
                    yield 0;
                    yield 0;
                    yield 0;
                    yield 0;
                    yield 0;
                    yield 0;
                }
                timeController.addTime(1);
                yield Promise.all(promises);
            }));
            console.log(result);
        });
    });
});
