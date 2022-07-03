import {createTestVariants} from '@flemist/test-variants'
import {delay} from '@flemist/async-utils'
import {AbortControllerFast, IAbortSignalFast} from '@flemist/abort-controller-fast'
import {IObjectPool, ObjectPool} from './ObjectPool'
import {Pool, Pools} from 'src/pool'
import {TimeControllerMock} from '@flemist/time-controller'
import {awaitTime} from '@flemist/test-utils'
import {createAwaitPriority} from '@flemist/priority-queue'

describe('object-pool > ObjectPool', function () {
  let iteration = 0

  const testVariants = createTestVariants(async ({
    withPriorityQueue,
    countObjects,
    usePools,
    holdObjects,
    preAllocateSize,
    abort,
    async,
    maxSize,
  }: {
    withPriorityQueue?: boolean,
    countObjects: number,
    usePools: boolean,
    holdObjects: boolean,
    preAllocateSize: number,
    abort: null|'before'|'after',
    async: boolean,
    maxSize: number,
  }) => {
    // console.log({
    //   countObjects,
    //   usePools,
    //   holdObjects,
    //   preAllocateSize,
    //   abort,
    //   async,
    //   maxSize,
    // })

    iteration++

    const timeController = new TimeControllerMock()
    const awaitPriority = withPriorityQueue ? createAwaitPriority() : null

    const promises: Promise<number>[] = []

    type IObject = {
      id: number
    }

    let objectsCount = 0
    const createObject: () => Promise<IObject>|IObject = async
      ? async function createObject(): Promise<IObject> {
        objectsCount++
        assert.ok(objectsCount <= maxSize)
        await delay(1, null, timeController)
        return {
          id: objectsCount,
        }
      }
      : function createObject(): IObject {
        objectsCount++
        assert.ok(objectsCount <= maxSize)
        return {
          id: objectsCount,
        }
      }

    const pool = usePools
      ? new Pools(
        new Pool(maxSize),
        new Pools(
          new Pool(maxSize),
          new Pool(maxSize + 1),
        ),
        new Pool(maxSize + 2),
      )
      : new Pool(maxSize)

    const objectPool: IObjectPool<IObject> =
      new ObjectPool<IObject>({
        pool,
        holdObjects,
        create : createObject,
        destroy: null,
      })

    assert.strictEqual(objectPool.pool.maxSize, maxSize)
    assert.strictEqual(objectPool.pool.size, maxSize)
    if (holdObjects) {
      assert.strictEqual(objectPool.holdObjects.size, 0)
    }
    else {
      assert.strictEqual(objectPool.holdObjects, null)
    }
    assert.strictEqual(objectPool.availableObjects.length, 0)
    if (preAllocateSize !== void 0) {
      await Promise.race([
        objectPool.allocate(preAllocateSize),
        awaitTime(timeController, 1, 4)
          .then(() => {
            throw new Error('Timeout')
          }),
      ])
      assert.strictEqual(objectPool.pool.maxSize, maxSize)
      assert.strictEqual(objectPool.pool.size, maxSize)
      if (holdObjects) {
        assert.strictEqual(objectPool.holdObjects.size, 0)
      }
      else {
        assert.strictEqual(objectPool.holdObjects, null)
      }
      assert.strictEqual(objectPool.availableObjects.length, preAllocateSize == null
        ? maxSize
        : Math.min(maxSize, preAllocateSize))
    }

    const activeObjects = new Set<IObject>()
    function createFunc(result: number) {
      return async
        ? async function func(objects: IObject[], abortSignal: IAbortSignalFast) {
          assert.strictEqual(objects.length, countObjects)
          assert.ok(objects.every(o => o))
          assert.ok(objects.every(o => typeof o.id === 'number'))
          assert.ok(objects.every(o => o.id <= maxSize))

          assert.ok(objects.every(o => !activeObjects.has(o)))
          objects.forEach(o => {
            activeObjects.add(o)
          })
          assert.ok(activeObjects.size <= maxSize)
          assert.ok(objectPool.pool.size < objectPool.pool.maxSize)
          assert.ok(objectPool.availableObjects.length < maxSize)
          activeObjects.forEach(o => {
            assert.ok(!objectPool.availableObjects.includes(o))
          })
          if (holdObjects) {
            activeObjects.forEach(o => {
              assert.ok(objectPool.holdObjects.has(o))
            })
            objectPool.availableObjects.forEach(o => {
              assert.ok(!objectPool.holdObjects.has(o))
            })
            assert.ok(objectPool.holdObjects.size <= maxSize)
          }
          else {
            assert.strictEqual(objectPool.holdObjects, null)
          }

          await delay(1, null, timeController)

          if (abort) {
            assert.ok(abortSignal.aborted)
          }

          assert.ok(objectPool.pool.size < objectPool.pool.maxSize)
          assert.ok(objectPool.availableObjects.length < maxSize)
          activeObjects.forEach(o => {
            assert.ok(!objectPool.availableObjects.includes(o))
          })
          if (holdObjects) {
            activeObjects.forEach(o => {
              assert.ok(objectPool.holdObjects.has(o))
            })
            objectPool.availableObjects.forEach(o => {
              assert.ok(!objectPool.holdObjects.has(o))
            })
            assert.ok(objectPool.holdObjects.size <= maxSize)
          }
          else {
            assert.strictEqual(objectPool.holdObjects, null)
          }
          assert.ok(objects.every(o => activeObjects.has(o)))
          objects.forEach(o => {
            activeObjects.delete(o)
          })
          assert.ok(activeObjects.size < maxSize)

          return result
        }
        : function func(objects: IObject[], abortSignal: IAbortSignalFast) {
          if (abort) {
            assert.ok(abortSignal.aborted)
          }

          assert.ok(objects.every(o => o))
          assert.ok(objects.every(o => typeof o.id === 'number'))
          assert.ok(objects.every(o => o.id <= maxSize))

          assert.ok(objects.every(o => !activeObjects.has(o)))
          objects.forEach(o => {
            activeObjects.add(o)
          })

          assert.ok(activeObjects.size <= maxSize)
          assert.ok(objectPool.availableObjects.length < maxSize)
          activeObjects.forEach(o => {
            assert.ok(!objectPool.availableObjects.includes(o))
          })
          if (holdObjects) {
            activeObjects.forEach(o => {
              assert.ok(objectPool.holdObjects.has(o))
            })
            objectPool.availableObjects.forEach(o => {
              assert.ok(!objectPool.holdObjects.has(o))
            })
            assert.ok(objectPool.holdObjects.size <= maxSize)
          }
          else {
            assert.strictEqual(objectPool.holdObjects, null)
          }
          objects.forEach(o => {
            activeObjects.delete(o)
          })

          return result
        }
    }

    const totalCount = maxSize * 5
    for (let i = 0; i < totalCount; i++) {
      const func = createFunc(i + 10000 * iteration)
      const abortController = abort && new AbortControllerFast()
      if (abortController && abort === 'before') {
        abortController.abort(i + 10000 * iteration)
      }
      let promise = objectPool.use(countObjects, func, null, abortController?.signal, awaitPriority)
      if (abort) {
        promise = promise.catch(o => o)
      }
      promises.push(promise)
      if (abortController && abort === 'after') {
        abortController.abort(i + 10000 * iteration)
      }
    }

    const results = await Promise.race([
      Promise.all(promises),
      // awaitTime(timeController, 1000, 100)
      awaitTime(timeController, totalCount + countObjects, 13)
        .then(() => {
          throw new Error('Timeout')
        }),
    ])

    // awaitTime(timeController, 1000, 100)

    assert.strictEqual(activeObjects.size, 0)
    assert.strictEqual(objectPool.pool.maxSize, maxSize)
    assert.strictEqual(objectPool.pool.size, maxSize)

    for (let i = 0; i < totalCount; i++) {
      assert.strictEqual(results[i], i + 10000 * iteration)
    }

    // if (abort && preAllocateSize !== null) {
    //   assert.strictEqual(objectPool.availableObjects.length, Math.min(maxSize, preAllocateSize || 0))
    // }
    // else {
    //   assert.strictEqual(objectPool.availableObjects.length, maxSize - (objectsCount && maxSize % objectsCount))
    // }
  })

  it('variants', async function () {
    this.timeout(600000)
    await testVariants({
      withPriorityQueue: typeof window !== 'undefined'
        ? [true]
        : [true, false],
      countObjects   : [1, 2, 3, 5],
      usePools       : [false, true],
      holdObjects    : [false, true],
      preAllocateSize: [void 0, null, 0, 1, 2, 5],
      abort          : [null, 'before', 'after'],
      async          : [false, true],
      maxSize        : ({countObjects}) => [0, 1, 4].map(o => o + countObjects),
    })()
  })
})
