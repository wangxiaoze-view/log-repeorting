// 各个类型错误枚举
export enum EVENT_TYPES {
  // error
  ERROR = 'error',
  // promise
  UNHANDLEDREJECTION = 'unhandledrejection',
  // console.error
  CONSOLE_ERROR = 'consoleError',
  // xhr
  XHR = 'xhr',
  // fetch
  FETCH = 'fetch',
}

export enum ERROR_TYPES {
  // js
  JS = 'js_error',
  // promise
  PROMISE = 'promise_error',
  // console.error
  CONSOLE_ERROR = 'console_error',
  // xhr
  XHR = 'xhr_error',
  // fetch
  FETCH = 'fetch_error',
}
