import { LoggerType, LogFun } from '@log-reporting/types';

declare class Logger {
  constructor();
  log(title: string, content: string): void;
  info(title: string, content: string): void;
  warn(title: string, content: string): void;
  error(title: string, content: string): void;
  success(title: string, content: string): void;
}
declare const logger: LoggerType;
declare const log: LogFun;
declare const info: LogFun;
declare const warn: LogFun;
declare const error: LogFun;
declare const success: LogFun;
declare const _name: string;
declare const _version: string;
declare const _author: string;
declare const _description: string;

export { Logger, _author, _description, _name, _version, error, info, log, logger, success, warn };
