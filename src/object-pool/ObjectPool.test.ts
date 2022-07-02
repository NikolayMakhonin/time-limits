import {createTestVariants} from '@flemist/test-variants'
import {delay} from '@flemist/async-utils'
import {AbortControllerFast, IAbortSignalFast} from '@flemist/abort-controller-fast'
import {IObjectPool, ObjectPool} from './ObjectPool'
import {Pool, Pools} from 'src/pool'
import {TimeControllerMock} from '@flemist/time-controller'
import {awaitTime} from '@flemist/test-utils'

describe('object-pool > ObjectPool', function () {
  const testVariants = createTestVariants(async ({
    countObjects,
    usePools,
    holdObjects,
    preAllocateSize,
    abort,
    async,
    maxSize,
  }: {
    countObjects: number,
    usePools: boolean,
    holdObjects: boolean,
    preAllocateSize: number,
    abort: boolean,
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

    const timeController = new TimeControllerMock()

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
      ? new Pools({
        pools: [
          new Pool({maxSize}),
          new Pools({
            pools: [
              new Pool({maxSize}),
              new Pool({maxSize: maxSize + 1}),
            ],
          }),
          new Pool({maxSize: maxSize + 2}),
        ],
      },
      )
      : void 0

    const objectPool: IObjectPool<IObject> =
      new ObjectPool<IObject>({
        maxSize,
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

    const totalCount = maxSize * 10
    for (let i = 0; i < totalCount; i++) {
      const func = createFunc(i)
      const abortController = abort && new AbortControllerFast()
      if (abortController && !async) {
        abortController.abort(i)
      }
      let promise = objectPool.use(countObjects, func, abortController.signal)
      if (abort) {
        promise = promise.catch(o => o)
      }
      promises.push(promise)
      if (abortController && async) {
        abortController.abort(i)
      }
    }

    const results = await Promise.race([
      Promise.all(promises),
      // awaitTime(timeController, 10000, 100)
      awaitTime(timeController, totalCount + countObjects, 6)
        .then(() => {
          throw new Error('Timeout')
        }),
    ])

    assert.strictEqual(activeObjects.size, 0)
    assert.strictEqual(objectPool.availableObjects.length, maxSize - maxSize % objectsCount)
    assert.strictEqual(objectPool.pool.maxSize, maxSize)
    assert.strictEqual(objectPool.pool.size, maxSize)

    for (let i = 0; i < totalCount; i++) {
      assert.strictEqual(results[i], i)
    }
  })

  it('variants', async function () {
    this.timeout(600000)
    await testVariants({
      countObjects   : [1, 2, 3, 7, 10],
      usePools       : [false, true],
      holdObjects    : [false, true],
      preAllocateSize: [void 0, null, 0, 1, 2, 9, 10],
      abort          : [false, true],
      async          : [false, true],
      maxSize        : ({countObjects}) => [0, 1, 9].map(o => o + countObjects),
    })()
  })
})
