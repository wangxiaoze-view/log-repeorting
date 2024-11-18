import { IWindow, LogReportingType, IExposure, IPv, IBaseOptions } from '@log-reporting/types';

declare const _global: IWindow;
declare const _support: LogReportingType;

declare enum EVENT_TYPES {
    ERROR = "error",
    UNHANDLEDREJECTION = "unhandledrejection",
    CONSOLE_ERROR = "consoleError",
    XHR = "xhr",
    FETCH = "fetch",
    PV = "pv",
    EXPOSURE = "exposure"
}
declare enum ERROR_TYPES {
    JS = "js_error",
    PROMISE = "promise_error",
    CONSOLE_ERROR = "console_error",
    XHR = "xhr_error",
    FETCH = "fetch_error"
}

declare function encryptFun(value: Record<string, any>, k?: string): any;
declare function decryptionFun(value: string, k: string): any;

declare function lestenExposure(target: IExposure[] | IExposure): void;

declare function lestenPv(options: IPv): void;

declare const _name: string;
declare const _version: string;
declare const _author: string;
declare const _description: string;
declare const init: (options?: IBaseOptions) => void;

export { ERROR_TYPES, EVENT_TYPES, _author, _description, _global, _name, _support, _version, decryptionFun, encryptFun, init, lestenExposure, lestenPv };
