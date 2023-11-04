import logReporting from '../index';
import { getNavigator } from './navigator';

function getCommonError() {
  return {
    title: document.title,
    url: location.href,
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
