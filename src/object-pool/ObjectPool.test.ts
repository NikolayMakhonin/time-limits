// import {createTestVariants} from '@flemist/test-variants'
// import {delay} from '@flemist/async-utils'
// import {AbortControllerFast, IAbortSignalFast} from '@flemist/abort-controller-fast'
// import {ObjectPool} from './ObjectPool'
// import {IObjectPool} from './contracts'
// import {Pools} from './Pools'
// import {Pool} from './Pool'
//
// describe('object-pool > ObjectPool', function () {
//   const testVariants = createTestVariants(async ({
//     usePools,
//     holdObjects,
//     preAllocateSize,
//     abort,
//     async,
//     maxSize,
//   }: {
//     usePools: boolean,
//     holdObjects: boolean,
//     preAllocateSize: number,
//     abort: boolean,
//     async: boolean,
//     maxSize: number,
//   }) => {
//     // console.log({
//     //   abort,
//     //   async,
//     //   maxSize,
//     // })
//
//     const promises: Promise<number>[] = []
//
//     type IObject = {
//       id: number
//     }
//
//     let objectsCount = 0
//     const createObject: () => Promise<IObject>|IObject = async
//       ? async function createObject(): Promise<IObject> {
//         objectsCount++
//         assert.ok(objectsCount <= maxSize)
//         await delay(1)
//         return {
//           id: objectsCount,
//         }
//       }
//       : function createObject(): IObject {
//         objectsCount++
//         assert.ok(objectsCount <= maxSize)
//         return {
//           id: objectsCount,
//         }
//       }
//
//     const pool = usePools
//       ? new Pools(
//         new Pool(maxSize),
//         new Pools(
//           new Pool(maxSize),
//           new Pool(maxSize + 1),
//         ),
//         new Pool(maxSize + 2),
//       )
//       : void 0
//
//     const objectPool: IObjectPool<IObject> =
//       new ObjectPool<IObject>({
//         maxSize,
//         pool,
//         holdObjects,
//         create : createObject,
//         destroy: null,
//       })
//
//     assert.strictEqual(objectPool.maxSize, maxSize)
//     assert.strictEqual(objectPool.available, maxSize)
//     if (holdObjects) {
//       assert.strictEqual(objectPool.holdObjects.size, 0)
//     }
//     else {
//       assert.strictEqual(objectPool.holdObjects, null)
//     }
//     assert.strictEqual(objectPool.availableObjects.length, 0)
//     if (preAllocateSize !== void 0) {
//       await objectPool.allocate(preAllocateSize)
//       assert.strictEqual(objectPool.maxSize, maxSize)
//       assert.strictEqual(objectPool.available, maxSize)
//       if (holdObjects) {
//         assert.strictEqual(objectPool.holdObjects.size, 0)
//       }
//       else {
//         assert.strictEqual(objectPool.holdObjects, null)
//       }
//       assert.strictEqual(objectPool.availableObjects.length, preAllocateSize == null
//         ? maxSize
//         : Math.min(maxSize, preAllocateSize))
//     }
//
//     const activeObjects = new Set<IObject>()
//     function createFunc(result: number) {
//       return async
//         ? async function func(obj: IObject, abortSignal: IAbortSignalFast) {
//           assert.ok(obj)
//           assert.ok(typeof obj.id === 'number')
//           assert.ok(obj.id <= maxSize)
//
//           assert.ok(!activeObjects.has(obj))
//           activeObjects.add(obj)
//           assert.ok(activeObjects.size <= maxSize)
//           assert.ok(objectPool.available < objectPool.maxSize)
//           assert.ok(objectPool.availableObjects.length < maxSize)
//           activeObjects.forEach(o => {
//             assert.ok(!objectPool.availableObjects.includes(o))
//           })
//           if (holdObjects) {
//             activeObjects.forEach(o => {
//               assert.ok(objectPool.holdObjects.has(o))
//             })
//             objectPool.availableObjects.forEach(o => {
//               assert.ok(!objectPool.holdObjects.has(o))
//             })
//             assert.ok(objectPool.holdObjects.size <= maxSize)
//           }
//           else {
//             assert.strictEqual(objectPool.holdObjects, null)
//           }
//
//           await delay(1)
//
//           if (abort) {
//             assert.ok(abortSignal.aborted)
//           }
//
//           assert.ok(objectPool.available < objectPool.maxSize)
//           assert.ok(objectPool.availableObjects.length < maxSize)
//           activeObjects.forEach(o => {
//             assert.ok(!objectPool.availableObjects.includes(o))
//           })
//           if (holdObjects) {
//             activeObjects.forEach(o => {
//               assert.ok(objectPool.holdObjects.has(o))
//             })
//             objectPool.availableObjects.forEach(o => {
//               assert.ok(!objectPool.holdObjects.has(o))
//             })
//             assert.ok(objectPool.holdObjects.size <= maxSize)
//           }
//           else {
//             assert.strictEqual(objectPool.holdObjects, null)
//           }
//           assert.ok(activeObjects.has(obj))
//           activeObjects.delete(obj)
//           assert.ok(activeObjects.size < maxSize)
//
//           return result
//         }
//         : function func(obj: IObject, abortSignal: IAbortSignalFast) {
//           if (abort) {
//             assert.ok(abortSignal.aborted)
//           }
//
//           assert.ok(obj)
//           assert.ok(typeof obj.id === 'number')
//           assert.ok(obj.id <= maxSize)
//
//           assert.ok(!activeObjects.has(obj))
//           activeObjects.add(obj)
//           assert.ok(activeObjects.size <= maxSize)
//           assert.ok(objectPool.availableObjects.length < maxSize)
//           activeObjects.forEach(o => {
//             assert.ok(!objectPool.availableObjects.includes(o))
//           })
//           if (holdObjects) {
//             activeObjects.forEach(o => {
//               assert.ok(objectPool.holdObjects.has(o))
//             })
//             objectPool.availableObjects.forEach(o => {
//               assert.ok(!objectPool.holdObjects.has(o))
//             })
//             assert.ok(objectPool.holdObjects.size <= maxSize)
//           }
//           else {
//             assert.strictEqual(objectPool.holdObjects, null)
//           }
//           activeObjects.delete(obj)
//
//           return result
//         }
//     }
//
//     const totalCount = maxSize * 10
//     for (let i = 0; i < totalCount; i++) {
//       const func = createFunc(i)
//       const abortController = abort && new AbortControllerFast()
//       if (abortController && !async) {
//         abortController.abort(i)
//       }
//       let promise = objectPool.use(func, abortController.signal)
//       if (abort) {
//         promise = promise.catch(o => o)
//       }
//       promises.push(promise)
//       if (abortController && async) {
//         abortController.abort(i)
//       }
//     }
//
//     const results = await Promise.all(promises)
//
//     assert.strictEqual(activeObjects.size, 0)
//     assert.strictEqual(objectPool.availableObjects.length, maxSize)
//     assert.strictEqual(objectPool.maxSize, maxSize)
//     assert.strictEqual(objectPool.available, maxSize)
//
//     for (let i = 0; i < totalCount; i++) {
//       assert.strictEqual(results[i], i)
//     }
//   })
//
//   it('variants', async function () {
//     this.timeout(600000)
//     await testVariants({
//       usePools       : [true, false],
//       holdObjects    : [false, true],
//       preAllocateSize: [void 0, null, 0, 1, 2, 9, 10],
//       abort          : [false, true],
//       async          : [false, true],
//       maxSize        : [1, 2, 10],
//     })()
//   })
// })
