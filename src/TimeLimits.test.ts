/* eslint-disable no-loop-func */

import {ITimeLimit, PromiseOrValue} from './contracts'
import {TimeLimit} from './TimeLimit'
import {TimeLimits} from './TimeLimits'
import {delay} from '@flemist/async-utils'
import {PriorityQueue, priorityCreate, Priority} from '@flemist/priority-queue'
import {ITimeController, TimeControllerMock} from '@flemist/time-controller'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {createTestVariants} from '@flemist/test-variants'

// region old test

describe('time-limits > TimeLimits Old', function () {
  this.timeout(300000)

  type Mode = 'sync' | 'async' | 'random'

  async function awaiter() {
    for (let i = 0; i < 40; i++) {
      await Promise.resolve()
    }
  }
  
  const testVariants = createTestVariants(async ({
    withPriorityQueue,
    timeLimitsTree,
    mode,
    asyncTime,
    maxCount,
    timeMs,
  }: {
    withPriorityQueue?: boolean,
    timeLimitsTree?: boolean,
    mode: Mode,
    asyncTime: number,
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
      if (mode === 'async' || mode === 'random') {
        timeController.addTime(asyncTime)
        await awaiter()
      }
      assert.strictEqual(completedCount, maxCount * 2)

      timeController.addTime(timeMs)
      await awaiter()
      if (mode === 'async' || mode === 'random') {
        timeController.addTime(asyncTime)
        await awaiter()
      }
      assert.strictEqual(completedCount, maxCount * 3)

      timeController.addTime(timeMs)
      await awaiter()
      if (mode === 'async' || mode === 'random') {
        timeController.addTime(asyncTime)
        await awaiter()
      }
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
      mode             : ['sync', 'async', 'random'],
      asyncTime        : ({mode}) => {
        return mode === 'async' ? [5]
          : mode === 'random' ? [2]
            : [0]
      },
      maxCount: [1, 2, 3, 10],
      timeMs  : ({mode}) => mode === 'random'
        ? [3, 5, 10]
        : [0, 1, 2, 5, 10],
    })()
  })
})

// endregion

describe('time-limits > TimeLimits', function () {
  type Limit = {
    timeMs: number
    maxCount: number
  }
  
  class TimeLimitWrapper implements ITimeLimit {
    instance: ITimeLimit
    timeController: ITimeController
    timeLog: number[]
    limits: Limit[]
    results: string[]
    constructor({
      instance,
      timeController,
      limits,
      results,
    }: {
      instance: ITimeLimit,
      timeController: ITimeController,
      limits: Limit[]
      results: string[]
    }) {
      this.instance = instance
      this.timeController = timeController
      this.limits = limits
      this.results = results
      this.timeLog = []
      assert.ok(this.limits.length > 0)
    }

    private _checkTimeLimits() {
      const now = this.timeController.now()
      let maxCountTotal = 0
      for (let i = 0; i < this.limits.length; i++) {
        const limit = this.limits[i]
        if (limit.maxCount > maxCountTotal) {
          maxCountTotal = limit.maxCount
        }
        if (this.timeLog.length >= limit.maxCount) {
          const prevTime = this.timeLog[this.timeLog.length - limit.maxCount]
          const elapsedTime = now - prevTime
          if (elapsedTime < limit.timeMs) {
            this.results.push(`ERROR: elapsedTime(${elapsedTime}) < limit.timeMs(${limit.timeMs})`)
          }
        }
      }

      // shift
      const deleteSize = this.timeLog.length - maxCountTotal
      if (deleteSize > 0) {
        for (let i = 0; i < maxCountTotal; i++) {
          this.timeLog[i] = this.timeLog[i + deleteSize]
        }
        this.timeLog.length = maxCountTotal
      }
    }

    private _onCompleted() {
      const now = this.timeController.now()
      this.timeLog.push(now)
    }

    available(): boolean {
      return this.instance.available()
    }

    async run<T>(
      func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>,
      priority?: Priority,
      abortSignal?: IAbortSignalFast,
      ignorePriority?: boolean,
    ): Promise<T> {
      const result = await this.instance.run(
        (abortSignal?: IAbortSignalFast) => {
          this._checkTimeLimits()
          return func(abortSignal)
          this._onCompleted()
        },
        priority,
        abortSignal,
        ignorePriority,
      )
      return result
    }

    tick(abortSignal?: IAbortSignalFast): Promise<void> {
      return this.instance.tick(abortSignal)
    }
  }

  // region createCheckedFunc

  type Func = (abortSignal?: IAbortSignalFast) => PromiseOrValue<string>
  type CheckedFuncContext = {
    timeController: ITimeController,
    timeLog: number[]
    limits: Limit[]
    results: string[]
  }

  function checkedFuncCheckTimeLimits({
    timeController,
    limits,
    results,
    timeLog,
  }: CheckedFuncContext) {
    const now = timeController.now()
    let maxCountTotal = 0
    for (let i = 0; i < limits.length; i++) {
      const limit = limits[i]
      if (limit.maxCount > maxCountTotal) {
        maxCountTotal = limit.maxCount
      }
      if (timeLog.length >= limit.maxCount) {
        const prevTime = timeLog[timeLog.length - limit.maxCount]
        const elapsedTime = now - prevTime
        if (elapsedTime < limit.timeMs) {
          results.push(`ERROR: elapsedTime(${elapsedTime}) < limit.timeMs(${limit.timeMs})`)
        }
      }
    }

    // shift
    const deleteSize = timeLog.length - maxCountTotal
    if (deleteSize > 0) {
      for (let i = 0; i < maxCountTotal; i++) {
        timeLog[i] = timeLog[i + deleteSize]
      }
      timeLog.length = maxCountTotal
    }
  }

  function checkedFuncOnCompleted(context: CheckedFuncContext) {
    const now = context.timeController.now()
    context.timeLog.push(now)
  }

  function createCheckedFunc({
    func,
    timeController,
    limits,
    results,
  }: {
    func: Func,
    timeController: ITimeController
    limits: Limit[]
    results: string[]
  }) {
    const context: CheckedFuncContext = {
      timeController,
      limits,
      results,
      timeLog: [],
    }
    return async function _checkTimeLimitsFunc(abortSignal?: IAbortSignalFast) {
      checkedFuncCheckTimeLimits(context)
      const result = await func(abortSignal)
      checkedFuncOnCompleted(context)
    }
  }

  // endregion

  const testVariants = createTestVariants(({
    a,
  }: {
    a: number,
  }) => {

  })

  it('variants', function () {

  })
})
