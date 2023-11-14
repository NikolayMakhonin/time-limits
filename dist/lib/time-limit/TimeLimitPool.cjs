'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var timeController = require('@flemist/time-controller');
var asyncUtils = require('@flemist/async-utils');
var pool_PoolWrapper = require('../pool/PoolWrapper.cjs');

class TimeLimitPool extends pool_PoolWrapper.PoolWrapper {
    constructor({ pool, time, timeController: timeController$1, }) {
        super(pool);
        this._time = time;
        this._timeController = timeController$1 || timeController.timeControllerDefault;
    }
    get time() {
        return this._time;
    }
    release(count, dontThrow) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            yield asyncUtils.delay(this._time, null, this._timeController);
            return this._pool.release(count, dontThrow);
        });
    }
}

exports.TimeLimitPool = TimeLimitPool;
