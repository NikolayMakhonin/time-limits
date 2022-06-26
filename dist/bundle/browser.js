!function(t){"use strict";function e(t,e,n,i){
return new(n||(n=Promise))((function(r,s){
function o(t){try{l(i.next(t))}catch(t){s(t)}}
function u(t){try{l(i.throw(t))}catch(t){s(t)}}
function l(t){var e
;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){
t(e)}))).then(o,u)}l((i=i.apply(t,e||[])).next())
}))}function n(t,e){var n,i,r,s,o={label:0,
sent:function(){if(1&r[0])throw r[1];return r[1]},
trys:[],ops:[]};return s={next:u(0),throw:u(1),
return:u(2)
},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){
return this}),s;function u(s){return function(u){
return function(s){
if(n)throw new TypeError("Generator is already executing.")
;for(;o;)try{
if(n=1,i&&(r=2&s[0]?i.return:s[0]?i.throw||((r=i.return)&&r.call(i),
0):i.next)&&!(r=r.call(i,s[1])).done)return r
;switch(i=0,r&&(s=[2&s[0],r.value]),s[0]){case 0:
case 1:r=s;break;case 4:return o.label++,{
value:s[1],done:!1};case 5:o.label++,i=s[1],s=[0]
;continue;case 7:s=o.ops.pop(),o.trys.pop()
;continue;default:
if(!(r=o.trys,(r=r.length>0&&r[r.length-1])||6!==s[0]&&2!==s[0])){
o=0;continue}
if(3===s[0]&&(!r||s[1]>r[0]&&s[1]<r[3])){
o.label=s[1];break}if(6===s[0]&&o.label<r[1]){
o.label=r[1],r=s;break}if(r&&o.label<r[2]){
o.label=r[2],o.ops.push(s);break}
r[2]&&o.ops.pop(),o.trys.pop();continue}
s=e.call(t,o)}catch(t){s=[6,t],i=0}finally{n=r=0}
if(5&s[0])throw s[1];return{
value:s[0]?s[1]:void 0,done:!0}}([s,u])}}}
function i(t){
return null!=t&&"object"==typeof t&&"function"==typeof t.then
}function r(t,e,n){try{const i=e?e(t):t
;n._resolve(i)}catch(t){n._reject(t)}}
function s(t,e,n){e||n._reject(t);try{const i=e(t)
;n._resolve(i)}catch(t){n._reject(t)}}
const o=function(){};class u{constructor(t){
this.status="pending",this.value=void 0,
this.reason=void 0,this._handlers=null
;const e=this._resolve,n=this._reject,i=this._resolveAsync,r=this._rejectAsync,s=this
;this._resolve=function(t){e.call(s,t)
},this._reject=function(t){n.call(s,t)
},this._resolveAsync=function(t){i.call(s,t)
},this._rejectAsync=function(t){r.call(s,t)
},t(this._resolve,this._reject)}_resolve(t){
"pending"===this.status&&(this.status="fulfilled",
this._resolveAsync(t))}_resolveAsync(t){
i(t)?t.then(this._resolveAsync,this._rejectAsync):this._resolveSync(t)
}_resolveSync(t){const e=this._handlers
;if(this.value=t,null!=e){this._handlers=null
;for(let n=0,i=e.length;n<i;n++){const[i,,s]=e[n]
;r(t,i,s)}}}_reject(t){
"pending"===this.status&&this._rejectAsync(t)}
_rejectAsync(t){
this.status="rejected",i(t)?t.then(this._rejectAsync,this._rejectAsync):this._rejectSync(t)
}_rejectSync(t){const e=this._handlers
;if(this.reason=t,null!=e){this._handlers=null
;for(let n=0,i=e.length;n<i;n++){const[,i,r]=e[n]
;s(t,i,r)}}}then(t,e){const n=new u(o)
;return"pending"===this.status?(null==this._handlers&&(this._handlers=[]),
this._handlers.push([t,e,n])):"fulfilled"===this.status?r(this.value,t,n):s(this.reason,e,n),
n}catch(t){return this.then(void 0,t)}finally(t){
const e=t&&function(e){return t(),e
},n=t&&function(e){throw t(),e}
;return this.then(e,n)}static resolve(t){
const e=new u(o);return e._resolve(t),e}
static reject(t){const e=new u(o)
;return e._reject(t),e}get[Symbol.toStringTag](){
return"Promise"}}const l=function(){};class c{
constructor(t){
if(t&&t.aborted)this.promise=u.reject(t.reason),this.resolve=l,this.reject=l;else{
let e,n
;if(this.promise=new Promise((function(t,i){
e=t,n=function(e){!function(t,e){t(function(t){
return{then(e,n){n(t)}}}(e))}(t,e)}})),t){
const i=t.subscribe((function(t){n(t)}))
;this.resolve=function(t){i(),e(t)
},this.reject=function(t){i(),n(t)}
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
function d(t,e){return t<e}class p{
constructor({objectPool:t,lessThanFunc:e}={}){
this._size=0,this._root=null,this.merge=v,
this.collapse=y,this._objectPool=t,this._lessThanFunc=e||d
}clear(){this._root=null,this._size=0}get size(){
return this._size}add(t){
let e=null!=this._objectPool?this._objectPool.get():null
;return null==e?e={child:null,next:null,prev:null,
item:t
}:e.item=t,this._size++,this._root=v(this._root,e,this._lessThanFunc),e
}getMin(){const{_root:t}=this
;return null==t?void 0:t.item}getMinNode(){
return this._root}deleteMin(){const{_root:t}=this
;if(null==t)return;const e=t.item
;return this.delete(t),e}delete(t){var e
;if(t===this._root)this._root=y(t.child,this._lessThanFunc);else{
if(null==t.prev){
if(this._objectPool)throw new Error("The node is already deleted. Don't use the objectPool to prevent this error.")
;return}
t.prev.child===t?t.prev.child=t.next:t.prev.next=t.next,null!=t.next&&(t.next.prev=t.prev),
this._root=v(this._root,y(t.child,this._lessThanFunc),this._lessThanFunc)
}
t.child=null,t.prev=null,t.next=null,t.item=void 0,null===(e=this._objectPool)||void 0===e||e.release(t),
this._size--}decreaseKey(t){
t!==this._root&&(t.prev.child===t?t.prev.child=t.next:t.prev.next=t.next,
null!=t.next&&(t.next.prev=t.prev),
this._root=v(this._root,t,this._lessThanFunc))}
get isEmpty(){return null==this._root}
[Symbol.iterator](){return this._iterate(!1)}
nodes(){return{
[Symbol.iterator]:()=>this._iterate(!0)}}
_iterate(t){const e=this._lessThanFunc
;return function*n(i){
i&&(t?yield i:yield i.item,i.child&&(null!=i.child.next&&(i.child=y(i.child,e),
i.child.prev=i),yield*n(i.child)))}(this._root)}}
function v(t,e,n){let i,r
;return null==t?e:null==e||t===e?t:(n(e.item,t.item)?(i=e,
r=t):(i=t,r=e),r.next=i.child,
null!=i.child&&(i.child.prev=r),r.prev=i,i.child=r,
i.next=null,i.prev=null,i)}function y(t,e){
let n,i,r,s,o;if(null==t)return null
;for(s=t,n=null;null!=s;){
if(i=s,r=i.next,null==r){i.prev=n,n=i;break}
s=r.next,o=v(i,r,e),o.prev=n,n=o}
for(o=null;null!=n;)s=n.prev,o=v(o,n,e),n=s
;return o}function m(t,e){return function(t,e){
const n=t&&t.branch,i=e&&e.branch,r=n?n.length:0,s=i?i.length:0,o=r>s?r:s
;for(let t=0;t<o;t++){
const e=t>=r?0:n[r-1-t],o=t>=s?0:i[s-1-t]
;if(e!==o)return e>o?1:-1}return 0
}(t.priority,e.priority)<0}let b=1;class w{
constructor(){this._queue=new p({lessThanFunc:m})}
run(t,e,n){return this._run(!1,t,e,n)}
runTask(t,e,n){return this._run(!0,t,e,n)}
_run(t,e,n,i){const r=new c(i),s={
priority:(o=b++,u=n,null==o?null==u?null:u:new _(o,u)),
func:e,abortSignal:i,resolve:r.resolve,
reject:r.reject,readyToRun:!t};var o,u
;if(this._queue.add(s),t){const t=this;return{
result:r.promise,setReadyToRun(e){
s.readyToRun=e,e&&t._process()}}}
return this._process(),r.promise}_process(){
return e(this,void 0,void 0,(function*(){
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
}catch(t){e.reject(t)}}}))}}var j=function(){
function t(t){
var e=t.maxCount,n=t.timeMs,i=t.priorityQueue,r=t.timeController,s=this
;this._activeCount=0,
this._tickPromise=new c,this._timeController=r||f,this._maxCount=e,
this._timeMs=n,
this._priorityQueue=i||new w,this._releaseFunc=function(){
s._release()},this._tickFunc=function(t){
return s.tick(t)},this._tasks=new Set}
return t.prototype._hold=function(){
this._activeCount++,this._activeCount===this._maxCount&&this._tasks.forEach((function(t){
t.setReadyToRun(!1)}))
},t.prototype._release=function(){
if(this._activeCount--,this._activeCount===this._maxCount-1){
var t=this._tickPromise
;this._tickPromise=new c,t.resolve(),this._tasks.forEach((function(t){
t.setReadyToRun(!0)}))}
},t.prototype.tick=function(t){
return function(t,e){
return new Promise((function(n,i){var r,s
;function o(t){s||(s=!0,r&&r(),i(t))}
t&&t.aborted?i(t.reason):(e.then((function(t){
r&&r(),n(t)})).catch(o),t&&(r=t.subscribe(o)))}))
}(t,this._tickPromise.promise)
},t.prototype.available=function(){
return this._activeCount<this._maxCount
},t.prototype.run=function(t,i,r,s){
return e(this,void 0,void 0,(function(){var e
;return n(this,(function(n){switch(n.label){
case 0:
return s?[3,2]:(e=this._priorityQueue.runTask(null,i,r),this._tasks.add(e),
e.setReadyToRun(this.available()),[4,e.result])
;case 1:n.sent(),this._tasks.delete(e),n.label=2
;case 2:this._hold(),n.label=3;case 3:
return n.trys.push([3,,5,6]),[4,t(r)];case 4:
return[2,n.sent()];case 5:
return this._timeController.setTimeout(this._releaseFunc,this._timeMs),
[7];case 6:return[2]}}))}))},t}(),T=function(){
function t(t){
var e=t.timeLimits,n=t.priorityQueue,i=this
;this._timeLimits=e,this._priorityQueue=n||new w,
this._tickFunc=function(t){return i.tick(t)
},this._tasks=new Set,this._availableUpdater()}
return t.prototype._hold=function(){
for(var t=this,e=new c,n=function(){
return e.promise
},i=0;i<this._timeLimits.length;i++)this._timeLimits[i].run(n,null,null,!0)
;return this.available()||this._tasks.forEach((function(t){
t.setReadyToRun(!1)})),function(){
e.resolve(),t.available()&&t._tasks.forEach((function(t){
t.setReadyToRun(!0)}))}
},t.prototype.tick=function(t){
return Promise.race(this._timeLimits.map((function(e){
return e.tick(t)})))
},t.prototype._availableUpdater=function(){
return e(this,void 0,void 0,(function(){
return n(this,(function(t){switch(t.label){case 0:
return[4,this.tick()];case 1:
return t.sent(),this.available()&&this._tasks.forEach((function(t){
t.setReadyToRun(!0)})),[3,0];case 2:return[2]}}))
}))},t.prototype.available=function(){
return this._timeLimits.every((function(t){
return t.available()}))
},t.prototype.run=function(t,i,r,s){
return e(this,void 0,void 0,(function(){var e,o
;return n(this,(function(n){switch(n.label){
case 0:
return s?[3,2]:(e=this._priorityQueue.runTask(null,i,r),this._tasks.add(e),
e.setReadyToRun(this.available()),[4,e.result])
;case 1:n.sent(),this._tasks.delete(e),n.label=2
;case 2:o=this._hold(),n.label=3;case 3:
return n.trys.push([3,,5,6]),[4,t(r)];case 4:
return[2,n.sent()];case 5:return o(),[7];case 6:
return[2]}}))}))},t}()
;t.TimeLimit=j,t.TimeLimits=T,Object.defineProperty(t,"__esModule",{
value:!0})}({});
