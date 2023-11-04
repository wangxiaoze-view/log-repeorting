import { axiosError } from '../shared/error';
import logReporting from '../index';
import { sendReport } from '../shared/send';

const ajaxSend = XMLHttpRequest.prototype.send;
const ajaxOpen = XMLHttpRequest.prototype.open;
const nativeFetch = window.fetch;
function initWatchAxios() {
  const _config = {
    src: '',
    method: '',
    duration: 0,
    triggerTime: 0,
  };
  XMLHttpRequest.prototype.open = function (method, url) {
    _config.method = method;
    _config.src = url as string;
    return ajaxOpen.call(this, method, url, true);
  };

  // 劫持 send方法
  XMLHttpRequest.prototype.send = function (body) {
    this.addEventListener('readystatechange', e => {
      const { readyState, status, responseText, statusText } = this;
      if (readyState === 4) {
        // 请求已完成,且响应已就绪
        if (status < 200 || status >= 300) {
          const params = {
            // 请求方式
            method: _config.method.toUpperCase(),
            // 请求路径
            path: _config.src,
            // 请求状态
            status: status,
            // 响应体
            response: responseText,
            // 参数
            params: body ? JSON.stringify(body) : '',
            message: statusText,
          };
          const sendError = axiosError(e, params);
          sendReport(sendError);
          logReporting.console('error', 'Axios相关错误!', sendError);
        }
      }
    });

    this.addEventListener(
      'error',
      e => {
        const params = {
          // 请求方式
          method: _config.method.toUpperCase(),
          // 请求路径
          path: _config.src,
          // 请求状态
          status: this.status,
          // 响应体
          response: this.response ? JSON.stringify(this.response) : '',
          // 参数
          params: body ? JSON.stringify(body) : '',
          message: this.statusText,
        };
        const sendError = axiosError(e, params);
        sendReport(sendError);
        logReporting.console('error', 'Axios相关错误!', sendError);
      },
      false,
    );
    this.addEventListener(
      'abort',
      e => {
        const params = {
          // 请求方式
          method: _config.method.toUpperCase(),
          // 请求路径
          path: _config.src,
          // 请求状态
          status: this.status + '-' + this.statusText,
          // 响应体
          response: this.response ? JSON.stringify(this.response) : '',
          // 参数
          params: body ? JSON.stringify(body) : '',
          message: this.statusText,
        };
        const sendError = axiosError(e, params);
        sendReport(sendError);
        logReporting.console('error', 'Axios相关错误!', sendError);
      },
      false,
    );

    return ajaxSend.call(this, body);
  };
}

function initWatchFetch() {
  if (nativeFetch) {
    window.fetch = function traceFetch(target, options = {}) {
      const { method = 'GET' } = options;
      const result = nativeFetch(target, options);
      result.then(
        res => {
          const { url, status, statusText } = res;
          if (status < 200 || status >= 300) {
            console.log(res, 111);
            res.text().then(responseText => {
              const params = {
                // 请求方式
                method: method,
                // 请求路径
                path: url,
                // 请求状态
                status: status,
                // 响应体
                response: responseText,
                // 参数
                params: options.body || '',
                // 消息
                message: statusText,
                errorType: 'Fetch Error',
              };

              const sendError = axiosError(
                {
                  eventType: res.type,
                  timeStamp: Date.now(),
                },
                params,
              );
              sendReport(sendError);
              logReporting.console('error', 'Fetch相关错误!', sendError);
            });
          }
        },
        e => {
          // 无法发起请求,连接失败
          const params = {
            // 请求方式
            method: method,
            // 请求路径
            path: target.toString(),
            // 请求状态
            status: '500',
            // 响应体
            response: e.message,
            // 参数
            params: options.body || '',
            message: 'fetchError',
            errorType: 'Fetch Error',
          };
          const sendError = axiosError(
            {
              ...e,
              type: '',
              isTrusted: false,
              timeStamp: Date.now(),
            },
            params,
          );
          sendReport(sendError);
          logReporting.console('error', 'Fetch相关错误!', sendError);
        },
      );
      return result;
    };
  }
}

export function watchAxios() {
  // 这里针对于请求的拦截， 需要重写相关api,
  initWatchAxios();
  initWatchFetch();
}

export const cancelRequest = () => {
  window.fetch = nativeFetch;
  XMLHttpRequest.prototype.open = ajaxOpen;
  XMLHttpRequest.prototype.send = ajaxSend;
};
