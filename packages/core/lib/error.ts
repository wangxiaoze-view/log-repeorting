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

export function getErrorStackLine(e: Error): IConsoleErrorType {
  const defaultReturen = {
    errorMessage: '',
    time: Date.now(),
    colno: 0,
    lineno: 0,
    stackMessage: '',
    fileName: '',
  };
  try {
    const regex = /http[s]?:\/\/[^:]+(:\d+)?\/([^:]+):(\d+):(\d+)/;
    const stack = formatStack(e.stack).split('~~')[1];
    if (!stack) return defaultReturen;
    const match = stack.match(regex);
    if (!match) return defaultReturen;
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
  } catch (_) {
    return defaultReturen;
  }
}

// 处理绑定元素的模板信息
export function getErrorElInfo(elTarget?: Node | Element): IELBindType {
  const errorEl = elTarget || getErrorEle();
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
      nodeName: errorEl.nodeName ?? errorEl!.target!.nodeName,
      nodeType: errorEl.nodeType ?? errorEl!.target!.nodeType,
      // 元素内容
      textContent: errorEl.textContent ?? errorEl!.target!.textContent,
      // 元素calss
      className: errorEl.className ?? errorEl!.target!.className,
      // 元素id
      elId: errorEl.id ?? errorEl.target!.id,
    };
  }
  return elOptions as Required<IELBindType>;
}

// 处理通用错误信息与当前的节点进行绑定
export function getError(e: ErrorEvent): IErrorType {
  const isOriginError = getErrorStackLine(e as unknown as Error);
  let errorOptions: IConsoleErrorType;
  // fix: 有错误信息优先取值
  if (isOriginError.stackMessage) {
    errorOptions = isOriginError;
  } else {
    errorOptions = {
      // 错误信息
      errorMessage: e.error ? e.error.message : '',
      // 错误位置
      stackMessage: formatStack(e.error?.stack),
      // 错误行数
      lineno: e.lineno,
      // 错误列数
      colno: e.colno,
      // 错误文件
      fileName: e.filename,
      time: Date.now(),
    };
  }

  return {
    // 该事件是否会在 DOM 中冒泡
    bubbles: e.bubbles,
    // 事件的类型
    eventType: e.type,
    // 事件是否由用户行为生成
    isTrusted: e.isTrusted,
    ...errorOptions,
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
    fileName: filename,
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
