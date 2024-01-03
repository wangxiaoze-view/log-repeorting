import { getJsError, getSourceError, promiseError } from '../shared/error';
import { sendReport } from '../shared/send';
import logReporting from '../index';
import { eachLoadResource } from './renderLinks';

/**
 * @description 特殊拦截, 拦截promise异常
 * @param error
 */
function unhandledrejection(error: PromiseRejectionEvent) {
  const sendError = promiseError(error);
  sendReport(sendError);
  logReporting.console('error', 'Promise相关错误!', sendError);
}

/**
 * @description js,资源拦截：js拦截错误信息, 资源拦截状态
 * @param error
 */
function eventError(error: ErrorEvent | Event) {
  if (error.cancelable) {
    const sendError = getJsError(<ErrorEvent>error);
    sendReport(sendError);
    logReporting.console('error', 'JS逻辑错误, 请检查逻辑是否正确!', sendError);
  } else {
    if (!logReporting.config.watchSource) return;
    const sendError = getSourceError(<ErrorEvent>error);
    sendReport(sendError);
    logReporting.console('error', '资源加载失败, 请检查资源地址是否引入正确!', sendError);
  }
}

export function watchJsError() {
  // 初始化JS、资源加载、Promise、log.error监听
  window.addEventListener('unhandledrejection', unhandledrejection);
  window.addEventListener('error', eventError, true);
}

export function watchReadyError() {
  window.addEventListener('load', eachLoadResource, true);
}

export function removeJsError(type: 'load' | 'js') {
  if (type === 'load') {
    window.addEventListener('load', eachLoadResource);
  } else if (type === 'js') {
    window.removeEventListener('unhandledrejection', unhandledrejection);
    window.removeEventListener('error', eventError);
  }
}
