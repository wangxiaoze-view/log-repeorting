import logReporting from '../index';
import { getNavigator } from './navigator';
import dayjs from 'dayjs';

function getCommonError() {
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

  navigator.sendBeacon(logReporting.dsn, JSON.stringify(params));
}
