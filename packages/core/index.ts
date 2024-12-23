import { _global, _support } from './share/global';
import { verifyBase } from './utils';
import { initBaseOptions } from './share/base';
import { initPushError } from './lib/pushError';
import { initReWrite } from './lib/rewrite';
import pck from './package.json';
import { IBaseOptions } from '@log-reporting/types';
import { initPerformance } from './lib/initPerformance';
import { initRecord } from './lib/record';
import { decryptionFun, encryptFun } from './lib/send';
import { initExposure, lestenExposure } from './lib/exposure';
import { initPv, lestenPv } from './lib/pv';
export * from './enum';
export { getNavigator } from './share/navigator';
class Main {
  constructor() {}

  init(options: IBaseOptions) {
    // 是否已初始化
    if (_global.__log_reporting_init__) return;
    // 校验参数完整性
    if (!verifyBase(options)) return;
    // 初始化 基础参数, 基本参数进行挂载
    initBaseOptions(options);
    // 初始化性能指标
    initPerformance();
    // 重写对应的拦截任务
    initReWrite();
    // 触发
    initPushError();
    // pv统计
    initPv();
    // 曝光
    initExposure();
    // 视频录制
    initRecord();
    // 初始化完成标识
    _global.__log_reporting_init__ = true;
  }
}

const initBaseData: IBaseOptions = {
  dsn: '',
  isDebug: false,
  isError: true,
  isConsoleError: false,
  isPerformance: true,
  isResource: false,
  isXhr: true,
  record: {
    open: true,
    time: 10 * 1000,
  },
  encryptMethod: 'lz',
  method: 'beacon',
  isPv: false,
  // isHistory: false,
};

const _name = pck.name;
const _version = pck.version;
const _author = pck.author;
const _description = pck.description;

let main: Main;
const init = (options: IBaseOptions = initBaseData) => {
  main = new Main();
  main.init(options);
};

export {
  init,
  // 加密
  encryptFun,
  // 解密
  decryptionFun,
  // 搜集pv
  lestenPv,
  // 搜集曝光
  lestenExposure,
  // thisGlobal
  _global,
  // 全局的详情信息
  _support,
  _name,
  _version,
  _author,
  _description,
};
