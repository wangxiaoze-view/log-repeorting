import { BaseInfo } from '@log-reporting/core/share/base';
import { EventBus } from '@log-reporting/core/lib/eventBus';
import { Logger } from '@log-reporting/logger';
import { Reource } from '@log-reporting/core/share/reource';
import { PerformanceClass } from '@log-reporting/core/share/performance';
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
  reource: Reource;
  performance: PerformanceClass;
};

export interface IWindow extends Window {
  __log_reporting__?: LogReportingType;
  __log_reporting_init__?: boolean;
}

export type AnyFun = (...args: any[]) => any;
export type AnyObject = { [key: string]: any };

export type LoggerType = Logger;
export type LogFun = (title: string, content: string) => void;

export interface IReource {
  url: string;
  type: string;
  status: number;
  duration: number;
  size: number;
  startTime: number;
  endTime: number;
  response: string;
  error: string;
  stack: string;
  [key: string]: any;
}

export interface IPerformance {
  dns: number;
  tcp: number;
  ssl: number;
  ttfb: number;
  render: number;
  dom: number;
  load: number;
  total: number;
}
