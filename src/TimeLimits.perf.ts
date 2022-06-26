import {calcPerformanceAsync} from 'src/test/calcPerformanceAsync'
import {TimeLimit} from 'src/TimeLimit'
import {TimeControllerMock} from '@flemist/time-controller'
import {TimeLimits} from 'src/TimeLimits'
import {PriorityQueue} from '@flemist/priority-queue'

describe('time-limits > TimeLimits perf', function () {
  this.timeout(600000)

  it('base', async function () {
    const emptyFunc = o => o
    const priorityQueue = new PriorityQueue()
    const timeController = new TimeControllerMock()
    const timeLimit = new TimeLimit({
      timeMs  : 1,
      maxCount: 1,
      priorityQueue,
      timeController,
    })
    const timeLimits = new TimeLimits({
      timeLimits: [timeLimit],
      priorityQueue,
    })

    const count = 100

    const result = await calcPerformanceAsync(
      60000,
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
          promises.push(timeLimits.run(emptyFunc))
        }
        for (let i = 0; i < count; i++) {
          timeController.addTime(1)
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
