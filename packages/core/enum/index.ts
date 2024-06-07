// 各个类型错误枚举
export enum EVENT_TYPES {
  // error
  ERROR = 'error',
  // promise
  UNHANDLEDREJECTION = 'unhandledrejection',
  // console.error
  CONSOLE_ERROR = 'consoleError',
  // event
  CLICK = 'click',
  // loading
  LOAD = 'load',
  BEFORE_UN_LOAD = 'beforeunload',
  // xhr
  XHR = 'xhr',
  // fetch
  FETCH = 'fetch',
}
