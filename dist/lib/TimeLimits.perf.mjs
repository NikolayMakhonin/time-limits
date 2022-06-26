import { __awaiter } from 'tslib';
import { calcPerformanceAsync } from './test/calcPerformanceAsync.mjs';
import { TimeLimit } from './TimeLimit.mjs';
import { TimeControllerMock } from '@flemist/time-controller';
import { TimeLimits } from './TimeLimits.mjs';
import { PriorityQueue } from '@flemist/priority-queue';
import 'rdtsc';
import '@flemist/async-utils';
import './abort-controller-fast-utils/promiseToAbortable.mjs';

describe('time-limits > TimeLimits perf', function () {
    this.timeout(600000);
    it('base', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const emptyFunc = o => o;
            const priorityQueue = new PriorityQueue();
            const timeController = new TimeControllerMock();
            const timeLimit = new TimeLimit({
                timeMs: 1,
                maxCount: 1,
                priorityQueue,
                timeController,
            });
            const timeLimits = new TimeLimits({
                timeLimits: [timeLimit],
                priorityQueue,
            });
            const count = 100;
            const result = yield calcPerformanceAsync(60000, () => {
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
                }
                timeController.addTime(1);
                yield Promise.all(promises);
            }));
            console.log(result);
        });
    });
});
