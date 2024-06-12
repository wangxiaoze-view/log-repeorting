import { ERROR_TYPES, EVENT_TYPES } from '../enum';
import { getParams, isKeyValid, on } from '../utils';
import { _global, _support } from '../share/global';
import { eventBus } from './eventBus';
import { IXhrOpenType } from '@log-reporting/types';
import { getError, getErrorStackLine, getFetchError, getPromiseError, getXhrError } from './error';

// 下面的代码基本不会去改动，改动基本0

// 重写各类拦截错误的方法
export function initReWrite(): void {
  for (const key in EVENT_TYPES) {
    if (isKeyValid(key, EVENT_TYPES)) {
      reWriteFun(key);
    }
  }
}

// 重写各类拦截错误的方法
// 可以用if判断， 不过不建议那样做；
function reWriteFun(type: string) {
  if (!isKeyValid(type, EVENT_TYPES)) return;
  const k = EVENT_TYPES[type as keyof typeof EVENT_TYPES];
  switch (k) {
    case EVENT_TYPES.ERROR:
      listenError(k);
      break;
    case EVENT_TYPES.CONSOLE_ERROR:
      listenConsole(k);
      break;
    case EVENT_TYPES.UNHANDLEDREJECTION:
      listenUnhandledrejection(k);
      break;
    case EVENT_TYPES.XHR:
      listenXhr(k);
      break;
    case EVENT_TYPES.FETCH:
      listenFetch(k);
      break;

    default:
      break;
  }
}

// 监听错误
function listenError(type: EVENT_TYPES) {
  if (!_support.baseInfo.options.isError) return;

  on(
    _global,
    type,
    (e: ErrorEvent) =>
      eventBus.emit(type, {
        errorType: ERROR_TYPES.JS,
        ...getError(e),
      }),
    true,
  );
}
// 重写 console.error
function listenConsole(type: EVENT_TYPES) {
  if (!_support.baseInfo.options.isConsoleError) return;
  const oldConsole = console['error'];
  console['error'] = function (...args: any[]) {
    const errorMessage = args
      .map(arg => (typeof arg === 'string' ? arg : JSON.stringify(arg)))
      .join(' ');

    const error = new Error(errorMessage);
    eventBus.emit(type, {
      errorType: ERROR_TYPES.CONSOLE_ERROR,
      ...getErrorStackLine(error),
    });
    oldConsole.apply(console, args);
  };
}

function listenUnhandledrejection(type: EVENT_TYPES) {
  if (!_support.baseInfo.options.isError) return;

  on(_global, type, e =>
    eventBus.emit(type, {
      errorType: ERROR_TYPES.PROMISE,
      ...getPromiseError(e),
    }),
  );
}

function listenXhr(type: EVENT_TYPES) {
  if (!_support.baseInfo.options.isXhr) return;

  if (!('XMLHttpRequest' in _global)) return;

  const _config: Partial<IXhrOpenType> = {};
  const ajaxSend = XMLHttpRequest.prototype.send;
  const ajaxOpen = XMLHttpRequest.prototype.open;

  XMLHttpRequest.prototype.open = function (method: string, url: string) {
    _config.method = method;
    _config.url = url as string;
    return ajaxOpen.call(this, method, url, true);
  };

  XMLHttpRequest.prototype.send = function (body: any) {
    // get
    if (
      ['get', 'delete'].includes(_config.method!.toLowerCase()) &&
      _config.url &&
      _config.url.indexOf('?') !== -1
    ) {
      const url = _config.url?.substring(_config.url.indexOf('?') + 1);
      _config.params = getParams(url);
    }

    const getCommonConfig = (): IXhrOpenType => {
      return {
        method: _config.method!.toLowerCase(),
        url: _config.url || '',
        status: this.status,
        params:
          typeof (body || _config.params) === 'string'
            ? body || _config.params
            : JSON.stringify(body || _config.params),
        message: this.statusText,
      };
    };

    const errorType = {
      errorType: ERROR_TYPES.XHR,
    };

    this.addEventListener('readystatechange', e => {
      if (this.readyState === 4) {
        if (this.status < 200 || this.status >= 300) {
          eventBus.emit(type, {
            ...errorType,
            ...getXhrError(e, getCommonConfig()),
          });
        }
      }
    });

    this.addEventListener(
      'error',
      e => {
        eventBus.emit(type, {
          ...errorType,
          ...getXhrError(e, getCommonConfig()),
        });
      },
      false,
    );

    this.addEventListener(
      'abort',
      e => {
        eventBus.emit(type, {
          ...errorType,
          ...getXhrError(e, getCommonConfig()),
        });
      },
      false,
    );
    return ajaxSend.call(this, body);
  };
}

function listenFetch(type: EVENT_TYPES) {
  if (!_support.baseInfo.options.isXhr) return;

  if (!('fetch' in _global)) return;
  const nativeFetch = _global.fetch;
  const _config: Partial<IXhrOpenType> = {};

  const errorType = {
    errorType: ERROR_TYPES.FETCH,
  };

  _global.fetch = function traceFetch(target, options = {}) {
    const { method = 'GET' } = options || { method: 'GET', body: {} };

    _config.method = method.toLowerCase();
    _config.url = target.toString();

    if (['get', 'delete'].includes(_config.method.toLowerCase()) && _config.url) {
      const url = _config.url?.substring(_config.url.indexOf('?') + 1);
      _config.params = getParams(url);
    }

    if (['post', 'put'].includes(_config.method.toLowerCase())) {
      _config.params = JSON.stringify(options.body || {});
    }

    const result = nativeFetch(target, options);

    result.then(
      res => {
        if (res.status < 200 || res.status >= 300) {
          res.text().then(() => {
            const params: IXhrOpenType = {
              method: _config.method!.toLowerCase(),
              url: _config.url || '',
              status: res.status,
              params: _config.params || {},
              message: res.statusText,
            };
            eventBus.emit(type, {
              ...errorType,
              ...getFetchError(params),
            });
          });
        }
      },
      e => {
        const params: IXhrOpenType = {
          method: _config.method!.toLowerCase(),
          url: _config.url || '',
          status: 500,
          params: _config.params || {},
          message: '请求失败',
        };
        eventBus.emit(type, {
          ...errorType,
          ...getFetchError(params, getErrorStackLine(e)),
        });
      },
    );
    return result;
  };
}
