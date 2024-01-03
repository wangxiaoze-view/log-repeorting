import logReporting from '../index';
import { getNavigator } from './navigator';
import dayjs from 'dayjs';
import lz from 'lz-string'

function getCommonError() {
  return {
    title: document.title,
    url: location.href,
    date: dayjs(Date.now()).format('YYYY-MM-DD'),
    dateTime: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    // snapshot: JSON.stringify(logReporting.snapshot),
    // 这里使用 lz-string进行压缩, 但是在返回的数据哪里需要解压
    snapshot: lz.compress(JSON.stringify(logReporting.snapshot)),
    ...getNavigator(),
  };
}

export function sendReport(errorData: Record<string, any>) {
  const common = getCommonError();
  const params = {
    ...common,
    ...errorData,
  };

  if (logReporting.logMethod === 'fetch') {
    fetch(logReporting.dsn, {
      method: 'POST',
      body: JSON.stringify(params)
    }).then()
  } else if (logReporting.logMethod === 'sendBeacon') {
    navigator.sendBeacon(logReporting.dsn, JSON.stringify(params));
    // navigator.sendBeacon(logReporting.dsn,  new Blob([JSON.stringify(params)], {
    //   type: 'text/plain' // 不指定 type 或者指定为空字符串也是不行的
    // }));
  }
}
