!function(t){"use strict";function e(t,e,n,s){
return new(n||(n=Promise))((function(i,r){
function o(t){try{l(s.next(t))}catch(t){r(t)}}
function c(t){try{l(s.throw(t))}catch(t){r(t)}}
function l(t){var e
;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){
t(e)}))).then(o,c)}l((s=s.apply(t,e||[])).next())
}))}function n(t,e){var n,s,i,r,o={label:0,
sent:function(){if(1&i[0])throw i[1];return i[1]},
trys:[],ops:[]};return r={next:c(0),throw:c(1),
return:c(2)
},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){
return this}),r;function c(r){return function(c){
return function(r){
if(n)throw new TypeError("Generator is already executing.")
;for(;o;)try{
if(n=1,s&&(i=2&r[0]?s.return:r[0]?s.throw||((i=s.return)&&i.call(s),
0):s.next)&&!(i=i.call(s,r[1])).done)return i
;switch(s=0,i&&(r=[2&r[0],i.value]),r[0]){case 0:
case 1:i=r;break;case 4:return o.label++,{
value:r[1],done:!1};case 5:o.label++,s=r[1],r=[0]
;continue;case 7:r=o.ops.pop(),o.trys.pop()
;continue;default:
if(!(i=o.trys,(i=i.length>0&&i[i.length-1])||6!==r[0]&&2!==r[0])){
o=0;continue}
if(3===r[0]&&(!i||r[1]>i[0]&&r[1]<i[3])){
o.label=r[1];break}if(6===r[0]&&o.label<i[1]){
o.label=i[1],i=r;break}if(i&&o.label<i[2]){
o.label=i[2],o.ops.push(r);break}
i[2]&&o.ops.pop(),o.trys.pop();continue}
r=e.call(t,o)}catch(t){r=[6,t],s=0}finally{n=i=0}
if(5&r[0])throw r[1];return{
value:r[0]?r[1]:void 0,done:!0}}([r,c])}}}
function s(t){
return null!=t&&"object"==typeof t&&"function"==typeof t.then
}function i(t,e,n){try{const s=e?e(t):t
;n._resolve(s)}catch(t){n._reject(t)}}
function r(t,e,n){e||n._reject(t);try{const s=e(t)
;n._resolve(s)}catch(t){n._reject(t)}}
const o=function(){};class c{constructor(t){
this.status="pending",this.value=void 0,
this.reason=void 0,this._handlers=null
;const e=this._resolve,n=this._reject,s=this._resolveAsync,i=this._rejectAsync,r=this
;this._resolve=function(t){e.call(r,t)
},this._reject=function(t){n.call(r,t)
},this._resolveAsync=function(t){s.call(r,t)
},this._rejectAsync=function(t){i.call(r,t)
},t(this._resolve,this._reject)}_resolve(t){
"pending"===this.status&&(this.status="fulfilled",
this._resolveAsync(t))}_resolveAsync(t){
s(t)?t.then(this._resolveAsync,this._rejectAsync):this._resolveSync(t)
}_resolveSync(t){const e=this._handlers
;if(this.value=t,null!=e){this._handlers=null
;for(let n=0,s=e.length;n<s;n++){const[s,,r]=e[n]
;i(t,s,r)}}}_reject(t){
"pending"===this.status&&this._rejectAsync(t)}
_rejectAsync(t){
this.status="rejected",s(t)?t.then(this._rejectAsync,this._rejectAsync):this._rejectSync(t)
}_rejectSync(t){const e=this._handlers
;if(this.reason=t,null!=e){this._handlers=null
;for(let n=0,s=e.length;n<s;n++){const[,s,i]=e[n]
;r(t,s,i)}}}then(t,e){const n=new c(o)
;return"pending"===this.status?(null==this._handlers&&(this._handlers=[]),
this._handlers.push([t,e,n])):"fulfilled"===this.status?i(this.value,t,n):r(this.reason,e,n),
n}catch(t){return this.then(void 0,t)}finally(t){
const e=t&&function(e){return t(),e
},n=t&&function(e){throw t(),e}
;return this.then(e,n)}static resolve(t){
const e=new c(o);return e._resolve(t),e}
static reject(t){const e=new c(o)
;return e._reject(t),e}get[Symbol.toStringTag](){
return"Promise"}}const l=function(){};class u{
constructor(t){
if(t&&t.aborted)this.promise=c.reject(t.reason),this.resolve=l,this.reject=l;else{
let e,n
;if(this.promise=new Promise((function(t,s){
e=t,n=function(e){!function(t,e){t(function(t){
return{then(e,n){n(t)}}}(e))}(t,e)}})),t){
const s=t.subscribe((function(t){n(t)}))
;this.resolve=function(t){s(),e(t)
},this.reject=function(t){s(),n(t)}
}else this.resolve=e,this.reject=n}}}
const h=setTimeout,a=clearTimeout,f={
now:function(){return Date.now()},
setTimeout:"undefined"==typeof window?setTimeout:function(){
return h.apply(window,arguments)},
clearTimeout:"undefined"==typeof window?clearTimeout:function(){
return a.apply(window,arguments)}};class _{
constructor(t,e){
this._branch=null,this.order=t,this.parent=e}
get branch(){if(!this._branch){
const t=[this.order];let e=this.parent
;for(;null!=e;)t.push(e.order),e=e.parent
;this._branch=t}return this._branch}}
function d(t,e,n,s){
return new(n||(n=Promise))((function(i,r){
function o(t){try{l(s.next(t))}catch(t){r(t)}}
function c(t){try{l(s.throw(t))}catch(t){r(t)}}
function l(t){var e
;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){
t(e)}))).then(o,c)}l((s=s.apply(t,e||[])).next())
}))}function v(t,e){return t<e}class p{
constructor({objectPool:t,lessThanFunc:e}={}){
this._size=0,this._root=null,this.merge=y,
this.collapse=m,this._objectPool=t,this._lessThanFunc=e||v
}clear(){this._root=null,this._size=0}get size(){
return this._size}add(t){
let e=null!=this._objectPool?this._objectPool.get():null
;return null==e?e={child:null,next:null,prev:null,
item:t
}:e.item=t,this._size++,this._root=y(this._root,e,this._lessThanFunc),e
}getMin(){const{_root:t}=this
;return null==t?void 0:t.item}getMinNode(){
return this._root}deleteMin(){const{_root:t}=this
;if(null==t)return;const e=t.item
;return this.delete(t),e}delete(t){var e
;if(t===this._root)this._root=m(t.child,this._lessThanFunc);else{
if(null==t.prev){
if(this._objectPool)throw new Error("The node is already deleted. Don't use the objectPool to prevent this error.")
;return}
t.prev.child===t?t.prev.child=t.next:t.prev.next=t.next,null!=t.next&&(t.next.prev=t.prev),
this._root=y(this._root,m(t.child,this._lessThanFunc),this._lessThanFunc)
}
t.child=null,t.prev=null,t.next=null,t.item=void 0,null===(e=this._objectPool)||void 0===e||e.release(t),
this._size--}decreaseKey(t){
t!==this._root&&(t.prev.child===t?t.prev.child=t.next:t.prev.next=t.next,
null!=t.next&&(t.next.prev=t.prev),
this._root=y(this._root,t,this._lessThanFunc))}
get isEmpty(){return null==this._root}
[Symbol.iterator](){return this._iterate(!1)}
nodes(){return{
[Symbol.iterator]:()=>this._iterate(!0)}}
_iterate(t){const e=this._lessThanFunc
;return function*n(s){
s&&(t?yield s:yield s.item,s.child&&(null!=s.child.next&&(s.child=m(s.child,e),
s.child.prev=s),yield*n(s.child)))}(this._root)}}
function y(t,e,n){let s,i
;return null==t?e:null==e||t===e?t:(n(e.item,t.item)?(s=e,
i=t):(s=t,i=e),i.next=s.child,
null!=s.child&&(s.child.prev=i),i.prev=s,s.child=i,
s.next=null,s.prev=null,s)}function m(t,e){
let n,s,i,r,o;if(null==t)return null
;for(r=t,n=null;null!=r;){
if(s=r,i=s.next,null==i){s.prev=n,n=s;break}
r=i.next,o=y(s,i,e),o.prev=n,n=o}
for(o=null;null!=n;)r=n.prev,o=y(o,n,e),n=r
;return o}function b(t){
return null!=t&&"object"==typeof t&&"function"==typeof t.then
}function j(t,e,n){try{const s=e?e(t):t
;n._resolve(s)}catch(t){n._reject(t)}}
function w(t,e,n){e||n._reject(t);try{const s=e(t)
;n._resolve(s)}catch(t){n._reject(t)}}
const g=function(){};class T{constructor(t){
this.status="pending",this.value=void 0,
this.reason=void 0,this._handlers=null
;const e=this._resolve,n=this._reject,s=this._resolveAsync,i=this._rejectAsync,r=this
;this._resolve=function(t){e.call(r,t)
},this._reject=function(t){n.call(r,t)
},this._resolveAsync=function(t){s.call(r,t)
},this._rejectAsync=function(t){i.call(r,t)
},t(this._resolve,this._reject)}_resolve(t){
"pending"===this.status&&(this.status="fulfilled",
this._resolveAsync(t))}_resolveAsync(t){
b(t)?t.then(this._resolveAsync,this._rejectAsync):this._resolveSync(t)
}_resolveSync(t){const e=this._handlers
;if(this.value=t,null!=e){this._handlers=null
;for(let n=0,s=e.length;n<s;n++){const[s,,i]=e[n]
;j(t,s,i)}}}_reject(t){
"pending"===this.status&&this._rejectAsync(t)}
_rejectAsync(t){
this.status="rejected",b(t)?t.then(this._rejectAsync,this._rejectAsync):this._rejectSync(t)
}_rejectSync(t){const e=this._handlers
;if(this.reason=t,null!=e){this._handlers=null
;for(let n=0,s=e.length;n<s;n++){const[,s,i]=e[n]
;w(t,s,i)}}}then(t,e){const n=new T(g)
;return"pending"===this.status?(null==this._handlers&&(this._handlers=[]),
this._handlers.push([t,e,n])):"fulfilled"===this.status?j(this.value,t,n):w(this.reason,e,n),
n}catch(t){return this.then(void 0,t)}finally(t){
const e=t&&function(e){return t(),e
},n=t&&function(e){throw t(),e}
;return this.then(e,n)}static resolve(t){
const e=new T(g);return e._resolve(t),e}
static reject(t){const e=new T(g)
;return e._reject(t),e}get[Symbol.toStringTag](){
return"Promise"}}const k=function(){};class x{
constructor(t){
if(t&&t.aborted)this.promise=T.reject(t.reason),this.resolve=k,this.reject=k;else{
let e,n
;if(this.promise=new Promise((function(t,s){
e=t,n=function(e){!function(t,e){t(function(t){
return{then(e,n){n(t)}}}(e))}(t,e)}})),t){
const s=t.subscribe((function(t){n(t)}))
;this.resolve=function(t){s(),e(t)
},this.reject=function(t){s(),n(t)}
}else this.resolve=e,this.reject=n}}}
function A(t,e){return function(t,e){
const n=t&&t.branch,s=e&&e.branch,i=n?n.length:0,r=s?s.length:0,o=i>r?i:r
;for(let t=0;t<o;t++){
const e=t>=i?0:n[i-1-t],o=t>=r?0:s[r-1-t]
;if(e!==o)return e>o?1:-1}return 0
}(t.priority,e.priority)<0}let P=1;class S{
constructor(){this._queue=new p({lessThanFunc:A})}
run(t,e,n){return this._run(!1,t,e,n)}
runTask(t,e,n){return this._run(!0,t,e,n)}
_run(t,e,n,s){const i=new x(s),r={
priority:(o=P++,c=n,null==o?null==c?null:c:new _(o,c)),
func:e,abortSignal:s,resolve:i.resolve,
reject:i.reject,readyToRun:!t};var o,c
;if(this._queue.add(r),t){const t=this;return{
result:i.promise,setReadyToRun(e){
r.readyToRun=e,e&&t._process()}}}
return this._process(),i.promise}_process(){
return d(this,void 0,void 0,(function*(){
if(this._inProcess)return;this._inProcess=!0
;const t=this._queue;for(;;){
if(yield 0,t.isEmpty){this._inProcess=!1;break}
let e=t.getMin()
;if(e.readyToRun)t.deleteMin();else{let n
;for(const e of t.nodes())if(e.item.readyToRun){
n=e;break}if(!n){this._inProcess=!1;break}
e=n.item,t.delete(n)}
if(e.abortSignal&&e.abortSignal.aborted)e.reject(e.abortSignal.reason);else try{
let t=e.func&&e.func(e.abortSignal)
;t&&"function"==typeof t.then&&(t=yield t),e.resolve(t)
}catch(t){e.reject(t)}}}))}}var R=function(){
function t(t){
var e=t.maxCount,n=t.timeMs,s=t.priorityQueue,i=t.timeController,r=this
;this._activeCount=0,
this._tickPromise=new u,this._timeController=i||f,this._maxCount=e,
this._timeMs=n,
this._priorityQueue=s||new S,this._releaseFunc=function(){
r._release()},this._tickFunc=function(t){
return r.tick(t)},this._tasks=new Set}
return t.prototype.hold=function(){
this._activeCount++,this._activeCount===this._maxCount&&this._tasks.forEach((function(t){
t.setReadyToRun(!1)}))
},t.prototype.release=function(){
this._timeController.setTimeout(this._releaseFunc,this._timeMs)
},t.prototype._release=function(){
if(this._activeCount--,this._activeCount===this._maxCount-1){
var t=this._tickPromise
;this._tickPromise=new u,t.resolve(),this._tasks.forEach((function(t){
t.setReadyToRun(!0)}))}
},t.prototype.available=function(){
return this._activeCount<this._maxCount
},t.prototype.tick=function(t){
return function(t,e){
return new Promise((function(n,s){var i,r
;function o(t){r||(r=!0,i&&i(),s(t))}
t&&t.aborted?s(t.reason):(e.then((function(t){
i&&i(),n(t)})).catch(o),t&&(i=t.subscribe(o)))}))
}(t,this._tickPromise.promise)
},t.prototype.run=function(t,s,i,r){
return e(this,void 0,void 0,(function(){var e
;return n(this,(function(n){switch(n.label){
case 0:
return r?[3,2]:(e=this._priorityQueue.runTask(null,s,i),this._tasks.add(e),
e.setReadyToRun(this.available()),[4,e.result])
;case 1:n.sent(),this._tasks.delete(e),n.label=2
;case 2:this.hold(),n.label=3;case 3:
return n.trys.push([3,,5,6]),[4,t(i)];case 4:
return[2,n.sent()];case 5:
return this.release(),[7];case 6:return[2]}}))}))
},t}(),C=function(){function t(t){
var e=t.timeLimits,n=t.priorityQueue,s=this
;this._timeLimits=e,this._priorityQueue=n||new S,
this._tickFunc=function(t){return s.tick(t)
},this._tasks=new Set,this._availableUpdater()}
return t.prototype.hold=function(){
for(var t=0;t<this._timeLimits.length;t++)this._timeLimits[t].hold()
;this.available()||this._tasks.forEach((function(t){
t.setReadyToRun(!1)}))
},t.prototype.release=function(){
for(var t=0;t<this._timeLimits.length;t++)this._timeLimits[t].release()
;this.available()&&this._tasks.forEach((function(t){
t.setReadyToRun(!0)}))
},t.prototype.available=function(){
return this._timeLimits.every((function(t){
return t.available()}))
},t.prototype.tick=function(t){
return Promise.race(this._timeLimits.map((function(e){
return e.tick(t)})))
},t.prototype._availableUpdater=function(){
return e(this,void 0,void 0,(function(){
return n(this,(function(t){switch(t.label){case 0:
return[4,this.tick()];case 1:
return t.sent(),this.available()&&this._tasks.forEach((function(t){
t.setReadyToRun(!0)})),[3,0];case 2:return[2]}}))
}))},t.prototype.run=function(t,s,i,r){
return e(this,void 0,void 0,(function(){var e
;return n(this,(function(n){switch(n.label){
case 0:
return r?[3,2]:(e=this._priorityQueue.runTask(null,s,i),this._tasks.add(e),
e.setReadyToRun(this.available()),[4,e.result])
;case 1:n.sent(),this._tasks.delete(e),n.label=2
;case 2:this.hold(),n.label=3;case 3:
return n.trys.push([3,,5,6]),[4,t(i)];case 4:
return[2,n.sent()];case 5:
return this.release(),[7];case 6:return[2]}}))}))
},t}()
;t.TimeLimit=R,t.TimeLimits=C,Object.defineProperty(t,"__esModule",{
value:!0})}({});
