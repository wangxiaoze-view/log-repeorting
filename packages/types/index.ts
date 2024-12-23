import { BaseInfo } from '@log-reporting/core/share/base';
import { EventBus } from '@log-reporting/core/lib/eventBus';
import { Logger } from '@log-reporting/logger';
import { Reource } from '@log-reporting/core/share/reource';
import { PerformanceClass } from '@log-reporting/core/share/performance';
import { RecordScreen } from '@log-reporting/core/lib/record';
import { Exposure } from '@log-reporting/core/lib/exposure';

export interface IBaseOptions {
  // 应用id 或者 密钥
  appId?: string;
  // dsn
  dsn: string;
  // 是否上报
  isReport?: boolean;
  // 是否启用调试
  isDebug?: boolean;
  // 是否捕获错误
  isError?: boolean;
  // 是否捕获console.error
  isConsoleError?: boolean;
  // 是否捕获性能
  isPerformance?: boolean;
  // 是否捕获资源
  isResource?: boolean;
  // 是否捕获请求
  isXhr?: boolean;
  // 是否捕获路由
  // isHistory: boolean;
  // 屏幕录制
  record?: {
    // 是否开启
    open: boolean;
    // 录制时间
    time: number;
  };
  // 加密方式
  encryptMethod?: 'lz' | 'base64';
  // 上报方式
  method?: 'beacon' | 'xhr';
  // pv统计
  isPv?: boolean;
  // 曝光
  isExposure?: boolean;
}

export type LogReportingType = {
  baseInfo: BaseInfo;
  eventBus: EventBus;
  reource: Reource;
  performance: PerformanceClass;
  record: RecordScreen;
  exposure: Exposure;
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

export interface IELBindType {
  pointerId: number;
  pointerType: string;
  timeStamp: number;
  type: string;
  layerX: number;
  layerY: number;
  nodeName: string;
  nodeType: number;
  textContent: string;
  className: number;
  elId: number;
}

export interface IErrorType {
  bubbles: boolean;
  eventType: string;
  isTrusted: boolean;
  errorMessage: string;
  stackMessage: string;
  fileName: string;
  colno: number;
  lineno: number;
  time: number;
  timeStamp: number;
  el: IELBindType;
}

export interface IXhrOpenType {
  method: string;
  url: string;
  params: AnyObject | string;
  status: number;
  message: string;
}

export interface IConsoleErrorType {
  errorMessage: string;
  time: number;
  colno: number;
  lineno: number;
  stackMessage: string;
  fileName: string;
}

export interface RecordEventScope {
  time: string;
  eventList: any[];
}

export interface IPv {
  message?: string;
  [k: string]: any;
}

export interface IExposure extends IPv {
  threshold?: number;
  target?: any; // 曝光的元素
  params?: Record<string, any>;
  time?: number;
}
