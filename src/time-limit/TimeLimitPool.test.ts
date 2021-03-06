/* eslint-disable no-loop-func,no-unmodified-loop-condition */

import {delay} from '@flemist/async-utils'
import {priorityCreate, createAwaitPriority} from '@flemist/priority-queue'
import {ITimeController, TimeControllerMock} from '@flemist/time-controller'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {createTestVariants} from '@flemist/test-variants'
import {IPoolRunner, Pool, PoolRunner, Pools} from 'src/pool'
import {TimeLimitPool} from 'src/time-limit/TimeLimitPool'
import {awaitTime} from '@flemist/test-utils'

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
      const awaitPriority = withPriorityQueue ? createAwaitPriority() : null
      const timeLimit = timeLimitsTree
        ? new PoolRunner(new Pools(
          new TimeLimitPool({
            pool: new Pool(maxCount),
            time: timeMs,
            timeController,
          }),
          new Pools(
            new Pools(
              new TimeLimitPool({
                pool: new Pool(maxCount),
                time: timeMs,
                timeController,
              }),
              new TimeLimitPool({
                pool: new Pool(maxCount),
                time: timeMs,
                timeController,
              }),
            ),
            new TimeLimitPool({
              pool: new Pool(maxCount),
              time: timeMs,
              timeController,
            }),
          ),
        ))
        : new PoolRunner(new TimeLimitPool({
          pool: new Pool(maxCount),
          time: timeMs,
          timeController,
        }))

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
        const result = timeLimit.run(1, (abortSignal) => {
          return run(index, async ? asyncTime : 0, abortSignal)
        }, priorityCreate(order), null, awaitPriority)
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

      if (awaitPriority && (mode !== 'random' || maxCount > 5)) {
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

  type Result = string|number

  // region createCheckedFunc

  type Func = (abortSignal?: IAbortSignalFast) => Promise<number> | number
  type CheckedFuncContext = {
    timeController: ITimeController,
    timeLog: number[]
    limits: Limit[]
    results: Result[]
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
    results: Result[]
  }) {
    const context: CheckedFuncContext = {
      timeController,
      limits,
      results,
      timeLog: [],
    }
    return async function _checkTimeLimitsFunc(abortSignal?: IAbortSignalFast) {
      checkedFuncCheckTimeLimits(context)
      try {
        const result = await func(abortSignal)
        return result
      }
      finally {
        checkedFuncOnCompleted(context)
      }
    }
  }

  // endregion

  const testVariants = createTestVariants(({
    withPriorityQueue,

    timeLimit1,
    timeLimit2,
    timeLimit3,

    maxCount1,
    maxCount2,
    maxCount3,
  }: {
    withPriorityQueue: boolean,

    timeLimit1: number
    timeLimit2: number
    timeLimit3: number

    maxCount1: number
    maxCount2: number
    maxCount3: number
  }) => {
    const awaitPriority = withPriorityQueue && createAwaitPriority()
    const timeController = new TimeControllerMock()
    const abortSignal: IAbortSignalFast = null

    const timeLimits: {
      instance: IPoolRunner,
      limits: Limit[],
    }[] = []

    function addTimeLimit({
      timeMs,
      maxCount,
    }: {
      timeMs: number
      maxCount: number
    }) {
      const instance = new PoolRunner(new TimeLimitPool({
        pool: new Pool(maxCount),
        time: timeMs,
        timeController,
      }))
      timeLimits.push({
        instance,
        limits: [{
          maxCount,
          timeMs,
        }],
      })
    }

    if (maxCount1) {
      addTimeLimit({
        maxCount: maxCount1,
        timeMs  : timeLimit1,
      })
    }
    if (maxCount2) {
      addTimeLimit({
        maxCount: maxCount2,
        timeMs  : timeLimit2,
      })
    }
    if (maxCount3) {
      addTimeLimit({
        maxCount: maxCount3,
        timeMs  : timeLimit3,
      })
    }

    if (timeLimits.length === 0) {
      return
    }

    if (timeLimits.length === 1) {
      timeLimits.push({
        instance: new PoolRunner(new Pools(timeLimits[0].instance.pool)),
        limits  : timeLimits[0].limits,
      })
    }
    else if (timeLimits.length === 2) {
      timeLimits.push({
        instance: new PoolRunner(new Pools(timeLimits[0].instance.pool, timeLimits[1].instance.pool)),
        limits  : [timeLimits[0].limits[0], timeLimits[1].limits[0]],
      })
    }
    else if (timeLimits.length === 3) {
      timeLimits.push({
        instance: new PoolRunner(new Pools(timeLimits[0].instance.pool)),
        limits  : timeLimits[0].limits,
      })
      timeLimits.push({
        instance: new PoolRunner(new Pools(timeLimits[1].instance.pool, timeLimits[2].instance.pool)),
        limits  : [timeLimits[1].limits[0], timeLimits[2].limits[0]],
      })
      timeLimits.push({
        instance: new PoolRunner(new Pools(timeLimits[3].instance.pool, timeLimits[4].instance.pool)),
        limits  : [timeLimits[0].limits[0], timeLimits[1].limits[0], timeLimits[2].limits[0]],
      })
    }

    const countPerTimeLimit = 10
    const results: Result[] = []
    const promises: Promise<Result>[] = []
    const values: number[] = []
    const checkPromiseResults: number[] = []
    // const count = timeLimits.length * countPerTimeLimit
    const count = countPerTimeLimit

    // for (let i = 0; i < timeLimits.length; i++) {
    {
      const i = timeLimits.length - 1
      const timeLimit = timeLimits[i]
      for (let j = 0; j < countPerTimeLimit; j++) {
        const index = i * countPerTimeLimit + j
        const startTime = ((index + 3) * 4294967291) % 2 === 0
          ? 0
          : ((index + 3) * 4294967291) % Math.min(3, Math.round(countPerTimeLimit / 5))
        const order = ((index + 1) * 4294967291) % count // pseudo random without duplicates
          + startTime * 10000
        const runTime = ((index + 2) * 4294967291) % Math.min(3, Math.round(countPerTimeLimit / 5))

        const func = createCheckedFunc({
          func: runTime
            ? async (abortSignal) => {
              values.push(order)
              if (runTime) {
                await delay(runTime, abortSignal, timeController)
              }
              return order
            }
            : (abortSignal) => {
              values.push(order)
              return order
            },
          limits : timeLimit.limits,
          results: results,
          timeController,
        })

        if (startTime) {
          timeController.setTimeout(() => {
            checkPromiseResults.push(order)
            promises.push(timeLimit.instance.run(1, func, priorityCreate(order), abortSignal, awaitPriority))
          }, startTime)
        }
        else {
          checkPromiseResults.push(order)
          promises.push(timeLimit.instance.run(1, func, priorityCreate(order), abortSignal, awaitPriority))
        }
      }
    }

    async function run() {
      await awaitTime(timeController, 95, 11)

      assert.strictEqual(values.length, count)

      const promiseResults = await Promise.all(promises)

      assert.strictEqual(promiseResults.length, count)
      assert.deepStrictEqual(promiseResults, checkPromiseResults)

      assert.strictEqual(values.length, count)

      if (withPriorityQueue) {
        let prevValue: number = values[0]
        for (let i = 1; i < count; i++) {
          const value = values[i]
          if (value <= prevValue) {
            assert.deepStrictEqual(
              values,
              values.slice().sort((o1, o2) => o1 > o2 ? 1 : -1),
            )
          }
          prevValue = value
        }
      }
    }

    return run()
  })

  it('variants', async function () {
    this.timeout(600000)

    await testVariants({
      withPriorityQueue: typeof window !== 'undefined'
        ? [true]
        : [false, true],

      timeLimit1: [1, 2, 5, 10],
      timeLimit2: [1, 2, 5, 10],
      timeLimit3: [1, 2, 5, 10],

      maxCount1: typeof window !== 'undefined'
        ? [1, 2, 5]
        : [0, 1, 2, 5],
      maxCount2: typeof window !== 'undefined'
        ? [1, 2, 5]
        : [0, 1, 2, 5],
      maxCount3: typeof window !== 'undefined'
        ? [1, 2, 5]
        : [0, 1, 2, 5],
    })()
  })
})
