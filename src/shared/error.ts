/**
 * @description 对异常日志处理的返回数据
 */

import getErrorEle from './getErrorEle';
import {ErrorData} from '../types';

/**
 * @description 错误栈读取对应的栈信息
 * @param stack
 */
function formatStack(stack: string) {
    // 截取at 之后的错误栈
    return (stack || '')
        .split('\n')
        .slice(1)
        .map(item => item.replace(/^\s+at\s+/g, ''))
        .join('~~');
}

/**
 * @description 资源错误返回数据
 * @param event
 */
export function getSourceError(event: ErrorEvent): ErrorData {
    const target = event.target as HTMLScriptElement & HTMLLinkElement;
    return {
        type: 'Error',
        // 操作类型  load, Error
        eventType: event.type,
        // 错误类型：资源错误
        errorType: 'Resource Error',
        // 事件发生时的时间戳
        timeStamp: Math.round(event.timeStamp),
        // 事件是否由用户行为生成
        isTrusted: event.isTrusted,
        // 发生时间
        time: Date.now(),
        // 报错的文件路径
        path: target.src || target.href,
        // 报错元素节点
        nodeName: target.nodeName,
    };
}

/**
 * @description js报错返回数据
 * @param event
 */
export function getJsError(event: ErrorEvent): ErrorData {
    let error = getErrorEle();
    return {
        type: 'Error',
        // 操作类型  load, Error
        eventType: event.type,
        // 错误类型：资源错误
        errorType: 'JS Error',
        // 事件发生时的时间戳
        timeStamp: Math.round(event.timeStamp),
        // 事件是否由用户行为生成
        isTrusted: event.isTrusted,
        // 发生时间
        time: Date.now(),
        // 报错的文件路径
        path: error.target ? error.target.outerHTML : '',
        // 报错元素节点
        nodeName: error.target.nodeName,
        //   错误信息
        message: event.message,
        // 错误栈
        stack: formatStack(event.error.stack),
        // 错误文件
        filename: event.filename,
        // 列
        colno: event.colno,
        // 行
        lineno: event.lineno,
    };
}

/**
 * @description 针对于promise的错误数据处理
 * @param event
 * @param options
 */
export function promiseError(event: PromiseRejectionEvent | any, options = {}): ErrorData {
    let error = getErrorEle();
    let message;
    let filename;
    let line = 0;
    let column = 0;
    let stack = '';
    let reason = event.reason;
    if (typeof reason === 'string') {
        message = reason;
    } else if (typeof reason === 'object') {
        message = reason.message;
        if (reason.stack) {
            // 特殊出来，然后分解，获取对应的行号列数
            let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
            filename = matchResult[1];
            line = matchResult[2];
            column = matchResult[3];
        }
        stack = formatStack(reason.stack);
    }

    return {
        type: 'Error',
        // 操作类型  load, Error
        eventType: event.type,
        // 错误类型：资源错误
        errorType: 'Promise Error',
        // 事件发生时的时间戳
        timeStamp: Math.round(event.timeStamp),
        // 事件是否由用户行为生成
        isTrusted: event.isTrusted,
        // 发生时间
        time: Date.now(),
        // 报错的文件路径
        path: error.target ? error.target.outerHTML : '',
        // 报错元素节点
        nodeName: error.target.nodeName,
        //   错误信息
        message: message,
        // 错误栈
        stack: stack,
        // 错误文件
        filename: filename,
        // 列
        colno: Number(line),
        // 行
        lineno: Number(column),
        ...options,
    };
}

/**
 * @description ajax 处理日志处理
 * @param event
 * @param options
 */
export function axiosError(event: any, options = {}): ErrorData {
    let error = getErrorEle();
    let filename;
    let line = 0;
    let column = 0;
    if (event.stack) {
        let matchResult = event.stack.match(/at\s+(.+):(\d+):(\d+)/);
        filename = matchResult[1];
        line = matchResult[2];
        column = matchResult[3];
    }
    return {
        type: 'Error',
        // 操作类型  load, Error
        eventType: event.type,
        // 错误类型：资源错误
        errorType: 'Axios Error',
        // 事件发生时的时间戳
        timeStamp: Math.round(event.timeStamp),
        // 事件是否由用户行为生成
        isTrusted: event.isTrusted,
        // 发生时间
        time: Date.now(),
        // 报错的文件路径
        path: error.target ? error.target.outerHTML : '',
        // 报错元素节点
        nodeName: error.target.nodeName,
        //   错误信息
        message: '',
        // 错误栈
        stack: formatStack(event.stack || ''),
        // 错误文件
        filename: filename,
        // 列
        colno: Number(column),
        // 行
        lineno: Number(line),
        ...options,
    };
}
