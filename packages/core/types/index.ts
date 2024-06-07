import { BaseInfo } from '../share/base';
import { EventBus } from '../lib/eventBus';

export interface IBaseOptions {
  // dsn
  dsn: string;
  // 是否启用调试
  isDebug: boolean;
  // 是否捕获错误
  isError: boolean;
  // 是否捕获性能
  isPerformance: boolean;
  // 是否捕获资源
  isResource: boolean;
  // 是否捕获请求
  isXhr: boolean;
  // 是否捕获路由
  isHistory: boolean;
}

export type LogReportingType = {
  baseInfo: BaseInfo;
  eventBus: EventBus;
};

export interface IWindow extends Window {
  __log_reporting__?: LogReportingType;
  __log_reporting_init__?: boolean;
}

export type AnyFun = (...args: any[]) => any;
export type AnyObject = { [key: string]: any };
