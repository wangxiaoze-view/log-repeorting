import { IWindow, LogReportingType } from '@log-reporting/types';

// 获取window global 对象
export function getGlobalThis(): IWindow {
  const exitWindow = typeof window !== 'undefined';
  return exitWindow ? window : ({} as IWindow);
}

// 判断是否已经初始化了
export function isInited(): boolean | undefined {
  return _global.__log_reporting_init__;
}

// 全部变量的引用地址
export function getGlobalSupport(): LogReportingType {
  _global.__log_reporting__ = _global.__log_reporting__ || ({} as LogReportingType);
  return _global.__log_reporting__;
}

// 使用私有变量化
const _global = getGlobalThis();
const _support = getGlobalSupport();

export { _global, _support };
