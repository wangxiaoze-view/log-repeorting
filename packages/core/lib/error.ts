import { IConsoleErrorType, IELBindType, IErrorType, IXhrOpenType } from '@log-reporting/types';
import getErrorEle from './getErrorEle';

/**
 * @description 错误栈读取对应的栈信息
 * @param stack
 */
export function formatStack(stack?: string, line: number = 1): string {
  // 截取at 之后的错误栈
  return (stack || '')
    .split('\n')
    .slice(line)
    .map(item => item.replace(/^\s+at\s+/g, ''))
    .join('~~');
}

export function getErrorStackLine(e: Error): Partial<IConsoleErrorType> {
  const regex = /http[s]?:\/\/[^:]+(:\d+)?\/([^:]+):(\d+):(\d+)/;
  const match = formatStack(e.stack).split('~~')[1].match(regex);
  if (match) {
    const fileName = match[2];
    const lineno = parseInt(match[3], 10);
    const colno = parseInt(match[4], 10);
    const errorOptions = {
      errorMessage: e.message,
      time: Date.now(),
      colno: colno,
      lineno: lineno,
      stackMessage: formatStack(e.stack),
      fileName,
    };

    return errorOptions;
  }
  return {};
}

// 处理绑定元素的模板信息
export function getErrorElInfo(): IELBindType {
  const errorEl = getErrorEle();
  let elOptions: Partial<IELBindType> = {};
  if (errorEl) {
    elOptions = {
      // 触发事件的唯一标识符
      pointerId: errorEl.pointerId,
      // 表示触发事件的设备类型（鼠标，触控笔，触摸板等）。
      pointerType: errorEl.pointerType,
      // 触发事件的时间戳
      timeStamp: errorEl.timeStamp,
      type: errorEl.type,
      layerX: errorEl.x,
      layerY: errorEl.y,
      // 元素节点
      nodeName: errorEl.target!.nodeName,
      nodeType: errorEl.target!.nodeType,
      // 元素内容
      textContent: errorEl.target!.textContent,
      // 元素calss
      className: errorEl.target!.classList.value,
      // 元素id
      elId: errorEl.target!.id,
    };
  }
  return elOptions as Required<IELBindType>;
}

// 处理通用错误信息与当前的节点进行绑定
export function getError(e: ErrorEvent): IErrorType {
  return {
    // 该事件是否会在 DOM 中冒泡
    bubbles: e.bubbles,
    // 事件的类型
    eventType: e.type,
    // 事件是否由用户行为生成
    isTrusted: e.isTrusted,
    // 错误信息
    errorMessage: e.error?.message,
    // 错误栈
    stackMessage: formatStack(e.error?.stack),
    // 脚本文件
    filename: e.filename,
    // 列
    colno: e.colno,
    // 行
    lineno: e.lineno,
    // 发生的时间
    time: Date.now(),
    // 触发事件的时间戳
    timeStamp: Math.round(e.timeStamp),
    // 绑定的元素信息
    el: getErrorElInfo(),
  };
}

// 通用promise 模板
export function getPromiseError(e: PromiseRejectionEvent): IErrorType {
  let message;
  let filename;
  let line = 0;
  let column = 0;
  let stack = '';
  const reason = e.reason;
  if (typeof reason === 'string') {
    message = reason;
  } else if (typeof reason === 'object') {
    message = reason.message;
    if (reason.stack) {
      // 特殊出来，然后分解，获取对应的行号列数
      const matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
      filename = matchResult[1];
      column = matchResult[2];
      line = matchResult[3];
    }
    stack = formatStack(reason.stack);
  }

  return {
    ...getError(e as unknown as ErrorEvent),
    //   错误信息
    errorMessage: message,
    // 错误栈
    stackMessage: stack,
    // 错误文件
    filename: filename,
    // 行
    lineno: Number(column),
    // 列
    colno: Number(line),
  };
}

export function getXhrError(
  e: Event,
  questOptions: IXhrOpenType,
): IErrorType & { questOptions: IXhrOpenType } {
  return {
    ...getError(e as unknown as ErrorEvent),
    questOptions: questOptions,
  };
}

export function getFetchError(
  questOptions: IXhrOpenType,
  otherOptions: Partial<IConsoleErrorType> = {},
) {
  return {
    questOptions: questOptions,
    el: getErrorElInfo(),
    ...otherOptions,
  };
}
