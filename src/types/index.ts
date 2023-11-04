export type LogConfig = {
  // 监听js报错
  watchJsError: boolean;
  // 监听资源报错
  watchSource: boolean;
  // 监听请求报错
  watchAxios: boolean;
  // 监听性能指标
  watchPerformance: boolean;
};

export type LogOptions = {
  // 上报地址
  dsn: string;
  // 是否开启调试模式
  debug: boolean;
  // 配置项
  config: LogConfig;
};

export type ErrorData = {
  type: string;
  eventType: string;
  errorType: string;
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
};
