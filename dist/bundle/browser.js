!function(t){"use strict";function e(t,e,n,i){
return new(n||(n=Promise))((function(r,s){
function o(t){try{c(i.next(t))}catch(t){s(t)}}
function u(t){try{c(i.throw(t))}catch(t){s(t)}}
function c(t){var e
;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){
t(e)}))).then(o,u)}c((i=i.apply(t,e||[])).next())
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
return"Promise"}}const c=function(){};class l{
constructor(t){
if(t&&t.aborted)this.promise=u.reject(t.reason),this.resolve=c,this.reject=c;else{
let e,n
;if(this.promise=new Promise((function(t,i){
e=t,n=function(e){!function(t,e){t(function(t){
return{then(e,n){n(t)}}}(e))}(t,e)}})),t){
const i=t.subscribe((function(t){n(t)}))
;this.resolve=function(t){i(),e(t)
},this.reject=function(t){i(),n(t)}
}else this.resolve=e,this.reject=n}}}
const a=setTimeout,h=clearTimeout,f={
now:function(){return Date.now()},
setTimeout:"undefined"==typeof window?setTimeout:function(){
return a.apply(window,arguments)},
clearTimeout:"undefined"==typeof window?clearTimeout:function(){
return h.apply(window,arguments)}}
;var _=function(){function t(t){
var e=t.maxCount,n=t.timeMs,i=t.priorityQueue,r=t.timeController,s=this
;this._activeCount=0,
this._tickPromise=new l,this._timeController=r||f,this._maxCount=e,
this._timeMs=n,
this._priorityQueue=i,this._releaseFunc=function(){
s._release()},this._tickFunc=function(t){
return s.tick(t)}}
return t.prototype._release=function(){
if(this._activeCount--,this._activeCount===this._maxCount-1){
var t=this._tickPromise
;this._tickPromise=new l,t.resolve()}
},t.prototype.tick=function(t){
return function(t,e){
return new Promise((function(n,i){var r,s
;function o(t){s||(s=!0,r&&r(),i(t))}
t&&t.aborted?i(t.reason):(e.then((function(t){
r&&r(),n(t)})).catch(o),t&&(r=t.subscribe(o)))}))
}(t,this._tickPromise.promise)
},t.prototype.available=function(){
return this._activeCount<this._maxCount
},t.prototype.run=function(t,i,r){
return e(this,void 0,void 0,(function(){
return n(this,(function(e){switch(e.label){case 0:
return this._priorityQueue?[4,this._priorityQueue.run(null,i,r)]:[3,2]
;case 1:e.sent(),e.label=2;case 2:
return[2,this._run(t,i,r)]}}))}))
},t.prototype._run=function(t,i,r){
return e(this,void 0,void 0,(function(){
return n(this,(function(e){switch(e.label){case 0:
return this.available()?[3,4]:[4,this.tick(r)]
;case 1:
return e.sent(),this._priorityQueue?[4,this._priorityQueue.run(null,i,r)]:[3,3]
;case 2:e.sent(),e.label=3;case 3:return[3,0]
;case 4:this._activeCount++,e.label=5;case 5:
return e.trys.push([5,,7,8]),[4,t(r)];case 6:
return[2,e.sent()];case 7:
return this._timeController.setTimeout(this._releaseFunc,this._timeMs),
[7];case 8:return[2]}}))}))},t}(),p=function(){
function t(t){
var e=t.timeLimits,n=t.priorityQueue,i=this
;this._timeLimits=e,this._priorityQueue=n,
this._tickFunc=function(t){return i.tick(t)}}
return t.prototype.tick=function(t){
return Promise.race(this._timeLimits.map((function(e){
return e.tick(t)})))
},t.prototype.available=function(){
return this._timeLimits.every((function(t){
return t.available()}))
},t.prototype.run=function(t,i,r){
return e(this,void 0,void 0,(function(){
return n(this,(function(e){switch(e.label){case 0:
return this._priorityQueue?[4,this._priorityQueue.run(null,i,r)]:[3,2]
;case 1:e.sent(),e.label=2;case 2:
return[2,this._run(t,i,r)]}}))}))
},t.prototype._run=function(t,i,r){
return e(this,void 0,void 0,(function(){var e,s,o
;return n(this,(function(n){switch(n.label){
case 0:
return this.available()?[3,4]:[4,this.tick(r)]
;case 1:
return n.sent(),this._priorityQueue?[4,this._priorityQueue.run(null,i,r)]:[3,3]
;case 2:n.sent(),n.label=3;case 3:return[3,0]
;case 4:for(e=new l,s=function(){return e.promise
},o=0;o<this._timeLimits.length;o++)this._timeLimits[o]._run(s)
;n.label=5;case 5:
return n.trys.push([5,,7,8]),[4,t(r)];case 6:
return[2,n.sent()];case 7:return e.resolve(),[7]
;case 8:return[2]}}))}))},t}()
;t.TimeLimit=_,t.TimeLimits=p,Object.defineProperty(t,"__esModule",{
value:!0})}({});
