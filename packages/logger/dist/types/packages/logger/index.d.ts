import { LogFun, LoggerType } from '@log-reporting/types';
export declare class Logger {
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
export { logger, log, info, warn, error, success, _name, _version, _author, _description };
