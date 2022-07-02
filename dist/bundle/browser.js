!function(t){"use strict";function e(t,e,r,i){
return new(r||(r=Promise))((function(n,o){
function s(t){try{u(i.next(t))}catch(t){o(t)}}
function c(t){try{u(i.throw(t))}catch(t){o(t)}}
function u(t){var e
;t.done?n(t.value):(e=t.value,e instanceof r?e:new r((function(t){
t(e)}))).then(s,c)}u((i=i.apply(t,e||[])).next())
}))}function r(t,e){var r,i,n,o,s={label:0,
sent:function(){if(1&n[0])throw n[1];return n[1]},
trys:[],ops:[]};return o={next:c(0),throw:c(1),
return:c(2)
},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){
return this}),o;function c(o){return function(c){
return function(o){
if(r)throw new TypeError("Generator is already executing.")
;for(;s;)try{
if(r=1,i&&(n=2&o[0]?i.return:o[0]?i.throw||((n=i.return)&&n.call(i),
0):i.next)&&!(n=n.call(i,o[1])).done)return n
;switch(i=0,n&&(o=[2&o[0],n.value]),o[0]){case 0:
case 1:n=o;break;case 4:return s.label++,{
value:o[1],done:!1};case 5:s.label++,i=o[1],o=[0]
;continue;case 7:o=s.ops.pop(),s.trys.pop()
;continue;default:
if(!(n=s.trys,(n=n.length>0&&n[n.length-1])||6!==o[0]&&2!==o[0])){
s=0;continue}
if(3===o[0]&&(!n||o[1]>n[0]&&o[1]<n[3])){
s.label=o[1];break}if(6===o[0]&&s.label<n[1]){
s.label=n[1],n=o;break}if(n&&s.label<n[2]){
s.label=n[2],s.ops.push(o);break}
n[2]&&s.ops.pop(),s.trys.pop();continue}
o=e.call(t,s)}catch(t){o=[6,t],i=0}finally{r=n=0}
if(5&o[0])throw o[1];return{
value:o[0]?o[1]:void 0,done:!0}}([o,c])}}}
const i=setTimeout,n=clearTimeout,o={
now:function(){return Date.now()},
setTimeout:"undefined"==typeof window?setTimeout:function(){
return i.apply(window,arguments)},
clearTimeout:"undefined"==typeof window?clearTimeout:function(){
return n.apply(window,arguments)}};function s(t){
return null!=t&&"object"==typeof t&&"function"==typeof t.then
}function c(t,e,r){try{const i=e?e(t):t
;r._resolve(i)}catch(t){r._reject(t)}}
function u(t,e,r){e||r._reject(t);try{const i=e(t)
;r._resolve(i)}catch(t){r._reject(t)}}
const a=function(){};class l{constructor(t){
this.status="pending",this.value=void 0,
this.reason=void 0,this._handlers=null
;const e=this._resolve,r=this._reject,i=this._resolveAsync,n=this._rejectAsync,o=this
;this._resolve=function(t){e.call(o,t)
},this._reject=function(t){r.call(o,t)
},this._resolveAsync=function(t){i.call(o,t)
},this._rejectAsync=function(t){n.call(o,t)
},t(this._resolve,this._reject)}_resolve(t){
"pending"===this.status&&(this.status="fulfilled",
this._resolveAsync(t))}_resolveAsync(t){
s(t)?t.then(this._resolveAsync,this._rejectAsync):this._resolveSync(t)
}_resolveSync(t){const e=this._handlers
;if(this.value=t,null!=e){this._handlers=null
;for(let r=0,i=e.length;r<i;r++){const[i,,n]=e[r]
;c(t,i,n)}}}_reject(t){
"pending"===this.status&&this._rejectAsync(t)}
_rejectAsync(t){
this.status="rejected",s(t)?t.then(this._rejectAsync,this._rejectAsync):this._rejectSync(t)
}_rejectSync(t){const e=this._handlers
;if(this.reason=t,null!=e){this._handlers=null
;for(let r=0,i=e.length;r<i;r++){const[,i,n]=e[r]
;u(t,i,n)}}}then(t,e){const r=new l(a)
;return"pending"===this.status?(null==this._handlers&&(this._handlers=[]),
this._handlers.push([t,e,r])):"fulfilled"===this.status?c(this.value,t,r):u(this.reason,e,r),
r}catch(t){return this.then(void 0,t)}finally(t){
const e=t&&function(e){return t(),e
},r=t&&function(e){throw t(),e}
;return this.then(e,r)}static resolve(t){
const e=new l(a);return e._resolve(t),e}
static reject(t){const e=new l(a)
;return e._reject(t),e}get[Symbol.toStringTag](){
return"Promise"}}const h=function(){};class f{
constructor(t){
if(t&&t.aborted)this.promise=l.reject(t.reason),this.resolve=h,this.reject=h;else{
let e,r
;if(this.promise=new Promise((function(t,i){
e=t,r=function(e){!function(t,e){t(function(t){
return{then(e,r){r(t)}}}(e))}(t,e)}})),t){
const i=t.subscribe((function(t){r(t)}))
;this.resolve=function(t){i(),e(t)
},this.reject=function(t){i(),r(t)}
}else this.resolve=e,this.reject=r}}}
var _={},b={},p={}
;Object.defineProperty(p,"__esModule",{value:!0})
;class d extends Error{constructor(t,e){
super(t),Object.setPrototypeOf(this,d.prototype),
this.reason=e,this.name="AbortError",
this._internal=!1}}
p.AbortError=d,Object.defineProperty(b,"__esModule",{
value:!0});var y=p
;b.toAbortController=function(t,e){
return t.signal.subscribe((t=>{
t instanceof y.AbortError&&t._internal&&(t=t.reason),
e.abort(t)})),e
},b.toAbortControllerFast=function(t,e){
return t.signal.addEventListener("abort",(function(){
e.abort(this.reason)})),e
},b.toAbortSignal=function(t,e){
return t.subscribe((t=>{e.abort(t)})),e.signal
},b.toAbortSignalFast=function(t,e){
return t.addEventListener("abort",(function(t){
e.abort(t)})),e.signal};var v={},m={}
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
},Object.defineProperty(v,"__esModule",{value:!0})
;var A=m,g=p;v.AbortControllerFast=class{
constructor(){this.signal=new A.AbortSignalFast}
abort(t){
this.signal.aborted||(void 0===t&&((t=new g.AbortError("Aborted with no reason",t))._internal=!0),
this.signal.abort(t))}
},Object.defineProperty(_,"__esModule",{value:!0})
;var j=b,k=v,S=p
;_.toAbortController=j.toAbortController,_.toAbortControllerFast=j.toAbortControllerFast,
_.toAbortSignal=j.toAbortSignal,
_.toAbortSignalFast=j.toAbortSignalFast,_.AbortControllerFast=k.AbortControllerFast,
_.AbortError=S.AbortError;var z=function(){
function t(t){
var e=t.maxSize,r=t.priorityQueue,i=this
;if(this._maxSize=0,this._size=0,this._tickPromise=new f,
!e)throw new Error("maxSize should be > 0")
;this._maxSize=e,this._size=e,this._priorityQueue=r,
this._tickFunc=function(t){return i.tick(t)}}
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
var i=this._tickPromise
;this._tickPromise=null,i.resolve()}return t
},t.prototype.tick=function(t){
return this._tickPromise||(this._tickPromise=new f),
function(t,e){return new Promise((function(r,i){
if(t&&t.aborted)return void i(t.reason);let n,o
;function s(t){o||(o=!0,n&&n(),i(t))}
e.then((function(t){n&&n(),r(t)
})).catch(s),t&&(n=t.subscribe(s))}))
}(t,this._tickPromise.promise)
},t.prototype.holdWait=function(t,i,n){
return e(this,void 0,void 0,(function(){
return r(this,(function(e){switch(e.label){case 0:
if(t>this.maxSize)throw new Error("holdCount (".concat(t," > maxSize (").concat(this.maxSize,"))"))
;return this._priorityQueue?[4,this._priorityQueue.run(null,i,n)]:[3,2]
;case 1:e.sent(),e.label=2;case 2:
return t>this._size?this._priorityQueue?[4,this._priorityQueue.run(this._tickFunc,i,n)]:[3,4]:[3,7]
;case 3:return e.sent(),[3,6];case 4:
return[4,this.tick(n)];case 5:e.sent(),e.label=6
;case 6:return[3,2];case 7:
if(!this.hold(t))throw new Error("Unexpected behavior")
;return[2]}}))}))},t}(),P=function(){
function t(t){
var e=t.maxCount,r=t.pool,i=t.time,n=t.priorityQueue,s=t.timeController,c=this
;this._timeController=s||o,
this._maxCount=e,this._pool=r||new z({maxSize:e,
priorityQueue:n
}),this._time=i,this._priorityQueue=n,this._releaseFunc=function(){
c._release()},this._tickFunc=function(t){
return c.tick(t)}}
return t.prototype.hold=function(){
this._pool.hold(1)
},t.prototype.release=function(){
this._timeController.setTimeout(this._releaseFunc,this._time)
},t.prototype._release=function(){
this._pool.release(1)
},t.prototype.available=function(){
return this._pool.size>0
},t.prototype.tick=function(t){
return this._pool.tick(t)
},t.prototype.run=function(t,i,n,o){
return e(this,void 0,void 0,(function(){
return r(this,(function(e){switch(e.label){case 0:
if(!o)return[3,1]
;if(!this._pool.hold(1)&&o)throw new Error("hold count (".concat(1,") > holdAvailable (").concat(this._pool.size,")"))
;return[3,3];case 1:
return[4,this._pool.holdWait(1,i,n)];case 2:
e.sent(),e.label=3;case 3:
return e.trys.push([3,,5,6]),[4,t(n)];case 4:
return[2,e.sent()];case 5:
return this.release(),[7];case 6:return[2]}}))}))
},t}(),x=function(){function t(t){
var e=t.timeLimits,r=t.priorityQueue,i=this
;this._timeLimits=e,this._priorityQueue=r,
this._tickFunc=function(t){return i.tick(t)}}
return t.prototype.hold=function(){
for(var t=0;t<this._timeLimits.length;t++)this._timeLimits[t].hold()
},t.prototype.release=function(){
for(var t=0;t<this._timeLimits.length;t++)this._timeLimits[t].release()
},t.prototype.available=function(){
return this._timeLimits.every((function(t){
return t.available()}))
},t.prototype.tick=function(t){
return Promise.race(this._timeLimits.map((function(e){
return e.tick(t)})))
},t.prototype.run=function(t,i,n,o){
return e(this,void 0,void 0,(function(){
return r(this,(function(e){switch(e.label){case 0:
return o||!this._priorityQueue?[3,2]:[4,this._priorityQueue.run(null,i,n)]
;case 1:e.sent(),e.label=2;case 2:
return this.available()?[3,7]:o||!this._priorityQueue?[3,4]:[4,this._priorityQueue.run(this._tickFunc,i,n)]
;case 3:return e.sent(),[3,6];case 4:
return[4,this.tick(n)];case 5:e.sent(),e.label=6
;case 6:return[3,2];case 7:this.hold(),e.label=8
;case 8:return e.trys.push([8,,10,11]),[4,t(n)]
;case 9:return[2,e.sent()];case 10:
return this.release(),[7];case 11:return[2]}}))}))
},t}()
;t.TimeLimit=P,t.TimeLimits=x,Object.defineProperty(t,"__esModule",{
value:!0})}({});
