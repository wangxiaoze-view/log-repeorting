var name="@log-reporting/logger",version="1.0.1",description="前端日志上报SDK",homepage="https://github.com/wangxiaoze-view/log-repeorting#readme",main="./dist/index.cjs",module="./dist/index.mjs",types="./dist/types/index.d.ts",unpkg="./dist/index.iife.min.js",jsdelivr="./dist/index.iife.min.js",sideEffects=!1,exports={".":{import:"./dist/index.mjs",require:"./dist/index.cjs",types:"./dist/index.d.ts"},"./*":"./*"},files=["dist","*.d.ts"],license="MIT",repository={type:"git",url:"git+https://github.com/wangxiaoze-view/log-repeorting.git",directory:"packages/logger"},author="王小泽 <wangze@anbangke.com>",keywords=["log","log-repeorting","rollup","rrweb","typescript","埋点","日志","采集"],publishConfig={registry:"https://registry.npmjs.org/"},bugs={url:"https://github.com/wangxiaoze-view/log-repeorting/issues"},pck={name:name,version:version,description:description,homepage:homepage,main:main,module:module,types:types,unpkg:unpkg,jsdelivr:jsdelivr,sideEffects:sideEffects,exports:exports,files:files,license:license,repository:repository,author:author,keywords:keywords,publishConfig:publishConfig,bugs:bugs};const _log=console["log"];class Logger{constructor(){}log(o,e){_log(`%c${o}%c `+e,"color: #fff;font-weight: blod;letter-spacing:2px;padding: 3px 5px;background-color: #73767a;border-radius: 3px;","color: #909399;font-weight: blod;letter-spacing:2px;padding: 3px 5px;")}info(o,e){_log(`%c${o}%c `+e,"color: #fff;font-weight: blod;letter-spacing:2px;padding: 3px 5px;background-color: #337ecc;border-radius: 3px;","color: #409EFF;font-weight: blod;letter-spacing:2px;padding: 3px 5px;")}warn(o,e){_log(`%c${o}%c `+e,"color: #fff;font-weight: blod;letter-spacing:2px;padding: 3px 5px;background-color: #b88230;border-radius: 3px;","color: #E6A23C;font-weight: blod;letter-spacing:2px;padding: 3px 5px;")}error(o,e){_log(`%c${o}%c `+e,"color: #fff;font-weight: blod;letter-spacing:2px;padding: 3px 5px;background-color: #c45656;border-radius: 3px;","color: #F56C6C;font-weight: blod;letter-spacing:2px;padding: 3px 5px;")}success(o,e){_log(`%c${o}%c `+e,"color: #fff;font-weight: blod;letter-spacing:2px;padding: 3px 5px;background-color: #529b2e;border-radius: 3px;","color: #67C23A;font-weight: blod;letter-spacing:2px;padding: 3px 5px;")}}const logger=new Logger,log=logger.log,info=logger.info,warn=logger.warn,error=logger.error,success=logger.success,_name=pck.name,_version=pck.version,_author=pck.author,_description=pck.description;export{Logger,_author,_description,_name,_version,error,info,log,logger,success,warn};
