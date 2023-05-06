!function(t){"use strict";var e=function(t,r){
return e=Object.setPrototypeOf||{__proto__:[]
}instanceof Array&&function(t,e){t.__proto__=e
}||function(t,e){
for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])
},e(t,r)};function r(t,r){
if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null")
;function n(){this.constructor=t}
e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,
new n)}function n(t,e,r,n){
return new(r||(r=Promise))((function(o,i){
function s(t){try{c(n.next(t))}catch(t){i(t)}}
function l(t){try{c(n.throw(t))}catch(t){i(t)}}
function c(t){var e
;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){
t(e)}))).then(s,l)}c((n=n.apply(t,e||[])).next())
}))}function o(t,e){var r,n,o,i,s={label:0,
sent:function(){if(1&o[0])throw o[1];return o[1]},
trys:[],ops:[]};return i={next:l(0),throw:l(1),
return:l(2)
},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){
return this}),i;function l(i){return function(l){
return function(i){
if(r)throw new TypeError("Generator is already executing.")
;for(;s;)try{
if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),
0):n.next)&&!(o=o.call(n,i[1])).done)return o
;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:
case 1:o=i;break;case 4:return s.label++,{
value:i[1],done:!1};case 5:s.label++,n=i[1],i=[0]
;continue;case 7:i=s.ops.pop(),s.trys.pop()
;continue;default:
if(!(o=s.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){
s=0;continue}
if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){
s.label=i[1];break}if(6===i[0]&&s.label<o[1]){
s.label=o[1],o=i;break}if(o&&s.label<o[2]){
s.label=o[2],s.ops.push(i);break}
o[2]&&s.ops.pop(),s.trys.pop();continue}
i=e.call(t,s)}catch(t){i=[6,t],n=0}finally{r=o=0}
if(5&i[0])throw i[1];return{
value:i[0]?i[1]:void 0,done:!0}}([i,l])}}}
const i=setTimeout,s=clearTimeout,l={
now:function(){return Date.now()},
setTimeout:"undefined"==typeof window?setTimeout:function(){
return i.apply(window,arguments)},
clearTimeout:"undefined"==typeof window?clearTimeout:function(){
return s.apply(window,arguments)}}
;function c(t,e){t(function(t){return{then(e,r){
r(t)}}}(e))}function u(t){
return null!=t&&"object"==typeof t&&"function"==typeof t.then
}let a,h=[];function f(t){
h.push(t),a||(a=function(){
return n(this,void 0,void 0,(function*(){
for(;h.length>0;){yield 0;const t=h
;h=[],t.forEach((t=>{try{t()}catch(t){
console.error("Unhandled promise rejection",t)}}))
}a=null}))}())}function p(t,e){let r,n
;e||(e=Promise);const o=new e(((t,e)=>{r=t,n=e}))
;let i=t.length;const s=[]
;return t.forEach(((t,e)=>{u(t)?t.then((t=>{
s[e]=t,0==--i&&r(s)}),n):(s[e]=t,0==--i&&r(s))
})),o}function _(t,e){let r,n;e||(e=Promise)
;const o=new e(((t,e)=>{r=t,n=e}))
;return t.forEach((t=>{u(t)?t.then(r,n):r(t)})),o}
function b(t,e,r){f((()=>{try{const n=e?e(t):t
;r._resolve(n)}catch(t){r._reject(t)}}))}
function d(t,e,r){f((()=>{e||r._reject(t);try{
const n=e(t);r._resolve(n)}catch(t){r._reject(t)}
}))}const v=function(){};class y{constructor(t){
this.status="pending",this.value=void 0,
this.reason=void 0,this._handlers=null
;const e=this._resolve,r=this._reject,n=this._resolveAsync,o=this._rejectAsync,i=this
;this._resolve=function(t){e.call(i,t)
},this._reject=function(t){r.call(i,t)
},this._resolveAsync=function(t){n.call(i,t)
},this._rejectAsync=function(t){o.call(i,t)
},t(this._resolve,this._reject)}_resolve(t){
"pending"===this.status&&(this.status="fulfilled",
this._resolveAsync(t))}_resolveAsync(t){
u(t)?t.then(this._resolveAsync,this._rejectAsync):this._resolveSync(t)
}_resolveSync(t){const e=this._handlers
;if(this.value=t,null!=e){this._handlers=null
;for(let r=0,n=e.length;r<n;r++){const[n,,o]=e[r]
;b(t,n,o)}}}_reject(t){
"pending"===this.status&&this._rejectAsync(t)}
_rejectAsync(t){
this.status="rejected",u(t)?t.then(this._rejectAsync,this._rejectAsync):this._rejectSync(t)
}_rejectSync(t){const e=this._handlers
;if(this.reason=t,null!=e){this._handlers=null
;for(let r=0,n=e.length;r<n;r++){const[,n,o]=e[r]
;d(t,n,o)}}}then(t,e){const r=new y(v)
;return"pending"===this.status?(null==this._handlers&&(this._handlers=[]),
this._handlers.push([t,e,r])):"fulfilled"===this.status?b(this.value,t,r):d(this.reason,e,r),
r}catch(t){return this.then(void 0,t)}finally(t){
const e=t&&function(e){const r=t()
;return u(r)?r.then((()=>e)):y.resolve(e)
},r=t&&function(e){const r=t()
;return u(r)?r.then((()=>y.reject(e))):y.reject(e)
};return this.then(e,r)}static resolve(t){
const e=new y(v);return e._resolve(t),e}
static reject(t){const e=new y(v)
;return e._reject(t),e}get[Symbol.toStringTag](){
return"Promise"}static get[Symbol.species](){
return y}static all(t){return p(t,y)}
static allSettled(t){return function(t,e){let r
;e||(e=Promise);const n=new e(((t,e)=>{r=t}))
;let o=t.length;const i=[]
;return t.forEach(((t,e)=>{u(t)?t.then((t=>{i[e]={
status:"fulfilled",value:t},0==--o&&r(i)}),(t=>{
i[e]={status:"rejected",reason:t},0==--o&&r(i)
})):(i[e]={status:"fulfilled",value:t
},0==--o&&r(i))})),n}(t,y)}static any(t){
return function(t,e){let r,n;e||(e=Promise)
;const o=new e(((t,e)=>{r=t,n=e}));let i=t.length
;const s=[];return t.forEach(((t,e)=>{
u(t)?t.then(r,(t=>{
s[e]=t,0==--i&&n(new AggregateError(s))})):r(t)
})),o}(t,y)}static race(t){return _(t,y)}}
const j=function(){};class g{constructor(t){
if(this._status="pending",t&&t.aborted)this.promise=y.reject(t.reason),
this.resolve=j,this.reject=j;else{let e,r
;if(this.promise=new Promise((function(t){
e=t,r=function(e){c(t,e)}})),t){
const n=t.subscribe((function(t){r(t)}))
;this.resolve=function(t){n(),e(t)
},this.reject=function(t){n(),r(t)}
}else this.resolve=e,this.reject=r}
this.promise.then((()=>{this._status="resolved"
}),(()=>{this._status="rejected"}))}get state(){
return this._status}}function m(t,e){
return e?t.then((t=>(e(),t)),(t=>{throw e(),t})):t
}function w(t,e){return e?function(){try{
const r=t.apply(this,arguments)
;return u(r)?m(r,e):(e(),r)}catch(t){throw e(),t}
}:t}class P{constructor(t,e){
this._branch=null,this.order=t,this.parent=e}
get branch(){if(!this._branch){
const t=[this.order];let e=this.parent
;for(;null!=e;)t.push(e.order),e=e.parent
;this._branch=t}return this._branch}}
function A(t,e){return t<e}class O{
constructor({objectPool:t,lessThanFunc:e}={}){
this._size=0,this._root=null,this.merge=S,
this.collapse=z,this._objectPool=t,this._lessThanFunc=e||A
}clear(){this._root=null,this._size=0}get size(){
return this._size}add(t){
let e=null!=this._objectPool?this._objectPool.get():null
;return null==e?e={child:null,next:null,prev:null,
item:t
}:e.item=t,this._size++,this._root=S(this._root,e,this._lessThanFunc),e
}getMin(){const{_root:t}=this
;return null==t?void 0:t.item}getMinNode(){
return this._root}deleteMin(){const{_root:t}=this
;if(null==t)return;const e=t.item
;return this.delete(t),e}delete(t){var e
;if(t===this._root)this._root=z(t.child,this._lessThanFunc);else{
if(null==t.prev){
if(this._objectPool)throw new Error("The node is already deleted. Don't use the objectPool to prevent this error.")
;return}
t.prev.child===t?t.prev.child=t.next:t.prev.next=t.next,null!=t.next&&(t.next.prev=t.prev),
this._root=S(this._root,z(t.child,this._lessThanFunc),this._lessThanFunc)
}
t.child=null,t.prev=null,t.next=null,t.item=void 0,null===(e=this._objectPool)||void 0===e||e.release(t),
this._size--}decreaseKey(t){
t!==this._root&&(t.prev.child===t?t.prev.child=t.next:t.prev.next=t.next,
null!=t.next&&(t.next.prev=t.prev),
this._root=S(this._root,t,this._lessThanFunc))}
get isEmpty(){return null==this._root}
[Symbol.iterator](){return this._iterate(!1)}
nodes(){return{
[Symbol.iterator]:()=>this._iterate(!0)}}
_iterate(t){const e=this._lessThanFunc
;return function*r(n){
n&&(t?yield n:yield n.item,n.child&&(null!=n.child.next&&(n.child=z(n.child,e),
n.child.prev=n),yield*r(n.child)))}(this._root)}}
function S(t,e,r){let n,o
;return null==t?e:null==e||t===e?t:(r(e.item,t.item)?(n=e,
o=t):(n=t,o=e),o.next=n.child,
null!=n.child&&(n.child.prev=o),o.prev=n,n.child=o,
n.next=null,n.prev=null,n)}function z(t,e){
let r,n,o,i,s;if(null==t)return null
;for(i=t,r=null;null!=i;){
if(n=i,o=n.next,null==o){n.prev=r,r=n;break}
i=o.next,s=S(n,o,e),s.prev=r,r=s}
for(s=null;null!=r;)i=r.prev,s=S(s,r,e),r=i
;return s}function x(t){
return null!=t&&"object"==typeof t&&"function"==typeof t.then
}function k(t,e,r){try{const n=e?e(t):t
;r._resolve(n)}catch(t){r._reject(t)}}
function E(t,e,r){e||r._reject(t);try{const n=e(t)
;r._resolve(n)}catch(t){r._reject(t)}}
const T=function(){};class F{constructor(t){
this.status="pending",this.value=void 0,
this.reason=void 0,this._handlers=null
;const e=this._resolve,r=this._reject,n=this._resolveAsync,o=this._rejectAsync,i=this
;this._resolve=function(t){e.call(i,t)
},this._reject=function(t){r.call(i,t)
},this._resolveAsync=function(t){n.call(i,t)
},this._rejectAsync=function(t){o.call(i,t)
},t(this._resolve,this._reject)}_resolve(t){
"pending"===this.status&&(this.status="fulfilled",
this._resolveAsync(t))}_resolveAsync(t){
x(t)?t.then(this._resolveAsync,this._rejectAsync):this._resolveSync(t)
}_resolveSync(t){const e=this._handlers
;if(this.value=t,null!=e){this._handlers=null
;for(let r=0,n=e.length;r<n;r++){const[n,,o]=e[r]
;k(t,n,o)}}}_reject(t){
"pending"===this.status&&this._rejectAsync(t)}
_rejectAsync(t){
this.status="rejected",x(t)?t.then(this._rejectAsync,this._rejectAsync):this._rejectSync(t)
}_rejectSync(t){const e=this._handlers
;if(this.reason=t,null!=e){this._handlers=null
;for(let r=0,n=e.length;r<n;r++){const[,n,o]=e[r]
;E(t,n,o)}}}then(t,e){const r=new F(T)
;return"pending"===this.status?(null==this._handlers&&(this._handlers=[]),
this._handlers.push([t,e,r])):"fulfilled"===this.status?k(this.value,t,r):E(this.reason,e,r),
r}catch(t){return this.then(void 0,t)}finally(t){
const e=t&&function(e){return t(),e
},r=t&&function(e){throw t(),e}
;return this.then(e,r)}static resolve(t){
const e=new F(T);return e._resolve(t),e}
static reject(t){const e=new F(T)
;return e._reject(t),e}get[Symbol.toStringTag](){
return"Promise"}}const C=function(){};class W{
constructor(t){
if(t&&t.aborted)this.promise=F.reject(t.reason),this.resolve=C,this.reject=C;else{
let e,r;if(this.promise=new Promise((function(t){
e=t,r=function(e){!function(t,e){t(function(t){
return{then(e,r){r(t)}}}(e))}(t,e)}})),t){
const n=t.subscribe((function(t){r(t)}))
;this.resolve=function(t){n(),e(t)
},this.reject=function(t){n(),r(t)}
}else this.resolve=e,this.reject=r}}}
var M={},R={},Q={}
;Object.defineProperty(Q,"__esModule",{value:!0})
;class U extends Error{constructor(t,e){
super(t),Object.setPrototypeOf(this,U.prototype),
this.reason=e,this.name="AbortError",
this._internal=!1}}
Q.AbortError=U,Object.defineProperty(R,"__esModule",{
value:!0});var q=Q
;R.toAbortController=function(t,e){
return t.signal.subscribe((t=>{
t instanceof q.AbortError&&t._internal&&(t=t.reason),
e.abort(t)})),e
},R.toAbortControllerFast=function(t,e){
return t.signal.addEventListener("abort",(function(){
e.abort(this.reason)})),e
},R.toAbortSignal=function(t,e){
return t.subscribe((t=>{e.abort(t)})),e.signal
},R.toAbortSignalFast=function(t,e){
return t.addEventListener("abort",(function(t){
e.abort(t)})),e.signal};var L={},D={}
;Object.defineProperty(D,"__esModule",{value:!0})
;const H=()=>{};D.AbortSignalFast=class{
constructor(){
this.aborted=!1,this.reason=void 0,this._callbacks=void 0
}subscribe(t){var e
;if(null===(e=this._callbacks)||void 0===e?void 0:e.has(t))throw new Error("Already subscribed: "+t)
;return this.aborted?(t.call(this,this.reason),
H):(this._callbacks||(this._callbacks=new Set),
this._callbacks.add(t),()=>{var e
;null===(e=this._callbacks)||void 0===e||e.delete(t)
})}abort(t){var e
;this.aborted=!0,this.reason=t,null===(e=this._callbacks)||void 0===e||e.forEach((t=>{
t.call(this,this.reason)})),this._callbacks=void 0
}throwIfAborted(){
if(this.aborted)throw this.reason}
},Object.defineProperty(L,"__esModule",{value:!0})
;var Y=D,G=Q;L.AbortControllerFast=class{
constructor(){this.signal=new Y.AbortSignalFast}
abort(t){
this.signal.aborted||(void 0===t&&((t=new G.AbortError("Aborted with no reason",t))._internal=!0),
this.signal.abort(t))}
},Object.defineProperty(M,"__esModule",{value:!0})
;var I=R,K=L,N=Q;function B(t,e){
return function(t,e){
const r=t&&t.branch,n=e&&e.branch,o=r?r.length:0,i=n?n.length:0,s=o>i?o:i
;for(let t=0;t<s;t++){
const e=t>=o?0:r[o-1-t],s=t>=i?0:n[i-1-t]
;if(e!==s)return e>s?1:-1}return 0
}(t.priority,e.priority)<0}
M.toAbortController=I.toAbortController,M.toAbortControllerFast=I.toAbortControllerFast,
M.toAbortSignal=I.toAbortSignal,
M.toAbortSignalFast=I.toAbortSignalFast,M.AbortControllerFast=K.AbortControllerFast,
M.AbortError=N.AbortError;let J=1;class V{
constructor(){this._queue=new O({lessThanFunc:B})}
run(t,e,r){return this._run(!1,t,e,r)}
runTask(t,e,r){return this._run(!0,t,e,r)}
_run(t,e,r,n){const o=new W(n),i={
priority:(s=J++,l=r,null==s?null==l?null:l:new P(s,l)),
func:e,abortSignal:n,resolve:o.resolve,
reject:o.reject,readyToRun:!t};var s,l
;if(this._queue.add(i),t){const t=this;return{
result:o.promise,setReadyToRun(e){
i.readyToRun=e,e&&!t._inProcess&&(t._inProcess=!0,
t._process())}}}
return this._inProcess||(this._inProcess=!0,this._process()),o.promise
}_process(){
return n(this,void 0,void 0,(function*(){
const t=this._queue;for(;;){if(yield 0,t.isEmpty){
this._inProcess=!1;break}let e=t.getMin()
;if(e.readyToRun)t.deleteMin();else{let r
;for(const e of t.nodes())if(e.item.readyToRun){
r=e;break}if(!r){this._inProcess=!1;break}
e=r.item,t.delete(r)}
if(e.abortSignal&&e.abortSignal.aborted)e.reject(e.abortSignal.reason);else try{
let t=e.func&&e.func(e.abortSignal)
;t&&"function"==typeof t.then&&(t=yield t),e.resolve(t)
}catch(t){e.reject(t)}}}))}}const X=function(){
const t=new V;return function(e,r){
return t.run(void 0,e,r)}}();var Z=function(){
function t(t){
if(this._maxSize=0,this._size=0,this._tickPromise=new g,!t)throw new Error("maxSize should be > 0")
;this._maxSize=t,
this._size=t,this._priorityQueue=new V}
return Object.defineProperty(t.prototype,"maxSize",{
get:function(){return this._maxSize},
enumerable:!1,configurable:!0
}),Object.defineProperty(t.prototype,"size",{
get:function(){return this._size},enumerable:!1,
configurable:!0
}),Object.defineProperty(t.prototype,"holdAvailable",{
get:function(){return this._size},enumerable:!1,
configurable:!0}),t.prototype.hold=function(t){
var e=this._size;return!(t>e)&&(this._size=e-t,!0)
},Object.defineProperty(t.prototype,"releaseAvailable",{
get:function(){return this.maxSize-this._size},
enumerable:!1,configurable:!0
}),t.prototype.release=function(t){
var e=this._size,r=this.maxSize-e
;if(t>r&&(t=r),t>0&&(this._size=e+t,this._tickPromise)){
var n=this._tickPromise
;this._tickPromise=null,n.resolve()}return t
},t.prototype.tick=function(t){
if(!(this._size>0))return this._tickPromise||(this._tickPromise=new g),
function(t,e){return t?new Promise((function(r){
if(t&&t.aborted)return void c(r,t.reason);let n,o
;function i(t){o||(o=!0,n&&n(),c(r,t))}
e.then((function(t){n&&n(),r(t)
})).catch(i),t&&(n=t.subscribe(i))})):e
}(t,this._tickPromise.promise)
},t.prototype.holdWait=function(t,e,r,i){
var s=this
;if(t>this.maxSize)throw new Error("holdCount (".concat(t," > maxSize (").concat(this.maxSize,"))"))
;return i||(i=X),
this._priorityQueue.run((function(r){
return n(s,void 0,void 0,(function(){
return o(this,(function(n){switch(n.label){case 0:
return t>this._size?[4,this.tick(r)]:[3,3];case 1:
return n.sent(),[4,i(e,r)];case 2:
return n.sent(),[3,0];case 3:
if(!this.hold(t))throw new Error("Unexpected behavior")
;return[2]}}))}))}),e,r)},t}(),$=function(){
function t(){
for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
;if(!(null==t?void 0:t.length))throw new Error("pools should not be empty")
;this._pools=t,this._priorityQueue=new V}
return Object.defineProperty(t.prototype,"maxSize",{
get:function(){
for(var t,e=this._pools,r=0,n=e.length;r<n;r++){
var o=e[r].maxSize;(0===r||o<t)&&(t=o)}return t},
enumerable:!1,configurable:!0
}),Object.defineProperty(t.prototype,"size",{
get:function(){
for(var t,e=this._pools,r=0,n=e.length;r<n;r++){
var o=e[r].size;(0===r||o<t)&&(t=o)}return t},
enumerable:!1,configurable:!0
}),Object.defineProperty(t.prototype,"holdAvailable",{
get:function(){return this.size},enumerable:!1,
configurable:!0}),t.prototype.hold=function(t){
if(t>this.size)return!1
;for(var e=this._pools,r=0,n=e.length;r<n;r++)e[r].hold(t)
;return!0
},Object.defineProperty(t.prototype,"releaseAvailable",{
get:function(){return this.maxSize-this.size},
enumerable:!1,configurable:!0
}),t.prototype.release=function(t){
var e=this.size,r=this.maxSize-e
;if(t>r&&(t=r),t>0){
for(var n=this._pools,o=null,i=0,s=n.length;i<s;i++){
var l=n[i].release(t);u(l)&&(o?o.push(l):o=[l])}
if(o)return p(o).then((function(){return t}))}
return t},t.prototype.tick=function(t){
for(var e,r=0,n=this._pools.length;r<n;r++){
var o=this._pools[r].tick(t)
;o&&(e?e.push(o):e=[o])}return e?_(e):null
},t.prototype.holdWait=function(t,e,r,i){
return n(this,void 0,void 0,(function(){var s=this
;return o(this,(function(l){switch(l.label){
case 0:
if(t>this.maxSize)throw new Error("holdCount (".concat(t," > maxSize (").concat(this.maxSize,"))"))
;return i||(i=X),
[4,this._priorityQueue.run((function(r){
return n(s,void 0,void 0,(function(){
return o(this,(function(n){switch(n.label){case 0:
return t>this.size?[4,this.tick(r)]:[3,4];case 1:
return n.sent(),i?[4,i(e,r)]:[3,3];case 2:
n.sent(),n.label=3;case 3:return[3,0];case 4:
if(!this.hold(t))throw new Error("Unexpected behavior")
;return[2]}}))}))}),e,r)];case 1:
return l.sent(),[2]}}))}))},t}(),tt=function(){
function t(t){this._pool=t}
return Object.defineProperty(t.prototype,"pool",{
get:function(){return this._pool},enumerable:!1,
configurable:!0
}),t.prototype.run=function(t,e,r,i,s){
return n(this,void 0,void 0,(function(){
return o(this,(function(n){switch(n.label){case 0:
return[4,this._pool.holdWait(t,r,i,s)];case 1:
n.sent(),n.label=2;case 2:
return n.trys.push([2,,4,5]),[4,e(i)];case 3:
return[2,n.sent()];case 4:
return this._pool.release(t),[7];case 5:return[2]}
}))}))},t}(),et=function(){function t(t){
this._pool=t}
return Object.defineProperty(t.prototype,"size",{
get:function(){return this._pool.size},
enumerable:!1,configurable:!0
}),Object.defineProperty(t.prototype,"maxSize",{
get:function(){return this._pool.maxSize},
enumerable:!1,configurable:!0
}),Object.defineProperty(t.prototype,"holdAvailable",{
get:function(){return this._pool.holdAvailable},
enumerable:!1,configurable:!0
}),Object.defineProperty(t.prototype,"releaseAvailable",{
get:function(){return this._pool.releaseAvailable
},enumerable:!1,configurable:!0
}),t.prototype.hold=function(t){
return this._pool.hold(t)
},t.prototype.release=function(t){
return this._pool.release(t)
},t.prototype.tick=function(t){
return this._pool.tick(t)
},t.prototype.holdWait=function(t,e,r,n){
return this._pool.holdWait(t,e,r,n)},t
}(),rt=function(t){function e(e){
var r=t.call(this,"Pool hold(".concat(e,") failed"))||this
;return r.count=e,r}return r(e,t),e}(Error)
;var nt=function(){function t(){this._objects=[]}
return Object.defineProperty(t.prototype,"objects",{
get:function(){return this._objects},
enumerable:!1,configurable:!0
}),Object.defineProperty(t.prototype,"size",{
get:function(){return this._objects.length},
enumerable:!1,configurable:!0
}),t.prototype.get=function(t){
var e=this._objects.length;t>e&&(t=e)
;var r=e-t,n=function(t,e,r){
for(var n=r-e,o=new Array(n),i=0;i<n;i++)o[i]=t[e+i]
;return o}(this._objects,r,r+t)
;return this._objects.length=r,n
},t.prototype.release=function(t,e,r){
null==e&&(e=0),null==r&&(r=t.length)
;for(var n=e;n<r;n++){var o=t[n]
;null!=o&&this._objects.push(o)}},t
}(),ot=function(){function t(t){
var e=t.pool,r=t.availableObjects,n=t.holdObjects,o=t.destroy,i=t.create
;this._allocatePool=new Z(e.maxSize),
this._pool=new $(e,this._allocatePool),this._availableObjects=r||new nt,
this._holdObjects=!0===n?new Set:n||null,
this._create=i,this._destroy=o}
return Object.defineProperty(t.prototype,"pool",{
get:function(){return this._pool},enumerable:!1,
configurable:!0
}),Object.defineProperty(t.prototype,"availableObjects",{
get:function(){
return this._availableObjects.objects},
enumerable:!1,configurable:!0
}),Object.defineProperty(t.prototype,"holdObjects",{
get:function(){return this._holdObjects},
enumerable:!1,configurable:!0
}),t.prototype.get=function(t){
var e=this._availableObjects.get(t)
;if(this._holdObjects&&e)for(var r=0,n=e.length;r<n;r++)this._holdObjects.add(e[r])
;return e},t.prototype.release=function(t,e,r){
return n(this,void 0,void 0,(function(){
var n,i,s,l;return o(this,(function(o){
switch(o.label){case 0:
return null==e&&(e=0),null==r&&(r=t.length),n=r-e,[4,this._pool.release(n)]
;case 1:
if(i=o.sent(),r=Math.min(t.length,i),this._availableObjects.release(t,e,r),
this._holdObjects)for(s=e;s<r;s++)null!=(l=t[s])&&this._holdObjects&&this._holdObjects.delete(l)
;return[2,i]}}))}))},t.prototype.tick=function(t){
return this._pool.tick()
},t.prototype.getWait=function(t,e,r,i){
return n(this,void 0,void 0,(function(){
return o(this,(function(n){switch(n.label){case 0:
return[4,this._pool.holdWait(t,e,r,i)];case 1:
return n.sent(),[2,this.get(t)]}}))}))
},t.prototype.use=function(t,e,r,i,s){
return n(this,void 0,void 0,(function(){
var n,l,c,u,a,h;return o(this,(function(o){
switch(o.label){case 0:
return[4,this.getWait(t,r,i,s)];case 1:
if(n=o.sent(),!this._create)throw new Error("You should specify create function in the constructor")
;n?l=n.length:(n=new Array(t),l=0),u=l,o.label=2
;case 2:return u<t?[4,this._create()]:[3,5]
;case 3:
if(null==(h=o.sent()))throw new Error("create function should return not null object")
;this._holdObjects&&this._holdObjects.add(h),
n[u]=h,o.label=4;case 4:return u++,[3,2];case 5:
return o.trys.push([5,,7,13]),[4,e(n,i)];case 6:
return[2,o.sent()];case 7:
return[4,this.release(n)];case 8:
if(c=o.sent(),!this._destroy)return[3,12]
;u=c,a=n.length,o.label=9;case 9:
return u<a?(h=n[u],[4,this._destroy(h)]):[3,12]
;case 10:o.sent(),o.label=11;case 11:
return u++,[3,9];case 12:return[7];case 13:
return[2]}}))}))
},t.prototype.allocate=function(t){
if(!this._create)throw new Error("You should specify create function in the constructor")
;var e=[],r=this._allocatePool.size-this._availableObjects.size
;if(null!=t&&t<r&&(r=t),
r<0)throw new Error("Unexpected behavior: tryHoldCount < 0")
;var i=this._allocatePool.hold(r)?r:0,s=0,l=this
;function c(t){
return n(this,void 0,void 0,(function(){var e,r,n
;return o(this,(function(o){switch(o.label){
case 0:return o.trys.push([0,2,,4]),[4,t];case 1:
return e=o.sent(),[3,4];case 2:
return r=o.sent(),[4,l._allocatePool.release(1)]
;case 3:throw o.sent(),r;case 4:
return[4,l.release([e])];case 5:
return n=o.sent(),s+=n,[2]}}))}))}function a(t){
return n(this,void 0,void 0,(function(){var e
;return o(this,(function(r){switch(r.label){
case 0:return[4,t];case 1:
return e=r.sent(),s+=e,[2]}}))}))}
for(var h=0;h<i;h++){var f=this._create()
;if(u(f))e.push(c(f));else{var _=this.release([f])
;u(_)&&e.push(a(_))}}
return e.length?p(e).then((function(t){return s
})):s},t}(),it=function(){function t(t){
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
},t.prototype.getWait=function(t,e,r,n){
return this._objectPool.getWait(t,e,r,n)
},t.prototype.release=function(t,e,r){
return this._objectPool.release(t,e,r)
},t.prototype.tick=function(t){
return this._objectPool.tick(t)
},t.prototype.use=function(t,e,r,n,o){
return this._objectPool.use(t,e,r,n,o)},t
}(),st=function(t){function e(e){
var r=e.pool,n=e.time,o=e.timeController,i=t.call(this,r)||this
;return i._time=n,i._timeController=o||l,i}
return r(e,t),Object.defineProperty(e.prototype,"time",{
get:function(){return this._time},enumerable:!1,
configurable:!0}),e.prototype.release=function(t){
return n(this,void 0,void 0,(function(){
return o(this,(function(e){switch(e.label){case 0:
return[4,(r=this._time,n=null,
o=this._timeController,new Promise((function(t){
if(n&&n.aborted)return void c(t,n.reason);let e
;const i=o||l,s=i.setTimeout((function(){
e&&e(),t()}),r);n&&(e=n.subscribe((function(e){
i.clearTimeout(s),c(t,e)})))})))];case 1:
return e.sent(),[2,this._release(t)]}var r,n,o}))
}))},e.prototype._release=function(t){
return this._pool.release(t)},e}(et)
;t.ObjectPool=ot,t.ObjectPoolWrapper=it,t.Pool=Z,
t.PoolHoldError=rt,t.PoolRunner=tt,
t.PoolWrapper=et,t.Pools=$,t.StackPool=nt,t.TimeLimitPool=st,
t.poolRunThrow=function(t,e,r){
return function(t,e,r){return w((function(){
if(!t.hold(e))throw new rt(e)
;return r.apply(this,arguments)}),(function(){
t.release(e)}))}(t,e,r)()
},t.poolRunWait=function(t){
var e=t.pool,r=t.count,i=t.func,s=t.priority,l=t.abortSignal,c=t.awaitPriority
;return n(this,void 0,void 0,(function(){
return o(this,(function(t){return[2,w((function(){
return n(this,void 0,void 0,(function(){var t
;return o(this,(function(n){switch(n.label){
case 0:return[4,e.holdWait(r,s,l,c)];case 1:
return n.sent(),t=new Z(r),[2,i(t,l)]}}))}))
}),(function(){e.release(r)}))()]}))}))
},Object.defineProperty(t,"__esModule",{value:!0})
}({});
