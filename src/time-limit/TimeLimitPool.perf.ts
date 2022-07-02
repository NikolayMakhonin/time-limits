/* eslint-disable @typescript-eslint/await-thenable */
import {calcPerformanceAsync} from 'rdtsc'
import {TimeControllerMock} from '@flemist/time-controller'
import {PriorityQueue} from '@flemist/priority-queue'
import {TimeLimitPool} from 'src/time-limit/TimeLimitPool'
import {Pool, PoolRunner, Pools} from 'src/pool'

describe('time-limits > TimeLimits perf', function () {
  this.timeout(600000)

  it('base', async function () {
    const emptyFunc = o => o
    const priorityQueue = new PriorityQueue()
    const timeController = new TimeControllerMock()
    const timeLimit = new PoolRunner(new TimeLimitPool({
      pool: new Pool(1),
      time: 1,
      timeController,
    }))
    const timeLimits = new PoolRunner(new Pools(timeLimit.pool))

    const count = 100

    const result = await calcPerformanceAsync(
      10000,
      () => {

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
      async () => {
        const promises = []
        for (let i = 0; i < count; i++) {
          promises.push(timeLimits.run(1, emptyFunc, null, priorityQueue))
        }
        for (let i = 0; i < count; i++) {
          timeController.addTime(1)
          await 0
          await 0
          await 0
          await 0
          await 0
          await 0
          await 0
        }
        timeController.addTime(1)
        await Promise.all(promises)
      },
    )

    console.log(result)
  })
})
