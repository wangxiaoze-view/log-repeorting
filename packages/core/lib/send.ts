import { _support } from '../share/global';
import { getNavigator } from '../share/navigator';
//@ts-expect-error ts版本过低
import lz from 'lz-string';
import { EVENT_TYPES } from '../enum';
//@ts-expect-error ts版本过低
import { Base64 } from 'js-base64';
import { logger } from '@log-reporting/logger';

// 加密
export function encryptFun(value: Record<string, any>, k?: string) {
  const data = JSON.stringify(value);
  const method = _support.baseInfo.options.encryptMethod;
  if (method === 'lz') {
    return lz.compress(data);
  } else if (method === 'base64') {
    return Base64.encode(data);
  }
  return k === 'snapshot' ? Base64.encode(data) : Base64.encode(data);
}

// 解密
export function decryptionFun(value: string, k: string) {
  const method = _support.baseInfo.options.encryptMethod;
  if (method === 'lz') {
    return lz.decompress(value);
  } else if (method === 'base64') {
    return Base64.decode(value);
  }
  return k === 'snapshot' ? Base64.decode(value) : Base64.decode(value);
}

function sendBeacon(url: string, params: string) {
  return new Promise(resolve => {
    navigator.sendBeacon(url, params);
    resolve(true);
  });
}

function sendXhr(url: string, params: any) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.open('post', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(params);
    resolve(true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        resolve(true);
      }
    };
  });
}

export function sendReport(eventId: EVENT_TYPES, errorData: Record<string, any>) {
  // 不开启则不会上报
  if (!_support.baseInfo.options.isReport) return;
  const params = {
    appId: _support.baseInfo.options.appId,
    baseInfo: {
      title: document.title,
      url: location.href,
      date: Date.now(),
      ...getNavigator(),
    },
    reportInfo: {
      eventId,
      snapshot: encryptFun(_support.record.snapshot, 'snapshot'),
      ...errorData,
    },
  };

  const dsn = _support.baseInfo.options.dsn;
  const method = _support.baseInfo.options!.method ?? 'beacon';

  const stringParams = JSON.stringify(params);

  return new Promise(resolve => {
    switch (method) {
      case 'beacon':
        sendBeacon(dsn, stringParams).then(() => {
          resolve({ type: 'xhr', success: true });
        });
        break;
      case 'xhr':
        sendXhr(dsn, stringParams).then(() => {
          resolve({ type: 'xhr', success: true });
        });
        break;
      default:
        logger.warn('上报方式不支持:', "上报方式只支持 'beacon' 和 'xhr'");
        break;
    }
  });
}
