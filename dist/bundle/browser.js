!function(t){"use strict";var e=function(t,r){
return e=Object.setPrototypeOf||{__proto__:[]
}instanceof Array&&function(t,e){t.__proto__=e
}||function(t,e){
for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])
},e(t,r)};function r(t,e,r,n){
return new(r||(r=Promise))((function(o,i){
function s(t){try{l(n.next(t))}catch(t){i(t)}}
function c(t){try{l(n.throw(t))}catch(t){i(t)}}
function l(t){var e
;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){
t(e)}))).then(s,c)}l((n=n.apply(t,e||[])).next())
}))}function n(t,e){var r,n,o,i,s={label:0,
sent:function(){if(1&o[0])throw o[1];return o[1]},
trys:[],ops:[]};return i={next:c(0),throw:c(1),
return:c(2)
},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){
return this}),i;function c(i){return function(c){
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
value:i[0]?i[1]:void 0,done:!0}}([i,c])}}}
const o=setTimeout,i=clearTimeout,s={
now:function(){return Date.now()},
setTimeout:"undefined"==typeof window?setTimeout:function(){
return o.apply(window,arguments)},
clearTimeout:"undefined"==typeof window?clearTimeout:function(){
return i.apply(window,arguments)}}
;function c(t,e){t(function(t){return{then(e,r){
r(t)}}}(e))}function l(t){
return null!=t&&"object"==typeof t&&"function"==typeof t.then
}function a(t,e,r){try{const n=e?e(t):t
;r._resolve(n)}catch(t){r._reject(t)}}
function u(t,e,r){e||r._reject(t);try{const n=e(t)
;r._resolve(n)}catch(t){r._reject(t)}}
const h=function(){};class f{constructor(t){
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
l(t)?t.then(this._resolveAsync,this._rejectAsync):this._resolveSync(t)
}_resolveSync(t){const e=this._handlers
;if(this.value=t,null!=e){this._handlers=null
;for(let r=0,n=e.length;r<n;r++){const[n,,o]=e[r]
;a(t,n,o)}}}_reject(t){
"pending"===this.status&&this._rejectAsync(t)}
_rejectAsync(t){
this.status="rejected",l(t)?t.then(this._rejectAsync,this._rejectAsync):this._rejectSync(t)
}_rejectSync(t){const e=this._handlers
;if(this.reason=t,null!=e){this._handlers=null
;for(let r=0,n=e.length;r<n;r++){const[,n,o]=e[r]
;u(t,n,o)}}}then(t,e){const r=new f(h)
;return"pending"===this.status?(null==this._handlers&&(this._handlers=[]),
this._handlers.push([t,e,r])):"fulfilled"===this.status?a(this.value,t,r):u(this.reason,e,r),
r}catch(t){return this.then(void 0,t)}finally(t){
const e=t&&function(e){return t(),e
},r=t&&function(e){throw t(),e}
;return this.then(e,r)}static resolve(t){
const e=new f(h);return e._resolve(t),e}
static reject(t){const e=new f(h)
;return e._reject(t),e}get[Symbol.toStringTag](){
return"Promise"}}const b=function(){};class p{
constructor(t){
if(t&&t.aborted)this.promise=f.reject(t.reason),this.resolve=b,this.reject=b;else{
let e,r;if(this.promise=new Promise((function(t){
e=t,r=function(e){c(t,e)}})),t){
const n=t.subscribe((function(t){r(t)}))
;this.resolve=function(t){n(),e(t)
},this.reject=function(t){n(),r(t)}
}else this.resolve=e,this.reject=r}}}
var _={},d={},y={}
;Object.defineProperty(y,"__esModule",{value:!0})
;class v extends Error{constructor(t,e){
super(t),Object.setPrototypeOf(this,v.prototype),
this.reason=e,this.name="AbortError",
this._internal=!1}}
y.AbortError=v,Object.defineProperty(d,"__esModule",{
value:!0});var g=y
;d.toAbortController=function(t,e){
return t.signal.subscribe((t=>{
t instanceof g.AbortError&&t._internal&&(t=t.reason),
e.abort(t)})),e
},d.toAbortControllerFast=function(t,e){
return t.signal.addEventListener("abort",(function(){
e.abort(this.reason)})),e
},d.toAbortSignal=function(t,e){
return t.subscribe((t=>{e.abort(t)})),e.signal
},d.toAbortSignalFast=function(t,e){
return t.addEventListener("abort",(function(t){
e.abort(t)})),e.signal};var j={},m={}
;Object.defineProperty(m,"__esModule",{value:!0})
;const w=()=>{};m.AbortSignalFast=class{
constructor(){
this.aborted=!1,this.reason=void 0,this._callbacks=void 0
}subscribe(t){var e
;if(null===(e=this._callbacks)||void 0===e?void 0:e.has(t))throw new Error("Already subscribed: "+t)
;return this.aborted?(t.call(this,this.reason),
w):(this._callbacks||(this._callbacks=new Set),
this._callbacks.add(t),()=>{var e
;null===(e=this._callbacks)||void 0===e||e.delete(t)
})}abort(t){var e
;this.aborted=!0,this.reason=t,null===(e=this._callbacks)||void 0===e||e.forEach((t=>{
t.call(this,this.reason)})),this._callbacks=void 0
}throwIfAborted(){
if(this.aborted)throw this.reason}
},Object.defineProperty(j,"__esModule",{value:!0})
;var P=m,O=y;j.AbortControllerFast=class{
constructor(){this.signal=new P.AbortSignalFast}
abort(t){
this.signal.aborted||(void 0===t&&((t=new O.AbortError("Aborted with no reason",t))._internal=!0),
this.signal.abort(t))}
},Object.defineProperty(_,"__esModule",{value:!0})
;var A=d,z=j,S=y
;_.toAbortController=A.toAbortController,_.toAbortControllerFast=A.toAbortControllerFast,
_.toAbortSignal=A.toAbortSignal,
_.toAbortSignalFast=A.toAbortSignalFast,_.AbortControllerFast=z.AbortControllerFast,
_.AbortError=S.AbortError;var k=function(){
function t(t){var e=this
;if(this._maxSize=0,this._size=0,this._tickPromise=new p,
!t)throw new Error("maxSize should be > 0")
;this._maxSize=t,this._size=t,this._tickFunc=function(t){
return e.tick(t)}}
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
return this._tickPromise||(this._tickPromise=new p),
function(t,e){return new Promise((function(r){
if(t&&t.aborted)return void c(r,t.reason);let n,o
;function i(t){o||(o=!0,n&&n(),c(r,t))}
e.then((function(t){n&&n(),r(t)
})).catch(i),t&&(n=t.subscribe(i))}))
}(t,this._tickPromise.promise)
},t.prototype.holdWait=function(t,e,o,i){
return r(this,void 0,void 0,(function(){
return n(this,(function(r){switch(r.label){case 0:
if(t>this.maxSize)throw new Error("holdCount (".concat(t," > maxSize (").concat(this.maxSize,"))"))
;return o?[4,o.run(null,i,e)]:[3,2];case 1:
r.sent(),r.label=2;case 2:
return t>this._size?o?[4,o.run(this._tickFunc,i,e)]:[3,4]:[3,7]
;case 3:return r.sent(),[3,6];case 4:
return[4,this.tick(e)];case 5:r.sent(),r.label=6
;case 6:return[3,2];case 7:
if(!this.hold(t))throw new Error("Unexpected behavior")
;return[2]}}))}))},t}(),x=function(){function t(){
for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
;var r=this
;if(!(null==t?void 0:t.length))throw new Error("pools should not be empty")
;this._pools=t,this._tickFunc=function(t){
return r.tick(t)}}
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
var c=n[i].release(t);l(c)&&(o?o.push(c):o=[c])}
if(o)return Promise.all(o).then((function(){
return t}))}return t
},t.prototype.tick=function(t){
return Promise.race(this._pools.map((function(e){
return e.tick(t)})))
},t.prototype.holdWait=function(t,e,o,i){
return r(this,void 0,void 0,(function(){
return n(this,(function(r){switch(r.label){case 0:
if(t>this.maxSize)throw new Error("holdCount (".concat(t," > maxSize (").concat(this.maxSize,"))"))
;return o?[4,o.run(null,i,e)]:[3,2];case 1:
r.sent(),r.label=2;case 2:
return t>this.size?o?[4,o.run(this._tickFunc,i,e)]:[3,4]:[3,7]
;case 3:return r.sent(),[3,6];case 4:
return[4,this.tick(e)];case 5:r.sent(),r.label=6
;case 6:return[3,2];case 7:
if(!this.hold(t))throw new Error("Unexpected behavior")
;return[2]}}))}))},t}(),E=function(){
function t(t){this._pool=t}
return Object.defineProperty(t.prototype,"pool",{
get:function(){return this._pool},enumerable:!1,
configurable:!0
}),t.prototype.run=function(t,e,o,i,s){
return r(this,void 0,void 0,(function(){
return n(this,(function(r){switch(r.label){case 0:
return[4,this._pool.holdWait(t,o,i,s)];case 1:
r.sent(),r.label=2;case 2:
return r.trys.push([2,,4,5]),[4,e(o)];case 3:
return[2,r.sent()];case 4:
return this._pool.release(1),[7];case 5:return[2]}
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
},t.prototype.holdWait=function(t,e,r,n){
return this._pool.holdWait(t,e,r,n)},t}()
;var F=function(){function t(){this._objects=[]}
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
}(),T=function(){function t(t){
var e=t.pool,r=t.availableObjects,n=t.holdObjects,o=t.destroy,i=t.create
;this._allocatePool=new k(e.maxSize),
this._pool=new x(e,this._allocatePool),this._availableObjects=r||new F,
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
;return e},t.prototype.release=function(t,e,o){
return r(this,void 0,void 0,(function(){
var r,i,s,c;return n(this,(function(n){
switch(n.label){case 0:
return null==e&&(e=0),null==o&&(o=t.length),r=o-e,[4,this._pool.release(r)]
;case 1:
if(i=n.sent(),o=Math.min(t.length,i),this._availableObjects.release(t,e,o),
this._holdObjects)for(s=e;s<o;s++)null!=(c=t[s])&&this._holdObjects&&this._holdObjects.delete(c)
;return[2,i]}}))}))},t.prototype.tick=function(t){
return this._pool.tick()
},t.prototype.getWait=function(t,e,o,i){
return r(this,void 0,void 0,(function(){
return n(this,(function(r){switch(r.label){case 0:
return[4,this._pool.holdWait(t,e,o,i)];case 1:
return r.sent(),[2,this.get(t)]}}))}))
},t.prototype.use=function(t,e,o,i,s){
return r(this,void 0,void 0,(function(){
var r,c,l,a,u,h;return n(this,(function(n){
switch(n.label){case 0:
return[4,this.getWait(t,o,i,s)];case 1:
if(r=n.sent(),!this._create)throw new Error("You should specify create function in the constructor")
;r?c=r.length:(r=new Array(t),c=0),a=c,n.label=2
;case 2:return a<t?[4,this._create()]:[3,5]
;case 3:
if(null==(h=n.sent()))throw new Error("create function should return not null object")
;this._holdObjects&&this._holdObjects.add(h),
r[a]=h,n.label=4;case 4:return a++,[3,2];case 5:
return n.trys.push([5,,7,13]),[4,e(r,o)];case 6:
return[2,n.sent()];case 7:
return[4,this.release(r)];case 8:
if(l=n.sent(),!this._destroy)return[3,12]
;a=l,u=r.length,n.label=9;case 9:
return a<u?(h=r[a],[4,this._destroy(h)]):[3,12]
;case 10:n.sent(),n.label=11;case 11:
return a++,[3,9];case 12:return[7];case 13:
return[2]}}))}))
},t.prototype.allocate=function(t){
if(!this._create)throw new Error("You should specify create function in the constructor")
;var e=[],o=this._allocatePool.size-this._availableObjects.size
;if(null!=t&&t<o&&(o=t),
o<0)throw new Error("Unexpected behavior: tryHoldCount < 0")
;var i=this._allocatePool.hold(o)?o:0,s=0,c=this
;function a(t){
return r(this,void 0,void 0,(function(){var e,r,o
;return n(this,(function(n){switch(n.label){
case 0:return n.trys.push([0,2,,4]),[4,t];case 1:
return e=n.sent(),[3,4];case 2:
return r=n.sent(),[4,c._allocatePool.release(1)]
;case 3:throw n.sent(),r;case 4:
return[4,c.release([e])];case 5:
return o=n.sent(),s+=o,[2]}}))}))}function u(t){
return r(this,void 0,void 0,(function(){var e
;return n(this,(function(r){switch(r.label){
case 0:return[4,t];case 1:
return e=r.sent(),s+=e,[2]}}))}))}
for(var h=0;h<i;h++){var f=this._create()
;if(l(f))e.push(a(f));else{var b=this.release([f])
;l(b)&&e.push(u(b))}}
return e.length?Promise.all(e).then((function(t){
return s})):s},t}(),W=function(){function t(t){
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
},t.prototype.getWait=function(t,e){
return this._objectPool.getWait(t,e)
},t.prototype.release=function(t,e,r){
return this._objectPool.release(t,e,r)
},t.prototype.tick=function(t){
return this._objectPool.tick(t)
},t.prototype.use=function(t,e,r,n,o){
return this._objectPool.use(t,e,r,n,o)},t
}(),M=function(t){function o(e){
var r=e.pool,n=e.time,o=e.timeController,i=t.call(this,r)||this
;return i._time=n,i._timeController=o||s,i}
return function(t,r){
if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null")
;function n(){this.constructor=t}
e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,
new n)
}(o,t),Object.defineProperty(o.prototype,"time",{
get:function(){return this._time},enumerable:!1,
configurable:!0}),o.prototype.release=function(t){
return r(this,void 0,void 0,(function(){
return n(this,(function(e){switch(e.label){case 0:
return[4,(r=this._time,n=null,
o=this._timeController,new Promise((function(t){
if(n&&n.aborted)return void c(t,n.reason);let e
;const i=o||s,l=i.setTimeout((function(){
e&&e(),t()}),r);n&&(e=n.subscribe((function(e){
i.clearTimeout(l),c(t,e)})))})))];case 1:
return e.sent(),[2,this._release(t)]}var r,n,o}))
}))},o.prototype._release=function(t){
return this._pool.release(t)},o}(C)
;t.ObjectPool=T,t.ObjectPoolWrapper=W,t.Pool=k,
t.PoolRunner=E,t.PoolWrapper=C,t.Pools=x,
t.StackPool=F,t.TimeLimitPool=M,Object.defineProperty(t,"__esModule",{
value:!0})}({});
