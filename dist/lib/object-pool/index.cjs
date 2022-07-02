'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var objectPool_StackPool = require('./StackPool.cjs');
var objectPool_ObjectPool = require('./ObjectPool.cjs');
require('tslib');
require('../pool/Pool.cjs');
require('@flemist/async-utils');



exports.StackPool = objectPool_StackPool.StackPool;
exports.ObjectPool = objectPool_ObjectPool.ObjectPool;
