import dayjs from 'dayjs';
import { ErrorData, LogConfig, LogOptions } from './types';
import { watchJsError, watchReadyError, removeJsError } from './lib/watchJsError';
import { cancelRequest, watchAxios } from './lib/watchAxios';
import * as rrweb from 'rrweb';

class LogReporting {
  public debug: boolean;
  public watchReady: boolean;
  public watchJsError: boolean;
  public watchSource: boolean;
  public watchAxios: boolean;
  public watchPerformance: boolean;
  public config: Record<string, any>;
  public snapshot: Record<string, any>[];
  public stopFn: any;

  constructor() {
    // 是否开启debugger, 默认不开启
    this.debug = false;
    // 页面准备是是否监听报错
    this.watchReady = false;
    // 监听js报错信息
    this.watchJsError = false;
    // 监听资源报错信息
    this.watchSource = false;
    // 监听请求报错信息
    this.watchAxios = false;
    // 监控性能指标
    this.watchPerformance = false;
    // 初始操作的配置
    this.config = new Map();
    // 快照
    this.snapshot = [];
    this.stopFn = null;

    this.console('info', '欢迎使用【log-reporting】日志上报系统!');
  }

  // 初始化
  async init(config: LogOptions) {
    try {
      this.initRRWeb();
      await this.validateConfig(config);
    } catch (e) {
      this.console('error', (e as any).message, config);
    }

    // 页面准备好就开始监听
    this.watchReady && watchReadyError();
    // 搜集js报错, 资源报错
    this.watchJsError && watchJsError();
    // 监听请求报错
    this.watchAxios && watchAxios();
  }

  // 初始化rrweb
  initRRWeb() {
    const _this = this;
    this.stopFn = rrweb.record({
      emit(event, isCheckout) {
        // isCheckout 是一个标识，告诉你重新制作了快照
        if (isCheckout) {
          _this.snapshot = [];
        }
        _this.snapshot.push(event);
      },
      checkoutEveryNms: 0.5 * 60 * 1000, // 每30s重新制作快照
      // checkoutEveryNth: 200, // 每 200 个 event 重新制作快照
    });
  }

  // 校验参数完整性
  validateConfig(config: LogOptions) {
    return new Promise<boolean>((resolve, reject) => {
      const keys = Object.keys(config);
      // 没有传入对应的参数报错提示
      if (!config || !keys.length)
        return reject({
          message: '初始化参数错误!',
        });

      // 设置配置文件
      keys.map(k => this.setConfigValue(k, config));

      // 如果没有设置，默认为debug模式，debug将会打印所有报错的信息
      this.setDebug();

      // 设置内部私有变量，保证内部变量的唯一性
      if (!this.setInternalVariable(config.config)) {
        return reject({
          message: '请设置config参数!',
        });
      }

      resolve(true);
    });
  }

  setConfigValue(key: string, options: LogOptions) {
    this.config.set(key, options[key as keyof typeof options]);
  }
  getConfigValue(key: string) {
    return this.config.get(key);
  }

  setDebug() {
    const isDebug = this.getConfigValue('debug');
    if (Object.prototype.toString.call(isDebug) === '[object Boolean]') {
      this.debug = isDebug;
    } else {
      this.debug = true;
      // 默认开启
    }
  }

  // 根据对应传递的参数设置内部的私有变量
  setInternalVariable(config: LogConfig) {
    if (!config || !Object.keys(config).length) {
      return false;
    }
    const keys = Object.keys(config);
    keys.map(i => {
      (this as any)[i] = config[i as keyof typeof config];
    });
    return true;
  }

  console(
    type: 'log' | 'warn' | 'error' | 'info',
    message: string,
    error?: ErrorData | Record<string, any>,
  ) {
    if (type === 'info') {
      console.log(
        '%c日志上报系统SDK-ERROR====>' + ` 时间:${this.time()}  错误信息: ${message || '-'}`,
        'background: #ecf5ff;color:#409eff;padding: 2px 4px;font-size: 12px;font-weight: 600;',
      );
    }

    if (!this.debug) return;
    if (type === 'log') {
      console.log(
        '%c日志上报系统SDK-LOG====>' + ` 时间:${this.time()}  错误信息: ${message || '-'}`,
        'background: #f4f4f5;color:#909399;padding: 2px 4px;font-size: 12px;font-weight: 600;',
      );
    } else if (type === 'warn') {
      console.log(
        '%c日志上报系统SDK-WARN====>' + ` 时间:${this.time()}  错误信息: ${message || '-'}`,
        'background: #fdf6ec;color:#e6a23c;padding: 2px 4px;font-size: 12px;font-weight: 600;',
      );
    } else if (type === 'error') {
      console.log(
        '%c日志上报系统SDK-ERROR====>' + ` 时间:${this.time()}  错误信息: ${message || '-'}`,
        'background: #fef0f0;color:#f56c6c;padding: 2px 4px;font-size: 12px;font-weight: 600;',
      );
    }
    error && console.table(error);
  }

  time(time?: Date, format = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(time).format(format);
  }

  destroy() {
    // 销毁全局变量
    (window as any).monitorSdk = null;
    this.watchReady && removeJsError('load');
    this.watchJsError && removeJsError('js');
    cancelRequest();
  }
}

const logReporting = new LogReporting();
(window as any).logReporting = logReporting;
export default logReporting;
