import { BaseInfo } from '@log-reporting/core/share/base';
import { EventBus } from '@log-reporting/core/lib/eventBus';
import { Logger } from '@log-reporting/logger';
import { Reource } from '@log-reporting/core/share/reource';
import { PerformanceClass } from '@log-reporting/core/share/performance';
import { RecordScreen } from '@log-reporting/core/lib/record';
import { Exposure } from '@log-reporting/core/lib/exposure';

interface IBaseOptions {
    appId?: string;
    dsn: string;
    isDebug?: boolean;
    isError?: boolean;
    isConsoleError?: boolean;
    isPerformance?: boolean;
    isResource?: boolean;
    isXhr?: boolean;
    record?: {
        open: boolean;
        time: number;
    };
    encryptMethod?: 'lz' | 'base64';
    method?: 'beacon' | 'xhr';
    isPv?: boolean;
    isExposure?: boolean;
}
type LogReportingType = {
    baseInfo: BaseInfo;
    eventBus: EventBus;
    reource: Reource;
    performance: PerformanceClass;
    record: RecordScreen;
    exposure: Exposure;
};
interface IWindow extends Window {
    __log_reporting__?: LogReportingType;
    __log_reporting_init__?: boolean;
}
type AnyFun = (...args: any[]) => any;
type AnyObject = {
    [key: string]: any;
};
type LoggerType = Logger;
type LogFun = (title: string, content: string) => void;
interface IReource {
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
interface IPerformance {
    dns: number;
    tcp: number;
    ssl: number;
    ttfb: number;
    render: number;
    dom: number;
    load: number;
    total: number;
}
interface IELBindType {
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
interface IErrorType {
    bubbles: boolean;
    eventType: string;
    isTrusted: boolean;
    errorMessage: string;
    stackMessage: string;
    filename: string;
    colno: number;
    lineno: number;
    time: number;
    timeStamp: number;
    el: IELBindType;
}
interface IXhrOpenType {
    method: string;
    url: string;
    params: AnyObject | string;
    status: number;
    message: string;
}
interface IConsoleErrorType {
    errorMessage: string;
    time: number;
    colno: number;
    lineno: number;
    stackMessage: string;
    fileName: string;
}
interface RecordEventScope {
    time: string;
    eventList: any[];
}
interface IPv {
    message?: string;
    [k: string]: any;
}
interface IExposure extends IPv {
    threshold?: number;
    target?: any;
    params?: Record<string, any>;
    time?: number;
}

export { AnyFun, AnyObject, IBaseOptions, IConsoleErrorType, IELBindType, IErrorType, IExposure, IPerformance, IPv, IReource, IWindow, IXhrOpenType, LogFun, LogReportingType, LoggerType, RecordEventScope };
