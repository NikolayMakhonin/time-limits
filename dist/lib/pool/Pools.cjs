'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var priorityQueue = require('@flemist/priority-queue');
var asyncUtils = require('@flemist/async-utils');
var pool_Pool = require('./Pool.cjs');

// export interface IPools {
//   canHold(count: number | number[]): boolean
//   hold(count: number | number[]): boolean
//   release(count: number, dontThrow?: null | boolean): Promise<number> | number
//   release(count: number[], dontThrow?: null | boolean): Promise<number[]> | number[]
//   release(count: number | number[], dontThrow?: null | boolean): Promise<number | number[]> | number | number[]
// }
class Pools {
    constructor(...pools) {
        if (!(pools === null || pools === void 0 ? void 0 : pools.length)) {
            throw new Error('[Pools][constructor] pools should not be empty');
        }
        this._pools = pools;
    }
    get heldCountMax() {
        return poolsHeldCountMax(this._pools);
    }
    get heldCount() {
        return poolsHeldCount(this._pools);
    }
    get holdAvailable() {
        return poolsHoldAvailable(this._pools);
    }
    get releaseAvailable() {
        return poolsReleaseAvailable(this._pools);
    }
    canHold(count) {
        return poolsCanHold(this._pools, count);
    }
    hold(count) {
        return poolsHold(this._pools, count);
    }
    release(count, dontThrow) {
        return poolsRelease(this._pools, count, dontThrow);
    }
    tick(abortSignal) {
        return poolsTick(this._pools, abortSignal);
    }
}
function poolsHeldCountMax(pools) {
    let min;
    for (let i = 0, len = pools.length; i < len; i++) {
        const value = pools[i].heldCountMax;
        if (i === 0 || value < min) {
            min = value;
        }
    }
    return min;
}
function poolsHeldCount(pools) {
    let max;
    for (let i = 0, len = pools.length; i < len; i++) {
        const value = pools[i].heldCount;
        if (i === 0 || value > max) {
            max = value;
        }
    }
    return max;
}
function poolsHoldAvailable(pools) {
    let min;
    for (let i = 0, len = pools.length; i < len; i++) {
        const value = pools[i].holdAvailable;
        if (i === 0 || value < min) {
            min = value;
        }
    }
    return min;
}
function poolsReleaseAvailable(pools) {
    let min;
    for (let i = 0, len = pools.length; i < len; i++) {
        const value = pools[i].heldCount;
        if (i === 0 || value < min) {
            min = value;
        }
    }
    return min;
}
function poolsCanHold(pools, count) {
    const len = pools.length;
    if (typeof count !== 'number' && count.length !== len) {
        throw new Error(`[poolsCanHold] count.length (${count.length}) !== pools.length (${len})`);
    }
    for (let i = 0; i < len; i++) {
        const pool = pools[i];
        if (pool.heldCount !== 0
            && (typeof count === 'number' ? count : count[i]) > pool.holdAvailable) {
            return false;
        }
    }
    return true;
}
function poolsHold(pools, count) {
    if (!poolsCanHold(pools, count)) {
        return false;
    }
    for (let i = 0, len = pools.length; i < len; i++) {
        if (!pools[i].hold(typeof count === 'number' ? count : count[i])) {
            throw new Error('[poolsHold] Unexpected behavior');
        }
    }
    return true;
}
function poolsRelease(pools, count, dontThrow) {
    if (typeof count === 'number') {
        const releaseAvailable = poolsReleaseAvailable(pools);
        if (count > releaseAvailable) {
            if (dontThrow) {
                count = releaseAvailable;
            }
            else {
                throw new Error(`[poolsRelease] count (${count} > releaseAvailable (${releaseAvailable}))`);
            }
        }
        if (count === 0) {
            return 0;
        }
    }
    else {
        const len = pools.length;
        if (count.length !== len) {
            throw new Error(`[poolsRelease] count.length (${count.length}) !== pools.length (${len})`);
        }
        if (!dontThrow) {
            for (let i = 0; i < len; i++) {
                const releaseAvailable = pools[i].releaseAvailable;
                if (count[i] > releaseAvailable) {
                    throw new Error(`[poolsRelease] count[${i}] (${count[i]} > releaseAvailable (${releaseAvailable}))`);
                }
            }
        }
    }
    let promises = null;
    for (let i = 0, len = pools.length; i < len; i++) {
        const promise = pools[i].release(typeof count === 'number' ? count : count[i], dontThrow);
        if (asyncUtils.isPromiseLike(promise)) {
            if (!promises) {
                promises = [promise];
            }
            else {
                promises.push(promise);
            }
        }
    }
    if (promises) {
        const result = asyncUtils.promiseAll(promises);
        return typeof count === 'number' ? result.then(() => count) : result;
    }
    return count;
}
function poolsTick(pools, abortSignal) {
    let promises;
    for (let i = 0, len = pools.length; i < len; i++) {
        const promise = pools[i].tick(abortSignal);
        if (promise) {
            if (!promises) {
                promises = [promise];
            }
            else {
                promises.push(promise);
            }
        }
    }
    if (!promises) {
        return null;
    }
    return asyncUtils.promiseRace(promises);
}
function poolsWait({ pools, count, priority, abortSignal, awaitPriority, }) {
    const len = pools.length;
    if (typeof count !== 'number' && count.length !== len) {
        throw new Error(`[poolsHoldWait] count.length (${count.length}) !== pools.length (${len})`);
    }
    if (!awaitPriority) {
        awaitPriority = priorityQueue.awaitPriorityDefault;
    }
    return pool_Pool.poolPriorityQueue.run((abortSignal) => tslib.__awaiter(this, void 0, void 0, function* () {
        while (!poolsCanHold(pools, count)) {
            yield poolsTick(pools, abortSignal);
            if (awaitPriority) {
                yield awaitPriority(priority, abortSignal);
            }
        }
    }), priority, abortSignal);
}
function poolsWaitHold({ pools, count, priority, abortSignal, awaitPriority, }) {
    return tslib.__awaiter(this, void 0, void 0, function* () {
        yield poolsWait({ pools, count, priority, abortSignal, awaitPriority });
        if (!poolsHold(pools, count)) {
            throw new Error('[poolsHoldWait] Unexpected behavior');
        }
    });
}

exports.Pools = Pools;
exports.poolsCanHold = poolsCanHold;
exports.poolsHold = poolsHold;
exports.poolsRelease = poolsRelease;
exports.poolsTick = poolsTick;
exports.poolsWait = poolsWait;
exports.poolsWaitHold = poolsWaitHold;
