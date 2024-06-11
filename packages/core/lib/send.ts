import { _support } from '../share/global';
import { getNavigator } from '../share/navigator';
import lz from 'lz-string';
function getCommonError() {
  return {
    title: document.title,
    url: location.href,
    date: Date.now(),
    // snapshot: JSON.stringify(logReporting.snapshot),
    // 这里使用 lz-string进行压缩, 但是在返回的数据哪里需要解压
    snapshot: lz.compress(JSON.stringify(_support.record.snapshot)),
    ...getNavigator(),
  };
}

export function sendReport(errorData: Record<string, any>) {
  const common = getCommonError();
  const params = {
    ...common,
    ...errorData,
  };

  navigator.sendBeacon(_support.baseInfo.options.dsn, JSON.stringify(params));
}
