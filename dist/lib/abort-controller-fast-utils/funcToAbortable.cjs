'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var asyncUtils = require('@flemist/async-utils');

function funcToAbortable(abortSignal, func) {
    return tslib.__awaiter(this, void 0, void 0, function* () {
        if (!abortSignal) {
            return func();
        }
        if (abortSignal.aborted) {
            return Promise.reject(abortSignal.reason);
        }
        const promise = new asyncUtils.CustomPromise();
        function onReject(value) {
            promise.reject(value);
        }
        const unsubscribe = abortSignal.subscribe(onReject);
        try {
            return yield func(promise.promise);
        }
        finally {
            unsubscribe();
        }
    });
}

exports.funcToAbortable = funcToAbortable;
