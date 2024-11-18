import lz from"lz-string";import{Base64}from"js-base64";import*as RRweb from"rrweb";function getGlobalThis(){return"undefined"!=typeof window?window:{}}function getGlobalSupport(){return _global.__log_reporting__=_global.__log_reporting__||{},_global.__log_reporting__}let _global=getGlobalThis(),_support=getGlobalSupport(),_log=console.log;class Logger{constructor(){}log(e,t){_log(`%c${e}%c `+t,"color: #fff;font-weight: blod;letter-spacing:2px;padding: 3px 5px;background-color: #73767a;border-radius: 3px;","color: #909399;font-weight: blod;letter-spacing:2px;padding: 3px 5px;")}info(e,t){_log(`%c${e}%c `+t,"color: #fff;font-weight: blod;letter-spacing:2px;padding: 3px 5px;background-color: #337ecc;border-radius: 3px;","color: #409EFF;font-weight: blod;letter-spacing:2px;padding: 3px 5px;")}warn(e,t){_log(`%c${e}%c `+t,"color: #fff;font-weight: blod;letter-spacing:2px;padding: 3px 5px;background-color: #b88230;border-radius: 3px;","color: #E6A23C;font-weight: blod;letter-spacing:2px;padding: 3px 5px;")}error(e,t){_log(`%c${e}%c `+t,"color: #fff;font-weight: blod;letter-spacing:2px;padding: 3px 5px;background-color: #c45656;border-radius: 3px;","color: #F56C6C;font-weight: blod;letter-spacing:2px;padding: 3px 5px;")}success(e,t){_log(`%c${e}%c `+t,"color: #fff;font-weight: blod;letter-spacing:2px;padding: 3px 5px;background-color: #529b2e;border-radius: 3px;","color: #67C23A;font-weight: blod;letter-spacing:2px;padding: 3px 5px;")}}let logger=new Logger;function verifyBase(e){return!(!e.dsn||"string"!=typeof e.dsn)||(logger.error("dsn参数错误","dsn地址应该为 [字符串], 例如: https://www.wangxiaoze.wang"),!1)}function isKeyValid(e,t){return Object.prototype.hasOwnProperty.call(t,e)}function on(e,t,r,o=!1){e.addEventListener(t,r,o)}function getNavigation(e){var{domainLookupEnd:e,domainLookupStart:t,connectEnd:r,connectStart:o,secureConnectionStart:s,responseStart:n,requestStart:i,domInteractive:a,domComplete:p,loadEventEnd:c,loadEventStart:l,fetchStart:u}=e;return{dns:e-t,tcp:r-o,ssl:s,ttfb:n-i,render:null!=a?a:0,dom:null!=p?p:0,load:(null!=c?c:0)-(null!=l?l:0),total:(null!=c?c:0)-(null!=u?u:0)}}function getParams(e){var t,r,o={};for([t,r]of new URLSearchParams(e).entries())o[t]=r;return o}logger.log,logger,logger,logger,logger;class BaseInfo{constructor(e){this.options=e}}let baseInfo;function initBaseOptions(e){baseInfo=new BaseInfo(e),_support.baseInfo=baseInfo}var EVENT_TYPES,ERROR_TYPES;(e=>{e.ERROR="error",e.UNHANDLEDREJECTION="unhandledrejection",e.CONSOLE_ERROR="consoleError",e.XHR="xhr",e.FETCH="fetch",e.PV="pv",e.EXPOSURE="exposure"})(EVENT_TYPES=EVENT_TYPES||{}),(e=>{e.JS="js_error",e.PROMISE="promise_error",e.CONSOLE_ERROR="console_error",e.XHR="xhr_error",e.FETCH="fetch_error"})(ERROR_TYPES=ERROR_TYPES||{});class EventBus{constructor(){this._eventMap=new Map}static getInstance(){return this._instance||(this._instance=new EventBus),this._instance}on(e,t){this._eventMap.has(e)||this._eventMap.set(e,[]),null!=(e=this._eventMap.get(e))&&e.push(t)}emit(e,...t){this._eventMap.has(e)&&null!=(e=this._eventMap.get(e))&&e.forEach(e=>{e(...t)})}off(r,o){var e;this._eventMap.has(r)&&null!=(e=this._eventMap.get(r))&&e.forEach((e,t)=>{e===o&&null!=(e=this._eventMap.get(r))&&e.splice(t,1)})}once(r,o){var e;this._eventMap.has(r)&&null!=(e=this._eventMap.get(r))&&e.forEach((e,t)=>{e===o&&null!=(e=this._eventMap.get(r))&&e.splice(t,1)})}}let eventBus=_support.eventBus||(_support.eventBus=EventBus.getInstance());function support(e){return e in navigator?navigator[e]:"该浏览器不支持!"}function getNavigator(){return{platform:support("platform"),appName:support("appName"),appVersion:support("appVersion"),appCodeName:support("appCodeName"),vendor:support("vendor"),userAgent:support("userAgent"),onLine:support("onLine"),language:support("language"),product:support("product"),productSub:support("productSub"),windowWidth:window.screen.width,windowHeight:window.screen.height,colorDepth:window.screen.colorDepth}}function encryptFun(e,t){var e=JSON.stringify(e),r=_support.baseInfo.options.encryptMethod;return"lz"===r?lz.compress(e):Base64.encode(e)}function decryptionFun(e,t){var r=_support.baseInfo.options.encryptMethod;return"lz"===r?lz.decompress(e):Base64.decode(e)}function sendBeacon(t,r){return new Promise(e=>{navigator.sendBeacon(t,r),e(!0)})}function sendXhr(r,o){return new Promise(e=>{let t=new XMLHttpRequest;t.open("post",r,!0),t.setRequestHeader("Content-Type","application/json"),t.send(o),e(!0),t.onreadystatechange=function(){4===t.readyState&&e(!0)}})}function sendReport(e,t){e={appId:_support.baseInfo.options.appId,baseInfo:Object.assign({title:document.title,url:location.href,date:Date.now()},getNavigator()),reportInfo:Object.assign({eventId:e,snapshot:encryptFun(_support.record.snapshot,"snapshot")},t)};let r=_support.baseInfo.options.dsn,o=null!=(t=_support.baseInfo.options.method)?t:"beacon",s=JSON.stringify(e);return new Promise(e=>{switch(o){case"beacon":sendBeacon(r,s).then(()=>{e({type:"xhr",success:!0})});break;case"xhr":sendXhr(r,s).then(()=>{e({type:"xhr",success:!0})});break;default:logger.warn("上报方式不支持:","上报方式只支持 'beacon' 和 'xhr'")}})}function initPushError(){for(var e in EVENT_TYPES)isKeyValid(e,EVENT_TYPES)&&pushFun(e)}function pushFun(e){if(isKeyValid(e,EVENT_TYPES)){var t=EVENT_TYPES[e];switch(t){case EVENT_TYPES.ERROR:pushError(t);break;case EVENT_TYPES.CONSOLE_ERROR:pushConsole(t);break;case EVENT_TYPES.UNHANDLEDREJECTION:pushUnhandledrejection(t);break;case EVENT_TYPES.XHR:pushXhr(t);break;case EVENT_TYPES.FETCH:pushFetch(t)}}}function pushError(t){eventBus.on(t,e=>{_support.baseInfo.options.isDebug&&logger.error("js逻辑错误：",JSON.stringify(e)),sendReport(t,e)})}function pushConsole(t){eventBus.on(t,e=>{_support.baseInfo.options.isDebug&&logger.info("console错误：",JSON.stringify(e)),sendReport(t,e)})}function pushUnhandledrejection(t){eventBus.on(t,e=>{_support.baseInfo.options.isDebug&&logger.error("Promise错误：",JSON.stringify(e)),sendReport(t,e)})}function pushXhr(t){"XMLHttpRequest"in _global&&eventBus.on(t,e=>{_support.baseInfo.options.isDebug&&logger.error("xhr接口错误：",JSON.stringify(e)),sendReport(t,e)})}function pushFetch(t){"fetch"in _global&&eventBus.on(t,e=>{_support.baseInfo.options.isDebug&&logger.error("fetch接口错误：",JSON.stringify(e)),sendReport(t,e)})}let lastEvent;function getErrorEle(){return lastEvent}function formatStack(e,t=1){return(e||"").split("\n").slice(t).map(e=>e.replace(/^\s+at\s+/g,"")).join("~~")}function getErrorStackLine(e){var t={errorMessage:"",time:Date.now(),colno:0,lineno:0,stackMessage:"",fileName:""};try{var r,o,s,n,i=/http[s]?:\/\/[^:]+(:\d+)?\/([^:]+):(\d+):(\d+)/,a=formatStack(e.stack).split("~~")[1];return a?(r=a.match(i))?(o=r[2],s=parseInt(r[3],10),n=parseInt(r[4],10),{errorMessage:e.message,time:Date.now(),colno:n,lineno:s,stackMessage:formatStack(e.stack),fileName:o}):t:t}catch(e){return t}}function getErrorElInfo(e){var t,e=e||getErrorEle();let r={};return r=e?{pointerId:e.pointerId,pointerType:e.pointerType,timeStamp:e.timeStamp,type:e.type,layerX:e.x,layerY:e.y,nodeName:null!=(t=e.nodeName)?t:e.target.nodeName,nodeType:null!=(t=e.nodeType)?t:e.target.nodeType,textContent:null!=(t=e.textContent)?t:e.target.textContent,className:null!=(t=e.className)?t:e.target.className,elId:null!=(t=e.id)?t:e.target.id}:r}function getError(e){var t=getErrorStackLine(e);let r;return r=t.stackMessage?t:{errorMessage:e.error?e.error.message:"",stackMessage:formatStack(null==(t=e.error)?void 0:t.stack),lineno:e.lineno,colno:e.colno,fileName:e.filename,time:Date.now()},Object.assign(Object.assign({bubbles:e.bubbles,eventType:e.type,isTrusted:e.isTrusted},r),{time:Date.now(),timeStamp:Math.round(e.timeStamp),el:getErrorElInfo()})}function getPromiseError(e){let t,r,o=0,s=0,n="";var i,a=e.reason;return"string"==typeof a?t=a:"object"==typeof a&&(t=a.message,a.stack&&(i=a.stack.match(/at\s+(.+):(\d+):(\d+)/),r=i[1],s=i[2],o=i[3]),n=formatStack(a.stack)),Object.assign(Object.assign({},getError(e)),{errorMessage:t,stackMessage:n,fileName:r,lineno:Number(s),colno:Number(o)})}function getXhrError(e,t){return Object.assign(Object.assign({},getError(e)),{questOptions:t})}function getFetchError(e,t={}){return Object.assign({questOptions:e,el:getErrorElInfo()},t)}function initReWrite(){for(var e in EVENT_TYPES)isKeyValid(e,EVENT_TYPES)&&reWriteFun(e)}function reWriteFun(e){if(isKeyValid(e,EVENT_TYPES)){var t=EVENT_TYPES[e];switch(t){case EVENT_TYPES.ERROR:listenError(t);break;case EVENT_TYPES.CONSOLE_ERROR:listenConsole(t);break;case EVENT_TYPES.UNHANDLEDREJECTION:listenUnhandledrejection(t);break;case EVENT_TYPES.XHR:listenXhr(t);break;case EVENT_TYPES.FETCH:listenFetch(t)}}}function listenError(t){_support.baseInfo.options.isError&&on(_global,t,e=>eventBus.emit(t,Object.assign({errorType:ERROR_TYPES.JS},getError(e))),!0)}function listenConsole(o){if(_support.baseInfo.options.isConsoleError){let r=console.error;console.error=function(...e){var t=e.map(e=>"string"==typeof e?e:JSON.stringify(e)).join(" "),t=new Error(t);eventBus.emit(o,Object.assign({errorType:ERROR_TYPES.CONSOLE_ERROR},getErrorStackLine(t))),r.apply(console,e)}}}function listenUnhandledrejection(t){_support.baseInfo.options.isError&&on(_global,t,e=>eventBus.emit(t,Object.assign({errorType:ERROR_TYPES.PROMISE},getPromiseError(e))))}function listenXhr(i){if(_support.baseInfo.options.isXhr&&"XMLHttpRequest"in _global){let s={},n=XMLHttpRequest.prototype.send,r=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(e,t){return s.method=e,s.url=t,r.call(this,e,t,!0)},XMLHttpRequest.prototype.send=function(e){var t;["get","delete"].includes(s.method.toLowerCase())&&s.url&&-1!==s.url.indexOf("?")&&(t=null==(t=s.url)?void 0:t.substring(s.url.indexOf("?")+1),s.params=getParams(t));let r=()=>({method:s.method.toLowerCase(),url:s.url||"",status:this.status,params:"string"==typeof(e||s.params)?e||s.params:JSON.stringify(e||s.params),message:this.statusText}),o={errorType:ERROR_TYPES.XHR};return this.addEventListener("readystatechange",e=>{4===this.readyState&&(this.status<200||300<=this.status)&&eventBus.emit(i,Object.assign(Object.assign({},o),getXhrError(e,r())))}),this.addEventListener("error",e=>{eventBus.emit(i,Object.assign(Object.assign({},o),getXhrError(e,r())))},!1),this.addEventListener("abort",e=>{eventBus.emit(i,Object.assign(Object.assign({},o),getXhrError(e,r())))},!1),n.call(this,e)}}}function listenFetch(i){if(_support.baseInfo.options.isXhr&&"fetch"in _global){let o=_global.fetch,s={},n={errorType:ERROR_TYPES.FETCH};_global.fetch=function(e,t={}){var{method:r="GET"}=t||{method:"GET"},r=(s.method=r.toLowerCase(),s.url=e.toString(),["get","delete"].includes(s.method.toLowerCase())&&s.url&&(r=null==(r=s.url)?void 0:r.substring(s.url.indexOf("?")+1),s.params=getParams(r)),["post","put"].includes(s.method.toLowerCase())&&(s.params=JSON.stringify(t.body||{})),o(e,t));return r.then(t=>{(t.status<200||300<=t.status)&&t.text().then(()=>{var e={method:s.method.toLowerCase(),url:s.url||"",status:t.status,params:s.params||{},message:t.statusText};eventBus.emit(i,Object.assign(Object.assign({},n),getFetchError(e)))})},e=>{var t={method:s.method.toLowerCase(),url:s.url||"",status:500,params:s.params||{},message:"请求失败"};eventBus.emit(i,Object.assign(Object.assign({},n),getFetchError(t,getErrorStackLine(e))))}),r}}}["click","touchstart","mousedown","keydown","mouseover"].forEach(e=>{document.addEventListener(e,e=>{lastEvent=e},{capture:!0,passive:!0})});var name="@log-reporting/core",version="1.0.5",description="前端日志上报SDK",homepage="https://github.com/wangxiaoze-view/log-repeorting#readme",main$1="./dist/index.cjs",module="./dist/index.mjs",types="./dist/types/index.d.ts",unpkg="./dist/index.iife.min.js",jsdelivr="./dist/index.iife.min.js",sideEffects=!1,exports={".":{import:"./dist/index.mjs",require:"./dist/index.cjs",types:"./dist/index.d.ts"}},files=["dist","*.d.ts"],license="MIT",repository={type:"git",url:"git+https://github.com/wangxiaoze-view/log-repeorting.git",directory:"packages/core"},author="王小泽 <wangze@anbangke.com>",keywords=["log","log-repeorting","rollup","rrweb","typescript","埋点","日志","采集"],publishConfig={registry:"https://registry.npmjs.org/"},bugs={url:"https://github.com/wangxiaoze-view/log-repeorting/issues"},dependencies={"@types/crypto-js":"^4.2.2","js-base64":"^3.7.7","lz-string":"^1.5.0",rrweb:"^2.0.0-alpha.4"},pck={name:name,version:version,description:description,homepage:homepage,main:main$1,module:module,types:types,unpkg:unpkg,jsdelivr:jsdelivr,sideEffects:sideEffects,exports:exports,files:files,license:license,repository:repository,author:author,keywords:keywords,publishConfig:publishConfig,bugs:bugs,dependencies:dependencies};class PerformanceClass{constructor(e){this.data=e}}let performance;function initPerformanceOptions(e){var t;null!=(t=null==(t=_support.baseInfo)?void 0:t.options)&&t.isPerformance&&(performance=new PerformanceClass(e),_support.performance=performance)}class Reource{constructor(e){this.data=e}}let reource;function initReourceOptions(e){var t;null!=(t=null==(t=_support.baseInfo)?void 0:t.options)&&t.isResource&&(reource=new Reource(e),_support.reource=reource)}function initPerformance(){var e=new PerformanceObserver(()=>{}),e=(e.observe({type:"navigation",buffered:!0}),e.observe({type:"resource",buffered:!0}),e.takeRecords()),t=e.find(e=>"navigation"===e.entryType),t=(t&&initPerformanceOptions(getNavigation(t)),e.filter(e=>"resource"===e.entryType));initReourceOptions(t)}let MAX_time=6e4;class RecordScreen{constructor(){this.snapshot=[],this.init()}init(){var e=null!=(e=_support.baseInfo.options.record.time)?e:1e4;this.closeCallback=RRweb.record({emit:(e,t)=>{t&&(this.snapshot=[]),this.snapshot.push(e)},recordCanvas:!0,checkoutEveryNms:e>=MAX_time?MAX_time:e,sampling:{mousemove:!0,scroll:150,media:800,input:"last",mouseInteraction:{MouseUp:!1,MouseDown:!1,Click:!1,ContextMenu:!1,DblClick:!1,Focus:!1,Blur:!1,TouchStart:!1,TouchEnd:!1}}})}close(){var e;null!=(e=this.closeCallback)&&e.call(this),this.closeCallback=void 0}}let record;function initRecord(){_support.baseInfo.options.record&&_support.baseInfo.options.record.open&&(record=new RecordScreen,_support.record=record)}class Exposure{constructor(){this.options={root:null,rootMargin:"0px",threshold:.5},this.observerMap=new WeakMap,this.targetMap=[]}init(t){return new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&sendReport(EVENT_TYPES.EXPOSURE,{time:Date.now(),threshold:t.threshold,message:t.message,el:getErrorElInfo(t.target),snapshot:[]})})},Object.assign(Object.assign({},this.options),{threshold:t.threshold||.5}))}observer(e){(Array.isArray(e)?e:[e]).forEach(r=>{var e=Array.isArray(r.target)?r.target:[r.target];this.observerMap.has(r)||this.observerMap.set(r,this.init(r)),e.forEach(t=>{var e;this.targetMap.find(e=>e.target===t)||(null!=(e=this.observerMap.get(r))&&e.observe(r.target),this.targetMap.push(r))})})}unobserver(e){(Array.isArray(e)?e:[e]).forEach(t=>{var e,r=this.targetMap.find(e=>e.target===t),o=this.targetMap.findIndex(e=>e.target===t);r&&this.observerMap.get(r)&&(null!=(e=this.observerMap.get(r))&&e.unobserve(t),this.observerMap.delete(r),this.targetMap.slice(o,1))})}}let exposure;function initExposure(){_support.baseInfo.options.isExposure&&(exposure=new Exposure,_support.exposure=exposure)}function lestenExposure(e){if(_support.baseInfo.options.isExposure)try{exposure.observer(e)}catch(e){_support.baseInfo.options.isDebug&&logger.error("曝光Api报错",e.message||"")}}function initPv(){_support.baseInfo.options.isPv&&eventBus.on(EVENT_TYPES.PV,e=>{sendReport(EVENT_TYPES.PV,Object.assign(Object.assign({},e),{snapshot:[]}))})}function lestenPv(e){_support.baseInfo.options.isPv&&eventBus.emit(EVENT_TYPES.PV,e)}class Main{constructor(){}init(e){_global.__log_reporting_init__||verifyBase(e)&&(initBaseOptions(e),initPerformance(),initReWrite(),initPushError(),initPv(),initExposure(),initRecord(),_global.__log_reporting_init__=!0)}}let initBaseData={dsn:"",isDebug:!1,isError:!0,isConsoleError:!1,isPerformance:!0,isResource:!1,isXhr:!0,record:{open:!0,time:1e4},encryptMethod:"lz",method:"beacon",isPv:!1},_name=pck.name,_version=pck.version,_author=pck.author,_description=pck.description,main,init=(e=initBaseData)=>{(main=new Main).init(e)};export{ERROR_TYPES,EVENT_TYPES,_author,_description,_global,_name,_support,_version,decryptionFun,encryptFun,init,lestenExposure,lestenPv};
