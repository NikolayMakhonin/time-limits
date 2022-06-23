/* eslint-disable no-loop-func */

import {TimeLimit} from './TimeLimit'
import {TimeLimits} from './TimeLimits'
import {delay} from '@flemist/async-utils'
import {PriorityQueue, priorityCreate} from '@flemist/priority-queue'
import {TimeControllerMock} from '@flemist/time-controller'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {createTestVariants} from '@flemist/test-variants'

describe('time-limits > TimeLimits', function () {
  this.timeout(300000)
  type Mode = 'sync' | 'async' | 'random'

  async function awaiter() {
    for (let i = 0; i < 20; i++) {
      await Promise.resolve()
    }
  }
  
  const testVariants = createTestVariants(async ({
    withPriorityQueue,
    timeLimitsTree,
    asyncTime,
    mode,
    maxCount,
    timeMs,
  }: {
    withPriorityQueue?: boolean,
    timeLimitsTree?: boolean,
    asyncTime: number,
    mode: Mode,
    maxCount: number,
    timeMs: number,
  }) => {
    try {
      const timeController = new TimeControllerMock()
      const priorityQueue = withPriorityQueue ? new PriorityQueue() : null
      const timeLimit = timeLimitsTree
        ? new TimeLimits({
          priorityQueue,
          timeLimits: [
            new TimeLimit({maxCount, timeMs, priorityQueue, timeController}),
            new TimeLimits({
              priorityQueue,
              timeLimits: [
                new TimeLimits({
                  priorityQueue,
                  timeLimits: [
                    new TimeLimit({maxCount, timeMs, priorityQueue, timeController}),
                    new TimeLimit({maxCount, timeMs, priorityQueue, timeController}),
                  ],
                }),
                new TimeLimit({maxCount, timeMs, priorityQueue, timeController}),
              ],
            }),
          ],
        })
        : new TimeLimit({maxCount, timeMs, priorityQueue, timeController})

      let completedCount = 0

      const run = function run(result: number, delayMs: number, abortSignal?: IAbortSignalFast) {
        if (delayMs) {
          return delay(delayMs, abortSignal, timeController).then(() => {
            completedCount++
            return result
          })
        }
        completedCount++
        return result
      }

      assert.strictEqual(completedCount, 0)
      const promises = []
      const results = []
      for (let i = 0, len = maxCount * 3; i < len; i++) {
        const index = i
        const order = len - 1 - i
        const async = mode === 'async' || mode === 'random' && Math.random() > 0.5
        const result = timeLimit.run((abortSignal) => {
          return run(index, async ? asyncTime : 0, abortSignal)
        }, priorityCreate(order))
        assert.ok(typeof result.then === 'function')
        promises.push(result.then(o => {
          assert.strictEqual(o, index)
          results.push(order)
        }))
      }

      await awaiter()

      if (mode === 'async' || mode === 'random') {
        timeController.addTime(asyncTime)
      }
      await awaiter()
      await awaiter()
      assert.strictEqual(completedCount, maxCount)

      timeController.addTime(timeMs)
      await awaiter()
      timeController.addTime(asyncTime)
      await awaiter()
      assert.strictEqual(completedCount, maxCount * 2)

      timeController.addTime(timeMs)
      await awaiter()
      timeController.addTime(asyncTime)
      await awaiter()
      assert.strictEqual(completedCount, maxCount * 3)

      timeController.addTime(timeMs)
      await awaiter()
      timeController.addTime(asyncTime)
      await awaiter()
      assert.strictEqual(completedCount, maxCount * 3)

      await Promise.all(promises)

      if (priorityQueue && (mode !== 'random' || maxCount > 5)) {
        assert.ok(results.every((o, i) => o === i) === (mode !== 'random'), results.join(', '))
      }
    }
    catch (err) {
      // console.log(JSON.stringify({
      //   maxCount,
      //   timeMs,
      //   asyncTime,
      //   mode,
      //   withPriorityQueue,
      //   timeLimitsTree,
      // }, null, 2))
      throw err
    }
  })

  xit('custom', async function () {
    await testVariants({
      withPriorityQueue: [true],
      mode             : ['async'],
      maxCount         : [1],
      timeLimitsTree   : [false],
      asyncTime        : [500],
      timeMs           : [1000],
    })()
  })

  it('variants', async function () {
    await testVariants({
      withPriorityQueue: [false, true],
      timeLimitsTree   : [false, true],
      asyncTime        : ({mode}) => {
        return mode === 'async' ? [500]
          : mode === 'random' ? [200]
            : [0]
      },
      mode    : ['sync', 'async', 'random'],
      maxCount: [1, 10],
      timeMs  : [1000],
    })()
  })
})
