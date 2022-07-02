'use strict';

var tslib = require('tslib');
var rdtsc = require('rdtsc');
var timeController = require('@flemist/time-controller');
var priorityQueue = require('@flemist/priority-queue');
var timeLimit_TimeLimitPool = require('./TimeLimitPool.cjs');
var pool_Pool = require('../pool/Pool.cjs');
var pool_Pools = require('../pool/Pools.cjs');
var pool_PoolRunner = require('../pool/PoolRunner.cjs');
require('@flemist/async-utils');
require('../pool/PoolWrapper.cjs');

describe('time-limits > TimeLimits perf', function () {
    this.timeout(600000);
    it('base', function () {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            const emptyFunc = o => o;
            const priorityQueue$1 = new priorityQueue.PriorityQueue();
            const timeController$1 = new timeController.TimeControllerMock();
            const timeLimit = new pool_PoolRunner.PoolRunner(new timeLimit_TimeLimitPool.TimeLimitPool({
                pool: new pool_Pool.Pool(1),
                time: 1,
                timeController: timeController$1,
            }));
            const timeLimits = new pool_PoolRunner.PoolRunner(new pool_Pools.Pools(timeLimit.pool));
            const count = 100;
            const result = yield rdtsc.calcPerformanceAsync(10000, () => {
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
                    promises.push(timeLimits.run(1, emptyFunc, null, priorityQueue$1));
                }
                for (let i = 0; i < count; i++) {
                    timeController$1.addTime(1);
                    yield 0;
                    yield 0;
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
