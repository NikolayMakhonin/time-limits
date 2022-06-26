'use strict';

var tslib = require('tslib');
var test_calcPerformanceAsync = require('./test/calcPerformanceAsync.cjs');
var TimeLimit = require('./TimeLimit.cjs');
var timeController = require('@flemist/time-controller');
var TimeLimits = require('./TimeLimits.cjs');
var priorityQueue = require('@flemist/priority-queue');
require('rdtsc');
require('@flemist/async-utils');
require('./abort-controller-fast-utils/promiseToAbortable.cjs');

describe('time-limits > TimeLimits perf', function () {
    this.timeout(600000);
    it('base', function () {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            const emptyFunc = o => o;
            const priorityQueue$1 = new priorityQueue.PriorityQueue();
            const timeController$1 = new timeController.TimeControllerMock();
            const timeLimit = new TimeLimit.TimeLimit({
                timeMs: 1,
                maxCount: 1,
                priorityQueue: priorityQueue$1,
                timeController: timeController$1,
            });
            const timeLimits = new TimeLimits.TimeLimits({
                timeLimits: [timeLimit],
                priorityQueue: priorityQueue$1,
            });
            const count = 100;
            const result = yield test_calcPerformanceAsync.calcPerformanceAsync(60000, () => {
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
            () => tslib.__awaiter(this, void 0, void 0, function* () {
                const promises = [];
                for (let i = 0; i < count; i++) {
                    promises.push(timeLimits.run(emptyFunc));
                }
                for (let i = 0; i < count; i++) {
                    timeController$1.addTime(1);
                    yield 0;
                    yield 0;
                    yield 0;
                    yield 0;
                    yield 0;
                }
                timeController$1.addTime(1);
                yield Promise.all(promises);
            }));
            console.log(result);
        });
    });
});
