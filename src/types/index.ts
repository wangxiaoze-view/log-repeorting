export type LogConfig = {
    // 是否使用rrWeb
    isRecord: boolean,
    // 录制时间
    recordTime: number,
    // 页面准备好，是否就开始监听
    watchReady: boolean
    // 监听js报错
    watchJsError: boolean;
    // 监听资源报错
    watchSource: boolean;
    // 监听请求报错
    watchAxios: boolean;
};
export type LogMethodType = 'sendBeacon' | 'fetch'
export type LogOptions = {
    // 上报地址
    dsn: string;
    // 是否开启调试模式
    debug: boolean;
    // 上报的方式
    logMethod: LogMethodType,
    // 配置项
    config: LogConfig;
};
export type ErrorDataType = 'Error'
export type ErrorDataErrorType = 'Resource Error' | 'JS Error' | 'Promise Error' | 'Axios Error'
// 统一错误信息
export type ErrorData = {
    type: ErrorDataType;
    eventType: string;
    errorType: ErrorDataErrorType;
    timeStamp: number;
    isTrusted: boolean;
    time: number;
    path: string;
    nodeName: string;
    message?: string;
    stack?: string;
    filename?: string;
    colno?: number;
    lineno?: number;
    [k: string]: any
};
export type LoggerType = 'log' | 'warn' | 'error' | 'info'