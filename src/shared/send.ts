import logReporting from '../index';
import { getNavigator } from './navigator';
import dayjs from 'dayjs';

function getCommonError() {
  // 获取5s之前的快照
  // const time = dayjs().subtract(5, 'second').format('YYYY-MM-DD HH:mm:ss');
  // const snapshot = logReporting.snapshot.filter(i => {
  //   return i.timestamp >= new Date(time).getTime();
  // });

  return {
    title: document.title,
    url: location.href,
    date: dayjs(Date.now()).format('YYYY-MM-DD'),
    dateTime: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    snapshot: JSON.stringify(logReporting.snapshot),
    ...getNavigator(),
  };
}

export function sendReport(errorData: Record<string, any>) {
  const common = getCommonError();
  const params = {
    ...common,
    ...errorData,
  };

  navigator.sendBeacon(logReporting.getConfigValue('sdn'), JSON.stringify(params));
}
