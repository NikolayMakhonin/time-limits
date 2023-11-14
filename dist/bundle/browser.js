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
return new(n||(n=Promise))((function(o,i){
function s(t){try{u(r.next(t))}catch(t){i(t)}}
function l(t){try{u(r.throw(t))}catch(t){i(t)}}
function u(t){var e
;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){
t(e)}))).then(s,l)}u((r=r.apply(t,e||[])).next())
}))}function o(t,e){var n,r,o,i,s={label:0,
sent:function(){if(1&o[0])throw o[1];return o[1]},
trys:[],ops:[]};return i={next:l(0),throw:l(1),
return:l(2)
},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){
return this}),i;function l(i){return function(l){
return function(i){
if(n)throw new TypeError("Generator is already executing.")
;for(;s;)try{
if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),
0):r.next)&&!(o=o.call(r,i[1])).done)return o
;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:
case 1:o=i;break;case 4:return s.label++,{
value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0]
;continue;case 7:i=s.ops.pop(),s.trys.pop()
;continue;default:
if(!(o=s.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){
s=0;continue}
if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){
s.label=i[1];break}if(6===i[0]&&s.label<o[1]){
s.label=o[1],o=i;break}if(o&&s.label<o[2]){
s.label=o[2],s.ops.push(i);break}
o[2]&&s.ops.pop(),s.trys.pop();continue}
i=e.call(t,s)}catch(t){i=[6,t],r=0}finally{n=o=0}
if(5&i[0])throw i[1];return{
value:i[0]?i[1]:void 0,done:!0}}([i,l])}}}
const i=setTimeout,s=clearTimeout,l={
now:function(){return Date.now()},
setTimeout:"undefined"==typeof window?setTimeout:function(){
return i.apply(window,arguments)},
clearTimeout:"undefined"==typeof window?clearTimeout:function(){
return s.apply(window,arguments)}}
;function u(t,e){return t<e}class c{
constructor({objectPool:t,lessThanFunc:e}={}){
this._size=0,this._root=null,this.merge=a,
this.collapse=h,this._objectPool=t,this._lessThanFunc=e||u
}clear(){this._root=null,this._size=0}get size(){
return this._size}add(t){
let e=null!=this._objectPool?this._objectPool.get():null
;return null==e?e={child:null,next:null,prev:null,
item:t
}:e.item=t,this._size++,this._root=a(this._root,e,this._lessThanFunc),e
}getMin(){const{_root:t}=this
;return null==t?void 0:t.item}getMinNode(){
return this._root}deleteMin(){const{_root:t}=this
;if(null==t)return;const e=t.item
;return this.delete(t),e}delete(t){var e
;if(t===this._root)this._root=h(t.child,this._lessThanFunc);else{
if(null==t.prev){
if(this._objectPool)throw new Error("The node is already deleted. Don't use the objectPool to prevent this error.")
;return}
t.prev.child===t?t.prev.child=t.next:t.prev.next=t.next,null!=t.next&&(t.next.prev=t.prev),
this._root=a(this._root,h(t.child,this._lessThanFunc),this._lessThanFunc)
}
t.child=null,t.prev=null,t.next=null,t.item=void 0,null===(e=this._objectPool)||void 0===e||e.release(t),
this._size--}decreaseKey(t){
t!==this._root&&(t.prev.child===t?t.prev.child=t.next:t.prev.next=t.next,
null!=t.next&&(t.next.prev=t.prev),
this._root=a(this._root,t,this._lessThanFunc))}
get isEmpty(){return null==this._root}
[Symbol.iterator](){return this._iterate(!1)}
nodes(){return{
[Symbol.iterator]:()=>this._iterate(!0)}}
_iterate(t){const e=this._lessThanFunc
;return function*n(r){
r&&(t?yield r:yield r.item,r.child&&(null!=r.child.next&&(r.child=h(r.child,e),
r.child.prev=r),yield*n(r.child)))}(this._root)}}
function a(t,e,n){let r,o
;return null==t?e:null==e||t===e?t:(n(e.item,t.item)?(r=e,
o=t):(r=t,o=e),o.next=r.child,
null!=r.child&&(r.child.prev=o),o.prev=r,r.child=o,
r.next=null,r.prev=null,r)}function h(t,e){
let n,r,o,i,s;if(null==t)return null
;for(i=t,n=null;null!=i;){
if(r=i,o=r.next,null==o){r.prev=n,n=r;break}
i=o.next,s=a(r,o,e),s.prev=n,n=s}
for(s=null;null!=n;)i=n.prev,s=a(s,n,e),n=i
;return s}function f(t,e){t(function(t){return{
then(e,n){n(t)}}}(e))}function p(t){
return null!=t&&"object"==typeof t&&"function"==typeof t.then
}let _,d=[];function b(t){
d.push(t),_||(_=function(){
return r(this,void 0,void 0,(function*(){
for(;d.length>0;){yield 0;const t=d
;d=[],t.forEach((t=>{try{t()}catch(t){
console.error("Unhandled promise rejection",t)}}))
}_=null}))}())}function y(t,e){let n,r
;e||(e=Promise);const o=new e(((t,e)=>{n=t,r=e}))
;let i=t.length;const s=[]
;return t.forEach(((t,e)=>{p(t)?t.then((t=>{
s[e]=t,0==--i&&n(s)}),r):(s[e]=t,0==--i&&n(s))
})),o}function v(t,e){let n,r;e||(e=Promise)
;const o=new e(((t,e)=>{n=t,r=e}))
;return t.forEach((t=>{p(t)?t.then(n,r):n(t)})),o}
function g(t,e,n){b((()=>{try{const r=e?e(t):t
;n._resolve(r)}catch(t){n._reject(t)}}))}
function j(t,e,n){b((()=>{if(e)try{const r=e(t)
;n._resolve(r)}catch(t){n._reject(t)
}else n._reject(t)}))}const m=function(){}
;class w{constructor(t){
this.status="pending",this.value=void 0,this.reason=void 0,
this._handlers=null
;const e=this._resolve,n=this._reject,r=this._resolveAsync,o=this._rejectAsync,i=this
;this._resolve=function(t){e.call(i,t)
},this._reject=function(t){n.call(i,t)
},this._resolveAsync=function(t){r.call(i,t)
},this._rejectAsync=function(t){o.call(i,t)
},t(this._resolve,this._reject)}_resolve(t){
"pending"===this.status&&(this.status="fulfilled",
this._resolveAsync(t))}_resolveAsync(t){
p(t)?t.then(this._resolveAsync,this._rejectAsync):this._resolveSync(t)
}_resolveSync(t){const e=this._handlers
;if(this.value=t,null!=e){this._handlers=null
;for(let n=0,r=e.length;n<r;n++){const[r,,o]=e[n]
;g(t,r,o)}}}_reject(t){
"pending"===this.status&&this._rejectAsync(t)}
_rejectAsync(t){
this.status="rejected",p(t)?t.then(this._rejectAsync,this._rejectAsync):this._rejectSync(t)
}_rejectSync(t){const e=this._handlers
;if(this.reason=t,null!=e){this._handlers=null
;for(let n=0,r=e.length;n<r;n++){const[,r,o]=e[n]
;j(t,r,o)}}}then(t,e){const n=new w(m)
;return"pending"===this.status?(null==this._handlers&&(this._handlers=[]),
this._handlers.push([t,e,n])):"fulfilled"===this.status?g(this.value,t,n):j(this.reason,e,n),
n}catch(t){return this.then(void 0,t)}finally(t){
const e=t&&function(e){const n=t()
;return p(n)?n.then((()=>e)):w.resolve(e)
},n=t&&function(e){const n=t()
;return p(n)?n.then((()=>w.reject(e))):w.reject(e)
};return this.then(e,n)}static resolve(t){
const e=new w(m);return e._resolve(t),e}
static reject(t){const e=new w(m)
;return e._reject(t),e}get[Symbol.toStringTag](){
return"Promise"}static get[Symbol.species](){
return w}static all(t){return y(t,w)}
static allSettled(t){return function(t,e){let n
;e||(e=Promise);const r=new e(((t,e)=>{n=t}))
;let o=t.length;const i=[]
;return t.forEach(((t,e)=>{p(t)?t.then((t=>{i[e]={
status:"fulfilled",value:t},0==--o&&n(i)}),(t=>{
i[e]={status:"rejected",reason:t},0==--o&&n(i)
})):(i[e]={status:"fulfilled",value:t
},0==--o&&n(i))})),r}(t,w)}static any(t){
return function(t,e){let n,r;e||(e=Promise)
;const o=new e(((t,e)=>{n=t,r=e}));let i=t.length
;const s=[];return t.forEach(((t,e)=>{
p(t)?t.then(n,(t=>{
s[e]=t,0==--i&&r(new AggregateError(s))})):n(t)
})),o}(t,w)}static race(t){return v(t,w)}}
const P=function(){};class z{constructor(t){
if(this._status="pending",t&&t.aborted)this.promise=w.reject(t.reason),
this.resolve=P,this.reject=P;else{let e,n
;if(this.promise=new Promise((function(t){
e=t,n=function(e){f(t,e)}})),t){
const r=t.subscribe((function(t){n(t)}))
;this.resolve=function(t){r(),e(t)
},this.reject=function(t){r(),n(t)}
}else this.resolve=e,this.reject=n}
this.promise.then((()=>{this._status="resolved"
}),(()=>{this._status="rejected"}))}get state(){
return this._status}}function O(t,e){
return e?t.then((t=>(e(),t)),(t=>{throw e(),t})):t
}function x(t,e){return e?function(){try{
const n=t.apply(this,arguments)
;return p(n)?O(n,e):(e(),n)}catch(t){throw e(),t}
}:t}class S{constructor(t,e){
this._branch=null,this.order=t,this.parent=e}
get branch(){if(!this._branch){
const t=[this.order];let e=this.parent
;for(;null!=e;)t.push(e.order),e=e.parent
;this._branch=t}return this._branch}}
function T(t,e){return function(t,e){
const n=t&&t.branch,r=e&&e.branch,o=n?n.length:0,i=r?r.length:0,s=o>i?o:i
;for(let t=0;t<s;t++){
const e=t>=o?0:n[o-1-t],s=t>=i?0:r[i-1-t]
;if(e!==s)return e>s?1:-1}return 0
}(t.priority,e.priority)<0}let k=1;class A{
constructor(){this._queue=new c({lessThanFunc:T})}
run(t,e,n){return this._run(!1,t,e,n)}
runTask(t,e,n){return this._run(!0,t,e,n)}
_run(t,e,n,r){const o=new z(r),i={
priority:(s=k++,l=n,null==s?null==l?null:l:new S(s,l)),
func:e,abortSignal:r,resolve:o.resolve,
reject:o.reject,readyToRun:!t};var s,l
;if(this._queue.add(i),t){const t=this;return{
result:o.promise,setReadyToRun(e){
i.readyToRun=e,e&&!t._inProcess&&(t._inProcess=!0,
t._process())}}}
return this._inProcess||(this._inProcess=!0,this._process()),o.promise
}_process(){
return r(this,void 0,void 0,(function*(){
const t=this._queue;for(;;){if(yield 0,t.isEmpty){
this._inProcess=!1;break}let e=t.getMin()
;if(e.readyToRun)t.deleteMin();else{let n
;for(const e of t.nodes())if(e.item.readyToRun){
n=e;break}if(!n){this._inProcess=!1;break}
e=n.item,t.delete(n)}
if(e.abortSignal&&e.abortSignal.aborted)e.reject(e.abortSignal.reason);else try{
let t=e.func&&e.func(e.abortSignal)
;t&&"function"==typeof t.then&&(t=yield t),e.resolve(t)
}catch(t){e.reject(t)}}}))}}const E=function(){
const t=new A;return function(e,n){
return t.run(void 0,e,n)}}();var W=function(){
function t(t){
if(this._maxSize=0,this._size=0,this._tickPromise=new z,!t)throw new Error("maxSize should be > 0")
;this._maxSize=t,
this._size=t,this._priorityQueue=new A}
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
var e=this._size,n=this.maxSize-e
;if(t>n&&(t=n),t>0&&(this._size=e+t,this._tickPromise)){
var r=this._tickPromise
;this._tickPromise=null,r.resolve()}return t
},t.prototype.tick=function(t){
if(!(this._size>0))return this._tickPromise||(this._tickPromise=new z),
function(t,e){return t?new Promise((function(n){
if(t&&t.aborted)return void f(n,t.reason);let r,o
;function i(t){o||(o=!0,r&&r(),f(n,t))}
e.then((function(t){r&&r(),n(t)
})).catch(i),t&&(r=t.subscribe(i))})):e
}(t,this._tickPromise.promise)
},t.prototype.holdWait=function(t,e,n,i){
var s=this
;if(t>this.maxSize)throw new Error("holdCount (".concat(t," > maxSize (").concat(this.maxSize,"))"))
;return i||(i=E),
this._priorityQueue.run((function(n){
return r(s,void 0,void 0,(function(){
return o(this,(function(r){switch(r.label){case 0:
return t>this._size?[4,this.tick(n)]:[3,3];case 1:
return r.sent(),[4,i(e,n)];case 2:
return r.sent(),[3,0];case 3:
if(!this.hold(t))throw new Error("Unexpected behavior")
;return[2]}}))}))}),e,n)},t}(),F=function(){
function t(){
for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
;if(!(null==t?void 0:t.length))throw new Error("pools should not be empty")
;this._pools=t,this._priorityQueue=new A}
return Object.defineProperty(t.prototype,"maxSize",{
get:function(){
for(var t,e=this._pools,n=0,r=e.length;n<r;n++){
var o=e[n].maxSize;(0===n||o<t)&&(t=o)}return t},
enumerable:!1,configurable:!0
}),Object.defineProperty(t.prototype,"size",{
get:function(){
for(var t,e=this._pools,n=0,r=e.length;n<r;n++){
var o=e[n].size;(0===n||o<t)&&(t=o)}return t},
enumerable:!1,configurable:!0
}),Object.defineProperty(t.prototype,"holdAvailable",{
get:function(){return this.size},enumerable:!1,
configurable:!0}),t.prototype.hold=function(t){
if(t>this.size)return!1
;for(var e=this._pools,n=0,r=e.length;n<r;n++)e[n].hold(t)
;return!0
},Object.defineProperty(t.prototype,"releaseAvailable",{
get:function(){return this.maxSize-this.size},
enumerable:!1,configurable:!0
}),t.prototype.release=function(t){
var e=this.size,n=this.maxSize-e
;if(t>n&&(t=n),t>0){
for(var r=this._pools,o=null,i=0,s=r.length;i<s;i++){
var l=r[i].release(t);p(l)&&(o?o.push(l):o=[l])}
if(o)return y(o).then((function(){return t}))}
return t},t.prototype.tick=function(t){
for(var e,n=0,r=this._pools.length;n<r;n++){
var o=this._pools[n].tick(t)
;o&&(e?e.push(o):e=[o])}return e?v(e):null
},t.prototype.holdWait=function(t,e,n,i){
return r(this,void 0,void 0,(function(){var s=this
;return o(this,(function(l){switch(l.label){
case 0:
if(t>this.maxSize)throw new Error("holdCount (".concat(t," > maxSize (").concat(this.maxSize,"))"))
;return i||(i=E),
[4,this._priorityQueue.run((function(n){
return r(s,void 0,void 0,(function(){
return o(this,(function(r){switch(r.label){case 0:
return t>this.size?[4,this.tick(n)]:[3,4];case 1:
return r.sent(),i?[4,i(e,n)]:[3,3];case 2:
r.sent(),r.label=3;case 3:return[3,0];case 4:
if(!this.hold(t))throw new Error("Unexpected behavior")
;return[2]}}))}))}),e,n)];case 1:
return l.sent(),[2]}}))}))},t}(),R=function(){
function t(t){this._pool=t}
return Object.defineProperty(t.prototype,"pool",{
get:function(){return this._pool},enumerable:!1,
configurable:!0
}),t.prototype.run=function(t,e,n,i,s){
return r(this,void 0,void 0,(function(){
return o(this,(function(r){switch(r.label){case 0:
return[4,this._pool.holdWait(t,n,i,s)];case 1:
r.sent(),r.label=2;case 2:
return r.trys.push([2,,4,5]),[4,e(i)];case 3:
return[2,r.sent()];case 4:
return this._pool.release(t),[7];case 5:return[2]}
}))}))},t}(),C=function(){function t(t){
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
},t.prototype.holdWait=function(t,e,n,r){
return this._pool.holdWait(t,e,n,r)},t
}(),M=function(t){function e(e){
var n=t.call(this,"Pool hold(".concat(e,") failed"))||this
;return n.count=e,n}return n(e,t),e}(Error)
;var Q=function(){function t(){this._objects=[]}
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
}(),U=function(){function t(t){
var e=t.pool,n=t.availableObjects,r=t.holdObjects,o=t.destroy,i=t.create
;this._allocatePool=new W(e.maxSize),
this._pool=new F(e,this._allocatePool),this._availableObjects=n||new Q,
this._holdObjects=!0===r?new Set:r||null,
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
;if(this._holdObjects&&e)for(var n=0,r=e.length;n<r;n++)this._holdObjects.add(e[n])
;return e},t.prototype.release=function(t,e,n){
return r(this,void 0,void 0,(function(){
var r,i,s,l;return o(this,(function(o){
switch(o.label){case 0:
return null==e&&(e=0),null==n&&(n=t.length),r=n-e,[4,this._pool.release(r)]
;case 1:
if(i=o.sent(),n=Math.min(t.length,i),this._availableObjects.release(t,e,n),
this._holdObjects)for(s=e;s<n;s++)null!=(l=t[s])&&this._holdObjects&&this._holdObjects.delete(l)
;return[2,i]}}))}))},t.prototype.tick=function(t){
return this._pool.tick()
},t.prototype.getWait=function(t,e,n,i){
return r(this,void 0,void 0,(function(){
return o(this,(function(r){switch(r.label){case 0:
return[4,this._pool.holdWait(t,e,n,i)];case 1:
return r.sent(),[2,this.get(t)]}}))}))
},t.prototype.use=function(t,e,n,i,s){
return r(this,void 0,void 0,(function(){
var r,l,u,c,a,h;return o(this,(function(o){
switch(o.label){case 0:
return[4,this.getWait(t,n,i,s)];case 1:
if(r=o.sent(),!this._create)throw new Error("You should specify create function in the constructor")
;r?l=r.length:(r=new Array(t),l=0),c=l,o.label=2
;case 2:return c<t?[4,this._create()]:[3,5]
;case 3:
if(null==(h=o.sent()))throw new Error("create function should return not null object")
;this._holdObjects&&this._holdObjects.add(h),
r[c]=h,o.label=4;case 4:return c++,[3,2];case 5:
return o.trys.push([5,,7,13]),[4,e(r,i)];case 6:
return[2,o.sent()];case 7:
return[4,this.release(r)];case 8:
if(u=o.sent(),!this._destroy)return[3,12]
;c=u,a=r.length,o.label=9;case 9:
return c<a?(h=r[c],[4,this._destroy(h)]):[3,12]
;case 10:o.sent(),o.label=11;case 11:
return c++,[3,9];case 12:return[7];case 13:
return[2]}}))}))
},t.prototype.allocate=function(t){
if(!this._create)throw new Error("You should specify create function in the constructor")
;var e=[],n=this._allocatePool.size-this._availableObjects.size
;if(null!=t&&t<n&&(n=t),
n<0)throw new Error("Unexpected behavior: tryHoldCount < 0")
;var i=this._allocatePool.hold(n)?n:0,s=0,l=this
;function u(t){
return r(this,void 0,void 0,(function(){var e,n,r
;return o(this,(function(o){switch(o.label){
case 0:return o.trys.push([0,2,,4]),[4,t];case 1:
return e=o.sent(),[3,4];case 2:
return n=o.sent(),[4,l._allocatePool.release(1)]
;case 3:throw o.sent(),n;case 4:
return[4,l.release([e])];case 5:
return r=o.sent(),s+=r,[2]}}))}))}function c(t){
return r(this,void 0,void 0,(function(){var e
;return o(this,(function(n){switch(n.label){
case 0:return[4,t];case 1:
return e=n.sent(),s+=e,[2]}}))}))}
for(var a=0;a<i;a++){var h=this._create()
;if(p(h))e.push(u(h));else{var f=this.release([h])
;p(f)&&e.push(c(f))}}
return e.length?y(e).then((function(t){return s
})):s},t}(),q=function(){function t(t){
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
}(),D=function(t){function e(e){
var n=e.pool,r=e.time,o=e.timeController,i=t.call(this,n)||this
;return i._time=r,i._timeController=o||l,i}
return n(e,t),Object.defineProperty(e.prototype,"time",{
get:function(){return this._time},enumerable:!1,
configurable:!0}),e.prototype.release=function(t){
return r(this,void 0,void 0,(function(){
return o(this,(function(e){switch(e.label){case 0:
return[4,(n=this._time,r=null,
o=this._timeController,new Promise((function(t){
if(r&&r.aborted)return void f(t,r.reason);let e
;const i=o||l,s=i.setTimeout((function(){
e&&e(),t()}),n);r&&(e=r.subscribe((function(e){
i.clearTimeout(s),f(t,e)})))})))];case 1:
return e.sent(),[2,this._release(t)]}var n,r,o}))
}))},e.prototype._release=function(t){
return this._pool.release(t)},e}(C)
;t.ObjectPool=U,t.ObjectPoolWrapper=q,t.Pool=W,
t.PoolHoldError=M,t.PoolRunner=R,
t.PoolWrapper=C,t.Pools=F,t.StackPool=Q,t.TimeLimitPool=D,
t.poolRunThrow=function(t,e,n){
return function(t,e,n){return x((function(){
if(!t.hold(e))throw new M(e)
;return n.apply(this,arguments)}),(function(){
t.release(e)}))}(t,e,n)()
},t.poolRunWait=function(t){
var e=t.pool,n=t.count,i=t.func,s=t.priority,l=t.abortSignal,u=t.awaitPriority
;return r(this,void 0,void 0,(function(){
return o(this,(function(t){return[2,x((function(){
return r(this,void 0,void 0,(function(){var t
;return o(this,(function(r){switch(r.label){
case 0:return[4,e.holdWait(n,s,l,u)];case 1:
return r.sent(),t=new W(n),[2,i(t,l)]}}))}))
}),(function(){e.release(n)}))()]}))}))
},Object.defineProperty(t,"__esModule",{value:!0})
}({});
