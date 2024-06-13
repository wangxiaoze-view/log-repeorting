import { IWindow, LogReportingType } from '@log-reporting/types';
export declare function getGlobalThis(): IWindow;
export declare function isInited(): boolean | undefined;
export declare function getGlobalSupport(): LogReportingType;
declare const _global: IWindow;
declare const _support: LogReportingType;
export { _global, _support };
