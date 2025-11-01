!function(t){"use strict";var e=function(t,n){
return e=Object.setPrototypeOf||{__proto__:[]
}instanceof Array&&function(t,e){t.__proto__=e
}||function(t,e){
for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])
},e(t,n)};function n(t,n){
if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null")
;function r(){this.constructor=t}
e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,
new r)}function r(t,e,n,r){
return new(n||(n=Promise))(function(o,i){
function l(t){try{u(r.next(t))}catch(t){i(t)}}
function s(t){try{u(r.throw(t))}catch(t){i(t)}}
function u(t){var e
;t.done?o(t.value):(e=t.value,e instanceof n?e:new n(function(t){
t(e)})).then(l,s)}u((r=r.apply(t,e||[])).next())})
}function o(t,e){var n,r,o,i={label:0,
sent:function(){if(1&o[0])throw o[1];return o[1]},
trys:[],ops:[]
},l=Object.create(("function"==typeof Iterator?Iterator:Object).prototype)
;return l.next=s(0),
l.throw=s(1),l.return=s(2),"function"==typeof Symbol&&(l[Symbol.iterator]=function(){
return this}),l;function s(s){return function(u){
return function(s){
if(n)throw new TypeError("Generator is already executing.")
;for(;l&&(l=0,s[0]&&(i=0)),i;)try{
if(n=1,r&&(o=2&s[0]?r.return:s[0]?r.throw||((o=r.return)&&o.call(r),
0):r.next)&&!(o=o.call(r,s[1])).done)return o
;switch(r=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:
case 1:o=s;break;case 4:return i.label++,{
value:s[1],done:!1};case 5:i.label++,r=s[1],s=[0]
;continue;case 7:s=i.ops.pop(),i.trys.pop()
;continue;default:
if(!(o=i.trys,(o=o.length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){
i=0;continue}
if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){
i.label=s[1];break}if(6===s[0]&&i.label<o[1]){
i.label=o[1],o=s;break}if(o&&i.label<o[2]){
i.label=o[2],i.ops.push(s);break}
o[2]&&i.ops.pop(),i.trys.pop();continue}
s=e.call(t,i)}catch(t){s=[6,t],r=0}finally{n=o=0}
if(5&s[0])throw s[1];return{
value:s[0]?s[1]:void 0,done:!0}}([s,u])}}}
"function"==typeof SuppressedError&&SuppressedError
;const i=new class{constructor(){this._nowUnique=0
}now(){return Math.max(this._nowUnique,Date.now())
}nowUnique(){const t=this.now()+1
;return this._nowUnique=t,t}setTimeout(t,e){
return setTimeout(t,e)}clearTimeout(t){
clearTimeout(t)}};function l(t,e){return t<e}
class s{
constructor({objectPool:t,lessThanFunc:e}={}){
this._size=0,this._root=null,this.merge=u,
this.collapse=c,this._objectPool=t,this._lessThanFunc=e||l
}clear(){this._root=null,this._size=0}get size(){
return this._size}add(t){
let e=null!=this._objectPool?this._objectPool.get():null
;return null==e?e={child:null,next:null,prev:null,
item:t
}:e.item=t,this._size++,this._root=u(this._root,e,this._lessThanFunc),e
}getMin(){const{_root:t}=this
;return null==t?void 0:t.item}getMinNode(){
return this._root}deleteMin(){const{_root:t}=this
;if(null==t)return;const e=t.item
;return this.delete(t),e}delete(t){var e
;if(t===this._root)this._root=c(t.child,this._lessThanFunc);else{
if(null==t.prev){
if(this._objectPool)throw new Error("The node is already deleted. Don't use the objectPool to prevent this error.")
;return}
t.prev.child===t?t.prev.child=t.next:t.prev.next=t.next,null!=t.next&&(t.next.prev=t.prev),
this._root=u(this._root,c(t.child,this._lessThanFunc),this._lessThanFunc)
}
t.child=null,t.prev=null,t.next=null,t.item=void 0,null===(e=this._objectPool)||void 0===e||e.release(t),
this._size--}decreaseKey(t){
t!==this._root&&(t.prev.child===t?t.prev.child=t.next:t.prev.next=t.next,
null!=t.next&&(t.next.prev=t.prev),
this._root=u(this._root,t,this._lessThanFunc))}
get isEmpty(){return null==this._root}
[Symbol.iterator](){return this._iterate(!1)}
nodes(){return{
[Symbol.iterator]:()=>this._iterate(!0)}}
_iterate(t){const e=this._lessThanFunc
;return function*n(r){
r&&(t?yield r:yield r.item,r.child&&(null!=r.child.next&&(r.child=c(r.child,e),
r.child.prev=r),yield*n(r.child)))}(this._root)}}
function u(t,e,n){let r,o
;return null==t?e:null==e||t===e?t:(n(e.item,t.item)?(r=e,
o=t):(r=t,o=e),o.next=r.child,
null!=r.child&&(r.child.prev=o),o.prev=r,r.child=o,
r.next=null,r.prev=null,r)}function c(t,e){
let n,r,o,i,l;if(null==t)return null
;for(i=t,n=null;null!=i;){
if(r=i,o=r.next,null==o){r.prev=n,n=r;break}
i=o.next,l=u(r,o,e),l.prev=n,n=l}
for(l=null;null!=n;)i=n.prev,l=u(l,n,e),n=i
;return l}function a(t,e){t(function(t){return{
then(e,n){n(t)}}}(e))}function h(t,e,n){
if(!Number.isFinite(t))throw new TypeError("milliseconds must be a finite number: "+t)
;return new Promise(function(r){
if(e&&e.aborted)return void a(r,e.reason);let o
;const l=n||i,s=l.setTimeout(function(){o&&o(),r()
},t);e&&(o=e.subscribe(function(t){
l.clearTimeout(s),a(r,t)}))})}function f(t){
return null!=t&&"object"==typeof t&&"function"==typeof t.then
}let p,d=[];function b(t){
d.push(t),p||(p=function(){
return r(this,void 0,void 0,function*(){
for(;d.length>0;){yield 0;const t=d
;d=[],t.forEach(t=>{try{t()}catch(t){
console.error("Unhandled promise rejection",t)}})}
p=null})}())}function _(t,e){let n,r
;e||(e=Promise);const o=new e((t,e)=>{n=t,r=e})
;let i=t.length;const l=[]
;return t.forEach((t,e)=>{f(t)?t.then(t=>{
l[e]=t,0===--i&&n(l)},r):(l[e]=t,0===--i&&n(l))
}),o}function y(t,e){let n,r;e||(e=Promise)
;const o=new e((t,e)=>{n=t,r=e})
;return t.forEach(t=>{f(t)?t.then(n,r):n(t)}),o}
function v(t,e,n){b(()=>{try{const r=e?e(t):t
;n._resolve(r)}catch(t){n._reject(t)}})}
function g(t,e,n){b(()=>{if(e)try{const r=e(t)
;n._resolve(r)}catch(t){n._reject(t)
}else n._reject(t)})}const m=function(){};class w{
constructor(t){
this.status="pending",this.value=void 0,this.reason=void 0,this._handlers=null
;const e=this._resolve,n=this._reject,r=this._resolveAsync,o=this._rejectAsync,i=this
;this._resolve=function(t){e.call(i,t)
},this._reject=function(t){n.call(i,t)
},this._resolveAsync=function(t){r.call(i,t)
},this._rejectAsync=function(t){o.call(i,t)
},t(this._resolve,this._reject)}_resolve(t){
"pending"===this.status&&(this.status="fulfilled",
this._resolveAsync(t))}_resolveAsync(t){
f(t)?t.then(this._resolveAsync,this._rejectAsync):this._resolveSync(t)
}_resolveSync(t){const e=this._handlers
;if(this.value=t,null!=e){this._handlers=null
;for(let n=0,r=e.length;n<r;n++){const[r,,o]=e[n]
;v(t,r,o)}}}_reject(t){
"pending"===this.status&&this._rejectAsync(t)}
_rejectAsync(t){
this.status="rejected",f(t)?t.then(this._rejectAsync,this._rejectAsync):this._rejectSync(t)
}_rejectSync(t){const e=this._handlers
;if(this.reason=t,null!=e){this._handlers=null
;for(let n=0,r=e.length;n<r;n++){const[,r,o]=e[n]
;g(t,r,o)}}}then(t,e){const n=new w(m)
;return"pending"===this.status?(null==this._handlers&&(this._handlers=[]),
this._handlers.push([t,e,n])):"fulfilled"===this.status?v(this.value,t,n):g(this.reason,e,n),
n}catch(t){return this.then(void 0,t)}finally(t){
const e=t&&function(e){const n=t()
;return f(n)?n.then(()=>e):w.resolve(e)
},n=t&&function(e){const n=t()
;return f(n)?n.then(()=>w.reject(e)):w.reject(e)}
;return this.then(e,n)}static resolve(t){
const e=new w(m);return e._resolve(t),e}
static reject(t){const e=new w(m)
;return e._reject(t),e}get[Symbol.toStringTag](){
return"Promise"}static get[Symbol.species](){
return w}static all(t){return _(t,w)}
static allSettled(t){return function(t,e){let n
;e||(e=Promise);const r=new e((t,e)=>{n=t})
;let o=t.length;const i=[]
;return t.forEach((t,e)=>{f(t)?t.then(t=>{i[e]={
status:"fulfilled",value:t},0===--o&&n(i)},t=>{
i[e]={status:"rejected",reason:t},0===--o&&n(i)
}):(i[e]={status:"fulfilled",value:t
},0===--o&&n(i))}),r}(t,w)}static any(t){
return function(t,e){let n,r;e||(e=Promise)
;const o=new e((t,e)=>{n=t,r=e});let i=t.length
;const l=[];return t.forEach((t,e)=>{
f(t)?t.then(n,t=>{
l[e]=t,0===--i&&r(new AggregateError(l))}):n(t)
}),o}(t,w)}static race(t){return y(t,w)}}
const j=function(){};class P{constructor(t){
if(this._status="pending",t&&t.aborted)this.promise=w.reject(t.reason),
this.resolve=j,this.reject=j;else{let e,n
;if(this.promise=new Promise(function(t){
e=t,n=function(e){a(t,e)}}),t){
const r=t.subscribe(function(t){n(t)})
;this.resolve=function(t){r(),e(t)
},this.reject=function(t){r(),n(t)}
}else this.resolve=e,this.reject=n}
this.promise.then(()=>{this._status="resolved"
},()=>{this._status="rejected"})}get state(){
return this._status}}function O(t,e,n){
function r(t){if(!n)return e(t);try{const r=e(t)
;if(!f(r)){const t=n();return f(t)?t.then(()=>r):r
}return function(t,e){return e?t.then(t=>{
const n=e();return f(n)?n.then(()=>t):t},t=>{
const n=e();if(!f(n))throw t;return n.then(()=>{
throw t})}):t}(r,n)}catch(t){const e=n()
;if(!f(e))throw t;return e.then(()=>{throw t})}}
const o=t?t():void 0;return f(o)?o.then(r):r(o)}
var C="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{}
;!function(t){if(!t.setImmediate){
var e,n,r,o,i,l=1,s={},u=!1,c=t.document,a=Object.getPrototypeOf&&Object.getPrototypeOf(t)
;a=a&&a.setTimeout?a:t,
"[object process]"==={}.toString.call(t.process)?e=function(t){
process.nextTick(function(){f(t)})}:!function(){
if(t.postMessage&&!t.importScripts){
var e=!0,n=t.onmessage
;return t.onmessage=function(){e=!1
},t.postMessage("","*"),t.onmessage=n,e}
}()?t.MessageChannel?((r=new MessageChannel).port1.onmessage=function(t){
f(t.data)},e=function(t){r.port2.postMessage(t)
}):c&&"onreadystatechange"in c.createElement("script")?(n=c.documentElement,
e=function(t){var e=c.createElement("script")
;e.onreadystatechange=function(){
f(t),e.onreadystatechange=null,n.removeChild(e),
e=null},n.appendChild(e)}):e=function(t){
setTimeout(f,0,t)
}:(o="setImmediate$"+Math.random()+"$",i=function(e){
e.source===t&&"string"==typeof e.data&&0===e.data.indexOf(o)&&f(+e.data.slice(o.length))
},
t.addEventListener?t.addEventListener("message",i,!1):t.attachEvent("onmessage",i),
e=function(e){t.postMessage(o+e,"*")
}),a.setImmediate=function(t){
"function"!=typeof t&&(t=new Function(""+t))
;for(var n=new Array(arguments.length-1),r=0;r<n.length;r++)n[r]=arguments[r+1]
;var o={callback:t,args:n};return s[l]=o,e(l),l++
},a.clearImmediate=h}function h(t){delete s[t]}
function f(t){if(u)setTimeout(f,0,t);else{
var e=s[t];if(e){u=!0;try{!function(t){
var e=t.callback,n=t.args;switch(n.length){case 0:
e();break;case 1:e(n[0]);break;case 2:e(n[0],n[1])
;break;case 3:e(n[0],n[1],n[2]);break;default:
e.apply(void 0,n)}}(e)}finally{h(t),u=!1}}}}
}("undefined"==typeof self?C:self);class x{
constructor(t,e){
this._branch=null,this.order=t,this.parent=e}
get branch(){if(!this._branch){
const t=[this.order];let e=this.parent
;for(;null!=e;)t.push(e.order),e=e.parent
;this._branch=t}return this._branch}}
const k=function(t){return t};function E(t,e){
return function(t,e){
const n=t&&t.branch,r=e&&e.branch,o=n?n.length:0,i=r?r.length:0,l=o>i?o:i
;for(let t=0;t<l;t++){
const e=t>=o?0:n[o-1-t],l=t>=i?0:r[i-1-t]
;if(e!==l)return e>l?1:-1}return 0
}(t.priority,e.priority)<0}let A=1;class T{
constructor(){this._queue=new s({lessThanFunc:E})}
run(t,e,n){return this._run(!1,t,e,n)}
runTask(t,e,n){return this._run(!0,t,e,n)}
_run(t,e,n,r){const o=new P(r),i={
priority:(l=A++,s=n,null==l?null==s?null:s:new x(l,s)),
func:e,abortSignal:r,resolve:o.resolve,
reject:o.reject,readyToRun:!t};var l,s
;if(this._queue.add(i),t){const t=this;return{
result:o.promise,setReadyToRun(e){
i.readyToRun=e,e&&!t._inProcess&&(t._inProcess=!0,
t._process())}}}
return this._inProcess||(this._inProcess=!0,this._process()),o.promise
}_process(){
return r(this,void 0,void 0,function*(){
const t=this._queue
;for(yield Promise.resolve().then(k);;){
if(yield 0,t.isEmpty){this._inProcess=!1;break}
let e=t.getMin()
;if(e.readyToRun)t.deleteMin();else{let n
;for(const e of t.nodes())if(e.item.readyToRun){
n=e;break}if(!n){this._inProcess=!1;break}
e=n.item,t.delete(n)}
if(e.abortSignal&&e.abortSignal.aborted)e.reject(e.abortSignal.reason);else try{
let t=e.func&&e.func(e.abortSignal)
;t&&"function"==typeof t.then&&(t=yield t),e.resolve(t)
}catch(t){e.reject(t)}}})}}const S=function(){
const t=new T;return function(e,n){
return t.run(void 0,e,n)}}();var M=function(){
function t(t){
if(this._heldCountMax=0,this._heldCount=0,this._tickPromise=new P,
!t)throw new Error("[Pool][constructor] heldCountMax should be > 0")
;this._heldCountMax=t}
return Object.defineProperty(t.prototype,"heldCountMax",{
get:function(){return this._heldCountMax},
enumerable:!1,configurable:!0
}),Object.defineProperty(t.prototype,"heldCount",{
get:function(){return this._heldCount},
enumerable:!1,configurable:!0
}),Object.defineProperty(t.prototype,"holdAvailable",{
get:function(){
return Math.max(0,this._heldCountMax-this._heldCount)
},enumerable:!1,configurable:!0
}),Object.defineProperty(t.prototype,"releaseAvailable",{
get:function(){return this._heldCount},
enumerable:!1,configurable:!0
}),t.prototype.canHold=function(t){
return 0===this.heldCount||t<=this.holdAvailable
},t.prototype.hold=function(t){
var e=this._heldCount
;return!(0!==e&&t>this.holdAvailable)&&(this._heldCount=e+t,
!0)},t.prototype.release=function(t,e){
var n=this._heldCount;if(t>n){
if(!e)throw new Error("[Pool][release] count (".concat(t," > heldCount (").concat(n,"))"))
;t=n}
if(t>0&&(this._heldCount=n-t,this._tickPromise)){
var r=this._tickPromise
;this._tickPromise=null,r.resolve()}return t
},t.prototype.tick=function(t){
if(0!==this._heldCount)return this._tickPromise||(this._tickPromise=new P),
function(t,e){return t?new Promise(function(n){
if(t&&t.aborted)return void a(n,t.reason);let r,o
;function i(t){o||(o=!0,r&&r(),a(n,t))}
e.then(function(t){r&&r(),n(t)
}).catch(i),t&&(r=t.subscribe(i))}):e
}(t,this._tickPromise.promise)},t}(),H=new T
;function W(t){
var e=this,n=t.pool,i=t.count,l=t.priority,s=t.abortSignal,u=t.awaitPriority
;return u||(u=S),H.run(function(t){
return r(e,void 0,void 0,function(){
return o(this,function(e){switch(e.label){case 0:
return n.canHold(i)?[3,3]:[4,n.tick(t)];case 1:
return e.sent(),[4,u(l,t)];case 2:
return e.sent(),[3,0];case 3:return[2]}})})},l,s)}
function R(t){
var e=t.pool,n=t.count,i=t.priority,l=t.abortSignal,s=t.awaitPriority
;return r(this,void 0,void 0,function(){
return o(this,function(t){switch(t.label){case 0:
return[4,W({pool:e,count:n,priority:i,
abortSignal:l,awaitPriority:s})];case 1:
if(t.sent(),!e.hold(n))throw new Error("[poolHoldWait] Unexpected behavior")
;return[2]}})})}var F=function(){function t(){
for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
;if(!(null==t?void 0:t.length))throw new Error("[Pools][constructor] pools should not be empty")
;this._pools=t}
return Object.defineProperty(t.prototype,"heldCountMax",{
get:function(){return function(t){
for(var e,n=0,r=t.length;n<r;n++){
var o=t[n].heldCountMax;(0===n||o<e)&&(e=o)}
return e}(this._pools)},enumerable:!1,
configurable:!0
}),Object.defineProperty(t.prototype,"heldCount",{
get:function(){return function(t){
for(var e,n=0,r=t.length;n<r;n++){
var o=t[n].heldCount;(0===n||o>e)&&(e=o)}return e
}(this._pools)},enumerable:!1,configurable:!0
}),Object.defineProperty(t.prototype,"holdAvailable",{
get:function(){return function(t){
for(var e,n=0,r=t.length;n<r;n++){
var o=t[n].holdAvailable;(0===n||o<e)&&(e=o)}
return e}(this._pools)},enumerable:!1,
configurable:!0
}),Object.defineProperty(t.prototype,"releaseAvailable",{
get:function(){return U(this._pools)},
enumerable:!1,configurable:!0
}),t.prototype.canHold=function(t){
return z(this._pools,t)
},t.prototype.hold=function(t){
return q(this._pools,t)
},t.prototype.release=function(t,e){
return I(this._pools,t,e)
},t.prototype.tick=function(t){
return D(this._pools,t)},t}();function U(t){
for(var e,n=0,r=t.length;n<r;n++){
var o=t[n].heldCount;(0===n||o<e)&&(e=o)}return e}
function z(t,e){var n=t.length
;if("number"!=typeof e&&e.length!==n)throw new Error("[poolsCanHold] count.length (".concat(e.length,") !== pools.length (").concat(n,")"))
;for(var r=0;r<n;r++){var o=t[r]
;if(0!==o.heldCount&&("number"==typeof e?e:e[r])>o.holdAvailable)return!1
}return!0}function q(t,e){if(!z(t,e))return!1
;for(var n=0,r=t.length;n<r;n++)if(!t[n].hold("number"==typeof e?e:e[n]))throw new Error("[poolsHold] Unexpected behavior")
;return!0}function I(t,e,n){
if("number"==typeof e){var r=U(t);if(e>r){
if(!n)throw new Error("[poolsRelease] count (".concat(e," > releaseAvailable (").concat(r,"))"))
;e=r}if(0===e)return 0}else{var o=t.length
;if(e.length!==o)throw new Error("[poolsRelease] count.length (".concat(e.length,") !== pools.length (").concat(o,")"))
;if(!n)for(var i=0;i<o;i++){
r=t[i].releaseAvailable
;if(e[i]>r)throw new Error("[poolsRelease] count[".concat(i,"] (").concat(e[i]," > releaseAvailable (").concat(r,"))"))
}}var l=null;for(i=0,o=t.length;i<o;i++){
var s=t[i].release("number"==typeof e?e:e[i],n)
;f(s)&&(l?l.push(s):l=[s])}if(l){var u=_(l)
;return"number"==typeof e?u.then(function(){
return e}):u}return e}function D(t,e){
for(var n,r=0,o=t.length;r<o;r++){
var i=t[r].tick(e);i&&(n?n.push(i):n=[i])}
return n?y(n):null}function L(t){
var e=this,n=t.pools,i=t.count,l=t.priority,s=t.abortSignal,u=t.awaitPriority,c=n.length
;if("number"!=typeof i&&i.length!==c)throw new Error("[poolsHoldWait] count.length (".concat(i.length,") !== pools.length (").concat(c,")"))
;return u||(u=S),H.run(function(t){
return r(e,void 0,void 0,function(){
return o(this,function(e){switch(e.label){case 0:
return z(n,i)?[3,4]:[4,D(n,t)];case 1:
return e.sent(),u?[4,u(l,t)]:[3,3];case 2:
e.sent(),e.label=3;case 3:return[3,0];case 4:
return[2]}})})},l,s)}var N=function(){
function t(t){this._pool=t}
return Object.defineProperty(t.prototype,"pool",{
get:function(){return this._pool},enumerable:!1,
configurable:!0
}),t.prototype.run=function(t,e,n,i,l){
return r(this,void 0,void 0,function(){
return o(this,function(r){switch(r.label){case 0:
return[4,R({pool:this._pool,count:t,priority:n,
abortSignal:i,awaitPriority:l})];case 1:
r.sent(),r.label=2;case 2:
return r.trys.push([2,,4,5]),[4,e(i)];case 3:
return[2,r.sent()];case 4:
return this._pool.release(t),[7];case 5:return[2]}
})})},t}(),Y=function(){function t(t){this._pool=t
}
return Object.defineProperty(t.prototype,"heldCountMax",{
get:function(){return this._pool.heldCountMax},
enumerable:!1,configurable:!0
}),Object.defineProperty(t.prototype,"heldCount",{
get:function(){return this._pool.heldCount},
enumerable:!1,configurable:!0
}),Object.defineProperty(t.prototype,"holdAvailable",{
get:function(){return this._pool.holdAvailable},
enumerable:!1,configurable:!0
}),Object.defineProperty(t.prototype,"releaseAvailable",{
get:function(){return this._pool.releaseAvailable
},enumerable:!1,configurable:!0
}),t.prototype.canHold=function(t){
return this._pool.canHold(t)
},t.prototype.hold=function(t){
return this._pool.hold(t)
},t.prototype.release=function(t,e){
return this._pool.release(t,e)
},t.prototype.tick=function(t){
return this._pool.tick(t)},t}(),$=function(t){
function e(e){
var n=t.call(this,"Pool hold(".concat(e,") failed"))||this
;return n.count=e,n}return n(e,t),e}(Error)
;var G=function(t){function e(e){
for(var n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r]
;var o=t.call(this,e)||this;return o._pools=n,o}
return n(e,t),Object.defineProperty(e.prototype,"heldCount",{
get:function(){
for(var t=this._pool.heldCount,e=this._pools,n=0,r=e.length;n<r;n++)t+=e[n].heldCount
;return t},enumerable:!1,configurable:!0
}),Object.defineProperty(e.prototype,"holdAvailable",{
get:function(){
return Math.min(0,this.heldCountMax-this.heldCount)
},enumerable:!1,configurable:!0
}),e.prototype.canHold=function(t){
return 0===this.heldCount||t<=this.holdAvailable
},e.prototype.hold=function(t){
return!!this.canHold(t)&&this._pool.hold(t)
},e.prototype.tick=function(t){
var e,n=this._pool.tick(t);n&&(e=[n])
;for(var r=0,o=this._pools.length;r<o;r++){
var i=this._pools[r].tick(t)
;i&&(e?e.push(i):e=[i])}return e?y(e):null},e}(Y)
;var K=function(){function t(){this._objects=[]}
return Object.defineProperty(t.prototype,"objects",{
get:function(){return this._objects},
enumerable:!1,configurable:!0
}),Object.defineProperty(t.prototype,"size",{
get:function(){return this._objects.length},
enumerable:!1,configurable:!0
}),t.prototype.get=function(t){
var e=this._objects.length;t>e&&(t=e)
;var n=e-t,r=function(t,e,n){
for(var r=n-e,o=new Array(r),i=0;i<r;i++)o[i]=t[e+i]
;return o}(this._objects,n,n+t)
;return this._objects.length=n,r
},t.prototype.release=function(t,e,n){
null==e&&(e=0),null==n&&(n=t.length)
;for(var r=e;r<n;r++){var o=t[r]
;null!=o&&this._objects.push(o)}},t
}(),Q=function(){function t(t){
var e=t.pool,n=t.availableObjects,r=t.heldObjects,o=t.destroy,i=t.create
;this._allocatePool=new M(e.heldCountMax),
this._pool=new F(e,this._allocatePool),
this._availableObjects=n||new K,this._heldObjects=!0===r?new Set:r||null,
this._create=i,this._destroy=o}
return Object.defineProperty(t.prototype,"pool",{
get:function(){return this._pool},enumerable:!1,
configurable:!0
}),Object.defineProperty(t.prototype,"availableObjects",{
get:function(){
return this._availableObjects.objects},
enumerable:!1,configurable:!0
}),Object.defineProperty(t.prototype,"heldObjects",{
get:function(){return this._heldObjects},
enumerable:!1,configurable:!0
}),t.prototype.get=function(t){
var e=this._availableObjects.get(t)
;if(this._heldObjects&&e)for(var n=0,r=e.length;n<r;n++)this._heldObjects.add(e[n])
;return e},t.prototype.release=function(t,e,n){
return this._release(t,this._pool,e,n)
},t.prototype._release=function(t,e,n,i){
return r(this,void 0,void 0,function(){var r,l,s,u
;return o(this,function(o){switch(o.label){case 0:
return null==n&&(n=0),null==i&&(i=t.length),
r=i-n,[4,e.release(r,!0)];case 1:
if(l=o.sent(),i=Math.min(t.length,l),this._availableObjects.release(t,n,i),
this._heldObjects)for(s=n;s<i;s++)null!=(u=t[s])&&this._heldObjects&&this._heldObjects.delete(u)
;return[2,l]}})})},t.prototype.tick=function(t){
return this._pool.tick(t)
},t.prototype.getWait=function(t,e,n,i){
return r(this,void 0,void 0,function(){
return o(this,function(r){switch(r.label){case 0:
return[4,R({pool:this._pool,count:t,priority:e,
abortSignal:n,awaitPriority:i})];case 1:
return r.sent(),[2,this.get(t)]}})})
},t.prototype.use=function(t,e,n,i,l){
return r(this,void 0,void 0,function(){
var r,s,u,c,a,h;return o(this,function(o){
switch(o.label){case 0:
return[4,this.getWait(t,n,i,l)];case 1:
if(r=o.sent(),!this._create)throw new Error("[ObjectPool][use] You should specify create function in the constructor")
;r?s=r.length:(r=new Array(t),s=0),c=s,o.label=2
;case 2:return c<t?[4,this._create()]:[3,5]
;case 3:
if(null==(h=o.sent()))throw new Error("[ObjectPool][use] create function should return not null object")
;this._heldObjects&&this._heldObjects.add(h),
r[c]=h,o.label=4;case 4:return c++,[3,2];case 5:
return o.trys.push([5,,7,13]),[4,e(r,i)];case 6:
return[2,o.sent()];case 7:
return[4,this.release(r)];case 8:
if(u=o.sent(),!this._destroy)return[3,12]
;c=u,a=r.length,o.label=9;case 9:
return c<a?(h=r[c],[4,this._destroy(h)]):[3,12]
;case 10:o.sent(),o.label=11;case 11:
return c++,[3,9];case 12:return[7];case 13:
return[2]}})})},t.prototype.allocate=function(t){
if(!this._create)throw new Error("[ObjectPool][allocate] You should specify create function in the constructor")
;var e=[],n=this._allocatePool.holdAvailable-this._availableObjects.size
;if(null!=t&&t<n&&(n=t),
n<0)throw new Error("[ObjectPool][allocate] Unexpected behavior: tryHoldCount < 0")
;var i=this._allocatePool.hold(n)?n:0,l=0,s=this
;function u(t){
return r(this,void 0,void 0,function(){var e,n,r
;return o(this,function(o){switch(o.label){case 0:
return o.trys.push([0,2,,4]),[4,t];case 1:
return e=o.sent(),[3,4];case 2:
return n=o.sent(),[4,s._allocatePool.release(1)]
;case 3:throw o.sent(),n;case 4:
return[4,s._release([e],s._allocatePool)];case 5:
return r=o.sent(),l+=r,[2]}})})}function c(t){
return r(this,void 0,void 0,function(){var e
;return o(this,function(n){switch(n.label){case 0:
return[4,t];case 1:return e=n.sent(),l+=e,[2]}})})
}for(var a=0;a<i;a++){var h=this._create()
;if(f(h))e.push(u(h));else{
var p=this._release([h],this._allocatePool)
;f(p)&&e.push(c(p))}}
return e.length?_(e).then(function(t){return l}):l
},t}(),B=function(){function t(t){
this._objectPool=t}
return Object.defineProperty(t.prototype,"availableObjects",{
get:function(){
return this._objectPool.availableObjects},
enumerable:!1,configurable:!0
}),Object.defineProperty(t.prototype,"pool",{
get:function(){return this._objectPool.pool},
enumerable:!1,configurable:!0
}),t.prototype.allocate=function(t){
return this._objectPool.allocate(t)
},t.prototype.get=function(t){
return this._objectPool.get(t)
},t.prototype.getWait=function(t,e,n,r){
return this._objectPool.getWait(t,e,n,r)
},t.prototype.release=function(t,e,n){
return this._objectPool.release(t,e,n)
},t.prototype.tick=function(t){
return this._objectPool.tick(t)
},t.prototype.use=function(t,e,n,r,o){
return this._objectPool.use(t,e,n,r,o)},t
}(),J=function(t){function e(e){
var n=e.pool,r=e.time,o=e.timeController,l=t.call(this,n)||this
;return l._time=r,l._timeController=o||i,l}
return n(e,t),Object.defineProperty(e.prototype,"time",{
get:function(){return this._time},enumerable:!1,
configurable:!0
}),e.prototype.release=function(t,e){
return r(this,void 0,void 0,function(){
return o(this,function(n){switch(n.label){case 0:
return[4,h(this._time,null,this._timeController)]
;case 1:
return n.sent(),[2,this._pool.release(t,e)]}})})
},e}(Y)
;t.DependentPool=G,t.ObjectPool=Q,t.ObjectPoolWrapper=B,t.Pool=M,t.PoolHoldError=$,
t.PoolRunner=N,
t.PoolWrapper=Y,t.Pools=F,t.StackPool=K,t.TimeLimitPool=J,t.poolPriorityQueue=H,
t.poolRunThrow=function(t,e,n){
return O(function(){if(!t.hold(e))throw new $(e)
},n,function(){t.release(e)})
},t.poolRunWait=function(t){
var e=t.pool,n=t.count,r=t.func,o=t.priority,i=t.abortSignal,l=t.awaitPriority
;return O(function(){return R({pool:e,count:n,
priority:o,abortSignal:i,awaitPriority:l})
},function(){var t=new M(n);return r(t,i)
},function(){return e.release(n)})
},t.poolWait=W,t.poolWaitHold=R,t.poolsCanHold=z,
t.poolsHold=q,t.poolsRelease=I,
t.poolsTick=D,t.poolsWait=L,t.poolsWaitHold=function(t){
var e=t.pools,n=t.count,i=t.priority,l=t.abortSignal,s=t.awaitPriority
;return r(this,void 0,void 0,function(){
return o(this,function(t){switch(t.label){case 0:
return[4,L({pools:e,count:n,priority:i,
abortSignal:l,awaitPriority:s})];case 1:
if(t.sent(),!q(e,n))throw new Error("[poolsHoldWait] Unexpected behavior")
;return[2]}})})
},Object.defineProperty(t,"__esModule",{value:!0})
}({});
