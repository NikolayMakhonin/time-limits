!function(e){"use strict";var t=function(e,n){
return t=Object.setPrototypeOf||{__proto__:[]
}instanceof Array&&function(e,t){e.__proto__=t
}||function(e,t){
for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])
},t(e,n)};function n(e,n){
if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null")
;function r(){this.constructor=e}
t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,
new r)}function r(e,t,n,r){
return new(n||(n=Promise))(function(o,i){
function s(e){try{c(r.next(e))}catch(e){i(e)}}
function l(e){try{c(r.throw(e))}catch(e){i(e)}}
function c(e){var t
;e.done?o(e.value):(t=e.value,t instanceof n?t:new n(function(e){
e(t)})).then(s,l)}c((r=r.apply(e,t||[])).next())})
}function o(e,t){var n,r,o,i={label:0,
sent:function(){if(1&o[0])throw o[1];return o[1]},
trys:[],ops:[]
},s=Object.create(("function"==typeof Iterator?Iterator:Object).prototype)
;return s.next=l(0),
s.throw=l(1),s.return=l(2),"function"==typeof Symbol&&(s[Symbol.iterator]=function(){
return this}),s;function l(l){return function(c){
return function(l){
if(n)throw new TypeError("Generator is already executing.")
;for(;s&&(s=0,l[0]&&(i=0)),i;)try{
if(n=1,r&&(o=2&l[0]?r.return:l[0]?r.throw||((o=r.return)&&o.call(r),
0):r.next)&&!(o=o.call(r,l[1])).done)return o
;switch(r=0,o&&(l=[2&l[0],o.value]),l[0]){case 0:
case 1:o=l;break;case 4:return i.label++,{
value:l[1],done:!1};case 5:i.label++,r=l[1],l=[0]
;continue;case 7:l=i.ops.pop(),i.trys.pop()
;continue;default:
if(!(o=i.trys,(o=o.length>0&&o[o.length-1])||6!==l[0]&&2!==l[0])){
i=0;continue}
if(3===l[0]&&(!o||l[1]>o[0]&&l[1]<o[3])){
i.label=l[1];break}if(6===l[0]&&i.label<o[1]){
i.label=o[1],o=l;break}if(o&&i.label<o[2]){
i.label=o[2],i.ops.push(l);break}
o[2]&&i.ops.pop(),i.trys.pop();continue}
l=t.call(e,i)}catch(e){l=[6,e],r=0}finally{n=o=0}
if(5&l[0])throw l[1];return{
value:l[0]?l[1]:void 0,done:!0}}([l,c])}}}
"function"==typeof SuppressedError&&SuppressedError
;const i=new class{constructor(){this._nowUnique=0
}now(){return Math.max(this._nowUnique,Date.now())
}nowUnique(){const e=this.now()+1
;return this._nowUnique=e,e}setTimeout(e,t){
return setTimeout(e,t)}clearTimeout(e){
clearTimeout(e)}};function s(e,t){return e<t}
class l{
constructor({objectPool:e,lessThanFunc:t}={}){
this._size=0,this._root=null,this.merge=c,
this.collapse=u,this._objectPool=e,this._lessThanFunc=t||s
}clear(){this._root=null,this._size=0}get size(){
return this._size}add(e){
let t=null!=this._objectPool?this._objectPool.get():null
;return null==t?t={child:null,next:null,prev:null,
item:e
}:t.item=e,this._size++,this._root=c(this._root,t,this._lessThanFunc),t
}getMin(){const{_root:e}=this
;return null==e?void 0:e.item}getMinNode(){
return this._root}deleteMin(){const{_root:e}=this
;if(null==e)return;const t=e.item
;return this.delete(e),t}delete(e){var t
;if(e===this._root)this._root=u(e.child,this._lessThanFunc);else{
if(null==e.prev){
if(this._objectPool)throw new Error("The node is already deleted. Don't use the objectPool to prevent this error.")
;return}
e.prev.child===e?e.prev.child=e.next:e.prev.next=e.next,null!=e.next&&(e.next.prev=e.prev),
this._root=c(this._root,u(e.child,this._lessThanFunc),this._lessThanFunc)
}
e.child=null,e.prev=null,e.next=null,e.item=void 0,null===(t=this._objectPool)||void 0===t||t.release(e),
this._size--}decreaseKey(e){
e!==this._root&&(e.prev.child===e?e.prev.child=e.next:e.prev.next=e.next,
null!=e.next&&(e.next.prev=e.prev),
this._root=c(this._root,e,this._lessThanFunc))}
get isEmpty(){return null==this._root}
[Symbol.iterator](){return this._iterate(!1)}
nodes(){return{
[Symbol.iterator]:()=>this._iterate(!0)}}
_iterate(e){const t=this._lessThanFunc
;return function*n(r){
r&&(e?yield r:yield r.item,r.child&&(null!=r.child.next&&(r.child=u(r.child,t),
r.child.prev=r),yield*n(r.child)))}(this._root)}}
function c(e,t,n){let r,o
;return null==e?t:null==t||e===t?e:(n(t.item,e.item)?(r=t,
o=e):(r=e,o=t),o.next=r.child,
null!=r.child&&(r.child.prev=o),o.prev=r,r.child=o,
r.next=null,r.prev=null,r)}function u(e,t){
let n,r,o,i,s;if(null==e)return null
;for(i=e,n=null;null!=i;){
if(r=i,o=r.next,null==o){r.prev=n,n=r;break}
i=o.next,s=c(r,o,t),s.prev=n,n=s}
for(s=null;null!=n;)i=n.prev,s=c(s,n,t),n=i
;return s}function a(e,t){e(function(e){return{
then(t,n){n(e)}}}(t))}function h(e,t,n){
if(!Number.isFinite(e))throw new TypeError("milliseconds must be a finite number: "+e)
;return new Promise(function(r){
if(t&&t.aborted)return void a(r,t.reason);let o
;const s=n||i,l=s.setTimeout(function(){o&&o(),r()
},e);t&&(o=t.subscribe(function(e){
s.clearTimeout(l),a(r,e)}))})}function f(e){
return null!=e&&"object"==typeof e&&"function"==typeof e.then
}let p,d=[];function b(e){
d.push(e),p||(p=function(){
return r(this,void 0,void 0,function*(){
for(;d.length>0;){yield 0;const e=d
;d=[],e.forEach(e=>{try{e()}catch(e){
console.error("Unhandled promise rejection",e)}})}
p=null})}())}function _(e,t){let n,r
;t||(t=Promise);const o=new t((e,t)=>{n=e,r=t})
;let i=e.length;const s=[]
;return e.forEach((e,t)=>{f(e)?e.then(e=>{
s[t]=e,0===--i&&n(s)},r):(s[t]=e,0===--i&&n(s))
}),o}function y(e,t){let n,r;t||(t=Promise)
;const o=new t((e,t)=>{n=e,r=t})
;return e.forEach(e=>{f(e)?e.then(n,r):n(e)}),o}
function v(e,t,n){b(()=>{try{const r=t?t(e):e
;n._resolve(r)}catch(e){n._reject(e)}})}
function g(e,t,n){b(()=>{if(t)try{const r=t(e)
;n._resolve(r)}catch(e){n._reject(e)
}else n._reject(e)})}const m=function(){};class j{
constructor(e){
this.status="pending",this.value=void 0,this.reason=void 0,this._handlers=null
;const t=this._resolve,n=this._reject,r=this._resolveAsync,o=this._rejectAsync,i=this
;this._resolve=function(e){t.call(i,e)
},this._reject=function(e){n.call(i,e)
},this._resolveAsync=function(e){r.call(i,e)
},this._rejectAsync=function(e){o.call(i,e)
},e(this._resolve,this._reject)}_resolve(e){
"pending"===this.status&&(this.status="fulfilled",
this._resolveAsync(e))}_resolveAsync(e){
f(e)?e.then(this._resolveAsync,this._rejectAsync):this._resolveSync(e)
}_resolveSync(e){const t=this._handlers
;if(this.value=e,null!=t){this._handlers=null
;for(let n=0,r=t.length;n<r;n++){const[r,,o]=t[n]
;v(e,r,o)}}}_reject(e){
"pending"===this.status&&this._rejectAsync(e)}
_rejectAsync(e){
this.status="rejected",f(e)?e.then(this._rejectAsync,this._rejectAsync):this._rejectSync(e)
}_rejectSync(e){const t=this._handlers
;if(this.reason=e,null!=t){this._handlers=null
;for(let n=0,r=t.length;n<r;n++){const[,r,o]=t[n]
;g(e,r,o)}}}then(e,t){const n=new j(m)
;return"pending"===this.status?(null==this._handlers&&(this._handlers=[]),
this._handlers.push([e,t,n])):"fulfilled"===this.status?v(this.value,e,n):g(this.reason,t,n),
n}catch(e){return this.then(void 0,e)}finally(e){
const t=e&&function(t){const n=e()
;return f(n)?n.then(()=>t):j.resolve(t)
},n=e&&function(t){const n=e()
;return f(n)?n.then(()=>j.reject(t)):j.reject(t)}
;return this.then(t,n)}static resolve(e){
const t=new j(m);return t._resolve(e),t}
static reject(e){const t=new j(m)
;return t._reject(e),t}get[Symbol.toStringTag](){
return"Promise"}static get[Symbol.species](){
return j}static all(e){return _(e,j)}
static allSettled(e){return function(e,t){let n
;t||(t=Promise);const r=new t((e,t)=>{n=e})
;let o=e.length;const i=[]
;return e.forEach((e,t)=>{f(e)?e.then(e=>{i[t]={
status:"fulfilled",value:e},0===--o&&n(i)},e=>{
i[t]={status:"rejected",reason:e},0===--o&&n(i)
}):(i[t]={status:"fulfilled",value:e
},0===--o&&n(i))}),r}(e,j)}static any(e){
return function(e,t){let n,r;t||(t=Promise)
;const o=new t((e,t)=>{n=e,r=t});let i=e.length
;const s=[];return e.forEach((e,t)=>{
f(e)?e.then(n,e=>{
s[t]=e,0===--i&&r(new AggregateError(s))}):n(e)
}),o}(e,j)}static race(e){return y(e,j)}}
const w=function(){};class P{constructor(e){
if(this._status="pending",e&&e.aborted)this.promise=j.reject(e.reason),
this.resolve=w,this.reject=w;else{let t,n
;if(this.promise=new Promise(function(e){
t=e,n=function(t){a(e,t)}}),e){
const r=e.subscribe(function(e){n(e)})
;this.resolve=function(e){r(),t(e)
},this.reject=function(e){r(),n(e)}
}else this.resolve=t,this.reject=n}
this.promise.then(()=>{this._status="resolved"
},()=>{this._status="rejected"})}get state(){
return this._status}}function z(e,t,n){
function r(e){if(!n)return t(e);try{const r=t(e)
;if(!f(r)){const e=n();return f(e)?e.then(()=>r):r
}return function(e,t){return t?e.then(e=>{
const n=t();return f(n)?n.then(()=>e):e},e=>{
const n=t();if(!f(n))throw e;return n.then(()=>{
throw e})}):e}(r,n)}catch(e){const t=n()
;if(!f(t))throw e;return t.then(()=>{throw e})}}
const o=e?e():void 0;return f(o)?o.then(r):r(o)}
var O="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{}
;!function(e){if(!e.setImmediate){
var t,n,r,o,i,s=1,l={},c=!1,u=e.document,a=Object.getPrototypeOf&&Object.getPrototypeOf(e)
;a=a&&a.setTimeout?a:e,
"[object process]"==={}.toString.call(e.process)?t=function(e){
process.nextTick(function(){f(e)})}:!function(){
if(e.postMessage&&!e.importScripts){
var t=!0,n=e.onmessage
;return e.onmessage=function(){t=!1
},e.postMessage("","*"),e.onmessage=n,t}
}()?e.MessageChannel?((r=new MessageChannel).port1.onmessage=function(e){
f(e.data)},t=function(e){r.port2.postMessage(e)
}):u&&"onreadystatechange"in u.createElement("script")?(n=u.documentElement,
t=function(e){var t=u.createElement("script")
;t.onreadystatechange=function(){
f(e),t.onreadystatechange=null,n.removeChild(t),
t=null},n.appendChild(t)}):t=function(e){
setTimeout(f,0,e)
}:(o="setImmediate$"+Math.random()+"$",i=function(t){
t.source===e&&"string"==typeof t.data&&0===t.data.indexOf(o)&&f(+t.data.slice(o.length))
},
e.addEventListener?e.addEventListener("message",i,!1):e.attachEvent("onmessage",i),
t=function(t){e.postMessage(o+t,"*")
}),a.setImmediate=function(e){
"function"!=typeof e&&(e=new Function(""+e))
;for(var n=new Array(arguments.length-1),r=0;r<n.length;r++)n[r]=arguments[r+1]
;var o={callback:e,args:n};return l[s]=o,t(s),s++
},a.clearImmediate=h}function h(e){delete l[e]}
function f(e){if(c)setTimeout(f,0,e);else{
var t=l[e];if(t){c=!0;try{!function(e){
var t=e.callback,n=e.args;switch(n.length){case 0:
t();break;case 1:t(n[0]);break;case 2:t(n[0],n[1])
;break;case 3:t(n[0],n[1],n[2]);break;default:
t.apply(void 0,n)}}(t)}finally{h(e),c=!1}}}}
}("undefined"==typeof self?O:self);class x{
constructor(e,t){
this._branch=null,this.order=e,this.parent=t}
get branch(){if(!this._branch){
const e=[this.order];let t=this.parent
;for(;null!=t;)e.push(t.order),t=t.parent
;this._branch=e}return this._branch}}
const S=function(e){return e};function k(e,t){
return function(e,t){
const n=e&&e.branch,r=t&&t.branch,o=n?n.length:0,i=r?r.length:0,s=o>i?o:i
;for(let e=0;e<s;e++){
const t=e>=o?0:n[o-1-e],s=e>=i?0:r[i-1-e]
;if(t!==s)return t>s?1:-1}return 0
}(e.priority,t.priority)<0}let E=1;class T{
constructor(){this._queue=new l({lessThanFunc:k})}
run(e,t,n){return this._run(!1,e,t,n)}
runTask(e,t,n){return this._run(!0,e,t,n)}
_run(e,t,n,r){const o=new P(r),i={
priority:(s=E++,l=n,null==s?null==l?null:l:new x(s,l)),
func:t,abortSignal:r,resolve:o.resolve,
reject:o.reject,readyToRun:!e};var s,l
;if(this._queue.add(i),e){const e=this;return{
result:o.promise,setReadyToRun(t){
i.readyToRun=t,t&&!e._inProcess&&(e._inProcess=!0,
e._process())}}}
return this._inProcess||(this._inProcess=!0,this._process()),o.promise
}_process(){
return r(this,void 0,void 0,function*(){
const e=this._queue
;for(yield Promise.resolve().then(S);;){
if(yield 0,e.isEmpty){this._inProcess=!1;break}
let t=e.getMin()
;if(t.readyToRun)e.deleteMin();else{let n
;for(const t of e.nodes())if(t.item.readyToRun){
n=t;break}if(!n){this._inProcess=!1;break}
t=n.item,e.delete(n)}
if(t.abortSignal&&t.abortSignal.aborted)t.reject(t.abortSignal.reason);else try{
let e=t.func&&t.func(t.abortSignal)
;e&&"function"==typeof e.then&&(e=yield e),t.resolve(e)
}catch(e){t.reject(e)}}})}}const A=function(){
const e=new T;return function(t,n){
return e.run(void 0,t,n)}}();var C=function(){
function e(e){
if(this._maxSize=0,this._size=0,this._tickPromise=new P,!e)throw new Error("maxSize should be > 0")
;this._maxSize=e,
this._size=e,this._priorityQueue=new T}
return Object.defineProperty(e.prototype,"maxSize",{
get:function(){return this._maxSize},
enumerable:!1,configurable:!0
}),Object.defineProperty(e.prototype,"size",{
get:function(){return this._size},enumerable:!1,
configurable:!0
}),Object.defineProperty(e.prototype,"holdCount",{
get:function(){return this._maxSize-this._size},
enumerable:!1,configurable:!0
}),Object.defineProperty(e.prototype,"holdAvailable",{
get:function(){return this._size},enumerable:!1,
configurable:!0}),e.prototype.hold=function(e){
var t=this._size;return!(e>t)&&(this._size=t-e,!0)
},Object.defineProperty(e.prototype,"releaseAvailable",{
get:function(){return this._maxSize-this._size},
enumerable:!1,configurable:!0
}),e.prototype.release=function(e,t){
var n=this._size,r=this._maxSize-n;if(e>r){
if(!t)throw new Error("count (".concat(e," > maxReleaseCount (").concat(r,"))"))
;e=r}if(e>0&&(this._size=n+e,this._tickPromise)){
var o=this._tickPromise
;this._tickPromise=null,o.resolve()}return e
},e.prototype.tick=function(e){
if(!(this._size>=this._maxSize))return this._tickPromise||(this._tickPromise=new P),
function(e,t){return e?new Promise(function(n){
if(e&&e.aborted)return void a(n,e.reason);let r,o
;function i(e){o||(o=!0,r&&r(),a(n,e))}
t.then(function(e){r&&r(),n(e)
}).catch(i),e&&(r=e.subscribe(i))}):t
}(e,this._tickPromise.promise)
},e.prototype.holdWait=function(e,t,n,i){
var s=this
;if(e>this._maxSize)throw new Error("holdCount (".concat(e," > maxSize (").concat(this._maxSize,"))"))
;return i||(i=A),
this._priorityQueue.run(function(n){
return r(s,void 0,void 0,function(){
return o(this,function(r){switch(r.label){case 0:
return e>this._size?[4,this.tick(n)]:[3,3];case 1:
return r.sent(),[4,i(t,n)];case 2:
return r.sent(),[3,0];case 3:
if(!this.hold(e))throw new Error("Unexpected behavior")
;return[2]}})})},t,n)},e}(),M=function(){
function e(){
for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t]
;if(!(null==e?void 0:e.length))throw new Error("pools should not be empty")
;this._pools=e,this._priorityQueue=new T}
return Object.defineProperty(e.prototype,"maxSize",{
get:function(){
for(var e,t=this._pools,n=0,r=t.length;n<r;n++){
var o=t[n].maxSize;(0===n||o<e)&&(e=o)}return e},
enumerable:!1,configurable:!0
}),Object.defineProperty(e.prototype,"size",{
get:function(){
for(var e,t=this._pools,n=0,r=t.length;n<r;n++){
var o=t[n].size;(0===n||o<e)&&(e=o)}return e},
enumerable:!1,configurable:!0
}),Object.defineProperty(e.prototype,"holdCount",{
get:function(){return this.maxSize-this.size},
enumerable:!1,configurable:!0
}),Object.defineProperty(e.prototype,"holdAvailable",{
get:function(){return this.size},enumerable:!1,
configurable:!0
}),Object.defineProperty(e.prototype,"releaseAvailable",{
get:function(){return this.maxSize-this.size},
enumerable:!1,configurable:!0
}),e.prototype.tick=function(e){
for(var t,n=0,r=this._pools.length;n<r;n++){
var o=this._pools[n].tick(e)
;o&&(t?t.push(o):t=[o])}return t?y(t):null
},e.prototype.hold=function(e){
if(e>this.size)return!1
;for(var t=this._pools,n=0,r=t.length;n<r;n++)t[n].hold(e)
;return!0},e.prototype.release=function(e,t){
var n=this.size,r=this.maxSize-n;if(e>r){
if(!t)throw new Error("count (".concat(e," > maxReleaseCount (").concat(r,"))"))
;e=r}if(e>0){
for(var o=this._pools,i=null,s=0,l=o.length;s<l;s++){
var c=o[s].release(e,t);f(c)&&(i?i.push(c):i=[c])}
if(i)return _(i).then(function(){return e})}
return e},e.prototype.holdWait=function(e,t,n,i){
return r(this,void 0,void 0,function(){var s=this
;return o(this,function(l){switch(l.label){case 0:
if(e>this.maxSize)throw new Error("holdCount (".concat(e," > maxSize (").concat(this.maxSize,"))"))
;return i||(i=A),
[4,this._priorityQueue.run(function(n){
return r(s,void 0,void 0,function(){
return o(this,function(r){switch(r.label){case 0:
return e>this.size?[4,this.tick(n)]:[3,4];case 1:
return r.sent(),i?[4,i(t,n)]:[3,3];case 2:
r.sent(),r.label=3;case 3:return[3,0];case 4:
if(!this.hold(e))throw new Error("Unexpected behavior")
;return[2]}})})},t,n)];case 1:return l.sent(),[2]}
})})},e}(),W=function(){function e(e){this._pool=e
}return Object.defineProperty(e.prototype,"pool",{
get:function(){return this._pool},enumerable:!1,
configurable:!0
}),e.prototype.run=function(e,t,n,i,s){
return r(this,void 0,void 0,function(){
return o(this,function(r){switch(r.label){case 0:
return[4,this._pool.holdWait(e,n,i,s)];case 1:
r.sent(),r.label=2;case 2:
return r.trys.push([2,,4,5]),[4,t(i)];case 3:
return[2,r.sent()];case 4:
return this._pool.release(e),[7];case 5:return[2]}
})})},e}(),F=function(){function e(e){this._pool=e
}return Object.defineProperty(e.prototype,"size",{
get:function(){return this._pool.size},
enumerable:!1,configurable:!0
}),Object.defineProperty(e.prototype,"maxSize",{
get:function(){return this._pool.maxSize},
enumerable:!1,configurable:!0
}),Object.defineProperty(e.prototype,"holdCount",{
get:function(){return this._pool.holdCount},
enumerable:!1,configurable:!0
}),Object.defineProperty(e.prototype,"holdAvailable",{
get:function(){return this._pool.holdAvailable},
enumerable:!1,configurable:!0
}),Object.defineProperty(e.prototype,"releaseAvailable",{
get:function(){return this._pool.releaseAvailable
},enumerable:!1,configurable:!0
}),e.prototype.hold=function(e){
return this._pool.hold(e)
},e.prototype.release=function(e,t){
return this._pool.release(e,t)
},e.prototype.tick=function(e){
return this._pool.tick(e)
},e.prototype.holdWait=function(e,t,n,r){
return this._pool.holdWait(e,t,n,r)},e
}(),R=function(e){function t(t){
var n=e.call(this,"Pool hold(".concat(t,") failed"))||this
;return n.count=t,n}return n(t,e),t}(Error)
;var U=function(){function e(e){
for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n]
;this._pool=e,this._pools=t,
this._priorityQueue=new T}
return Object.defineProperty(e.prototype,"maxSize",{
get:function(){return this._pool.maxSize},
enumerable:!1,configurable:!0
}),Object.defineProperty(e.prototype,"size",{
get:function(){
return Math.min(0,this.maxSize-this.holdCount)},
enumerable:!1,configurable:!0
}),Object.defineProperty(e.prototype,"holdCount",{
get:function(){
for(var e=this._pool.holdCount,t=this._pools,n=0,r=t.length;n<r;n++)e+=t[n].holdCount
;return e},enumerable:!1,configurable:!0
}),Object.defineProperty(e.prototype,"holdAvailable",{
get:function(){return this.size},enumerable:!1,
configurable:!0
}),Object.defineProperty(e.prototype,"releaseAvailable",{
get:function(){return this._pool.releaseAvailable
},enumerable:!1,configurable:!0
}),e.prototype.tick=function(e){
var t,n=this._pool.tick(e);n&&(t=[n])
;for(var r=0,o=this._pools.length;r<o;r++){
var i=this._pools[r].tick(e)
;i&&(t?t.push(i):t=[i])}return t?y(t):null
},e.prototype.hold=function(e){
return!(e>this.size)&&this._pool.hold(e)
},e.prototype.release=function(e,t){
return this._pool.release(e,t)
},e.prototype.holdWait=function(e,t,n,i){
return r(this,void 0,void 0,function(){var s=this
;return o(this,function(l){switch(l.label){case 0:
if(e>this.maxSize)throw new Error("holdCount (".concat(e," > maxSize (").concat(this.maxSize,"))"))
;return i||(i=A),
[4,this._priorityQueue.run(function(n){
return r(s,void 0,void 0,function(){
return o(this,function(r){switch(r.label){case 0:
return e>this.size?[4,this.tick(n)]:[3,4];case 1:
return r.sent(),i?[4,i(t,n)]:[3,3];case 2:
r.sent(),r.label=3;case 3:return[3,0];case 4:
if(!this.hold(e))throw new Error("Unexpected behavior")
;return[2]}})})},t,n)];case 1:return l.sent(),[2]}
})})},e}();var q=function(){function e(){
this._objects=[]}
return Object.defineProperty(e.prototype,"objects",{
get:function(){return this._objects},
enumerable:!1,configurable:!0
}),Object.defineProperty(e.prototype,"size",{
get:function(){return this._objects.length},
enumerable:!1,configurable:!0
}),e.prototype.get=function(e){
var t=this._objects.length;e>t&&(e=t)
;var n=t-e,r=function(e,t,n){
for(var r=n-t,o=new Array(r),i=0;i<r;i++)o[i]=e[t+i]
;return o}(this._objects,n,n+e)
;return this._objects.length=n,r
},e.prototype.release=function(e,t,n){
null==t&&(t=0),null==n&&(n=e.length)
;for(var r=t;r<n;r++){var o=e[r]
;null!=o&&this._objects.push(o)}},e
}(),I=function(){function e(e){
var t=e.pool,n=e.availableObjects,r=e.holdObjects,o=e.destroy,i=e.create
;this._allocatePool=new C(t.maxSize),
this._pool=new M(t,this._allocatePool),this._availableObjects=n||new q,
this._holdObjects=!0===r?new Set:r||null,
this._create=i,this._destroy=o}
return Object.defineProperty(e.prototype,"pool",{
get:function(){return this._pool},enumerable:!1,
configurable:!0
}),Object.defineProperty(e.prototype,"availableObjects",{
get:function(){
return this._availableObjects.objects},
enumerable:!1,configurable:!0
}),Object.defineProperty(e.prototype,"holdObjects",{
get:function(){return this._holdObjects},
enumerable:!1,configurable:!0
}),e.prototype.get=function(e){
var t=this._availableObjects.get(e)
;if(this._holdObjects&&t)for(var n=0,r=t.length;n<r;n++)this._holdObjects.add(t[n])
;return t},e.prototype.release=function(e,t,n){
return r(this,void 0,void 0,function(){
return o(this,function(r){
return[2,this._release(e,this._pool,t,n)]})})
},e.prototype._release=function(e,t,n,i){
return r(this,void 0,void 0,function(){var r,s,l,c
;return o(this,function(o){switch(o.label){case 0:
return null==n&&(n=0),null==i&&(i=e.length),
r=i-n,[4,t.release(r,!0)];case 1:
if(s=o.sent(),i=Math.min(e.length,s),this._availableObjects.release(e,n,i),
this._holdObjects)for(l=n;l<i;l++)null!=(c=e[l])&&this._holdObjects&&this._holdObjects.delete(c)
;return[2,s]}})})},e.prototype.tick=function(e){
return this._pool.tick(e)
},e.prototype.getWait=function(e,t,n,i){
return r(this,void 0,void 0,function(){
return o(this,function(r){switch(r.label){case 0:
return[4,this._pool.holdWait(e,t,n,i)];case 1:
return r.sent(),[2,this.get(e)]}})})
},e.prototype.use=function(e,t,n,i,s){
return r(this,void 0,void 0,function(){
var r,l,c,u,a,h;return o(this,function(o){
switch(o.label){case 0:
return[4,this.getWait(e,n,i,s)];case 1:
if(r=o.sent(),!this._create)throw new Error("You should specify create function in the constructor")
;r?l=r.length:(r=new Array(e),l=0),u=l,o.label=2
;case 2:return u<e?[4,this._create()]:[3,5]
;case 3:
if(null==(h=o.sent()))throw new Error("create function should return not null object")
;this._holdObjects&&this._holdObjects.add(h),
r[u]=h,o.label=4;case 4:return u++,[3,2];case 5:
return o.trys.push([5,,7,13]),[4,t(r,i)];case 6:
return[2,o.sent()];case 7:
return[4,this.release(r)];case 8:
if(c=o.sent(),!this._destroy)return[3,12]
;u=c,a=r.length,o.label=9;case 9:
return u<a?(h=r[u],[4,this._destroy(h)]):[3,12]
;case 10:o.sent(),o.label=11;case 11:
return u++,[3,9];case 12:return[7];case 13:
return[2]}})})},e.prototype.allocate=function(e){
if(!this._create)throw new Error("You should specify create function in the constructor")
;var t=[],n=this._allocatePool.size-this._availableObjects.size
;if(null!=e&&e<n&&(n=e),
n<0)throw new Error("Unexpected behavior: tryHoldCount < 0")
;var i=this._allocatePool.hold(n)?n:0,s=0,l=this
;function c(e){
return r(this,void 0,void 0,function(){var t,n,r
;return o(this,function(o){switch(o.label){case 0:
return o.trys.push([0,2,,4]),[4,e];case 1:
return t=o.sent(),[3,4];case 2:
return n=o.sent(),[4,l._allocatePool.release(1)]
;case 3:throw o.sent(),n;case 4:
return[4,l._release([t],l._allocatePool)];case 5:
return r=o.sent(),s+=r,[2]}})})}function u(e){
return r(this,void 0,void 0,function(){var t
;return o(this,function(n){switch(n.label){case 0:
return[4,e];case 1:return t=n.sent(),s+=t,[2]}})})
}for(var a=0;a<i;a++){var h=this._create()
;if(f(h))t.push(c(h));else{
var p=this._release([h],this._allocatePool)
;f(p)&&t.push(u(p))}}
return t.length?_(t).then(function(e){return s}):s
},e}(),Q=function(){function e(e){
this._objectPool=e}
return Object.defineProperty(e.prototype,"availableObjects",{
get:function(){
return this._objectPool.availableObjects},
enumerable:!1,configurable:!0
}),Object.defineProperty(e.prototype,"pool",{
get:function(){return this._objectPool.pool},
enumerable:!1,configurable:!0
}),e.prototype.allocate=function(e){
return this._objectPool.allocate(e)
},e.prototype.get=function(e){
return this._objectPool.get(e)
},e.prototype.getWait=function(e,t,n,r){
return this._objectPool.getWait(e,t,n,r)
},e.prototype.release=function(e,t,n){
return this._objectPool.release(e,t,n)
},e.prototype.tick=function(e){
return this._objectPool.tick(e)
},e.prototype.use=function(e,t,n,r,o){
return this._objectPool.use(e,t,n,r,o)},e
}(),D=function(e){function t(t){
var n=t.pool,r=t.time,o=t.timeController,s=e.call(this,n)||this
;return s._time=r,s._timeController=o||i,s}
return n(t,e),Object.defineProperty(t.prototype,"time",{
get:function(){return this._time},enumerable:!1,
configurable:!0
}),t.prototype.release=function(e,t){
return r(this,void 0,void 0,function(){
return o(this,function(n){switch(n.label){case 0:
return[4,h(this._time,null,this._timeController)]
;case 1:
return n.sent(),[2,this._pool.release(e,t)]}})})
},t}(F)
;e.DependentPool=U,e.ObjectPool=I,e.ObjectPoolWrapper=Q,e.Pool=C,e.PoolHoldError=R,
e.PoolRunner=W,
e.PoolWrapper=F,e.Pools=M,e.StackPool=q,e.TimeLimitPool=D,e.poolRunThrow=function(e,t,n){
return z(function(){if(!e.hold(t))throw new R(t)
},n,function(){e.release(t)})
},e.poolRunWait=function(e){
var t=e.pool,n=e.count,r=e.func,o=e.priority,i=e.abortSignal,s=e.awaitPriority
;return z(function(){return t.holdWait(n,o,i,s)
},function(){var e=new C(n);return r(e,i)
},function(){return t.release(n)})
},Object.defineProperty(e,"__esModule",{value:!0})
}({});
