((o,e)=>{"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((o="undefined"!=typeof globalThis?globalThis:o||self).logReportingLogger={})})(this,function(o){var e="@log-reporting/logger",r="1.0.2",p="前端日志上报SDK",n="王小泽 <wangze@anbangke.com>";let c=console.log;class t{constructor(){}log(o,e){c(`%c${o}%c `+e,"color: #fff;font-weight: blod;letter-spacing:2px;padding: 3px 5px;background-color: #73767a;border-radius: 3px;","color: #909399;font-weight: blod;letter-spacing:2px;padding: 3px 5px;")}info(o,e){c(`%c${o}%c `+e,"color: #fff;font-weight: blod;letter-spacing:2px;padding: 3px 5px;background-color: #337ecc;border-radius: 3px;","color: #409EFF;font-weight: blod;letter-spacing:2px;padding: 3px 5px;")}warn(o,e){c(`%c${o}%c `+e,"color: #fff;font-weight: blod;letter-spacing:2px;padding: 3px 5px;background-color: #b88230;border-radius: 3px;","color: #E6A23C;font-weight: blod;letter-spacing:2px;padding: 3px 5px;")}error(o,e){c(`%c${o}%c `+e,"color: #fff;font-weight: blod;letter-spacing:2px;padding: 3px 5px;background-color: #c45656;border-radius: 3px;","color: #F56C6C;font-weight: blod;letter-spacing:2px;padding: 3px 5px;")}success(o,e){c(`%c${o}%c `+e,"color: #fff;font-weight: blod;letter-spacing:2px;padding: 3px 5px;background-color: #529b2e;border-radius: 3px;","color: #67C23A;font-weight: blod;letter-spacing:2px;padding: 3px 5px;")}}var d=new t,g=d.log,i=d.info,l=d.warn,a=d.error,f=d.success;o.Logger=t,o._author=n,o._description=p,o._name=e,o._version=r,o.error=a,o.info=i,o.log=g,o.logger=d,o.success=f,o.warn=l});
