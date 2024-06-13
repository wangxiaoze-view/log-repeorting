import { BaseInfo } from '../share/base';
import { EventBus } from '../lib/eventBus';
export interface IBaseOptions {
  dsn: string;
  isDebug: boolean;
  isError: boolean;
  isPerformance: boolean;
  isResource: boolean;
  isXhr: boolean;
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
export type AnyObject = {
  [key: string]: any;
};
