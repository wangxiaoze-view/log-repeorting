import { initPerformanceOptions } from '../share/performance';
import { initReourceOptions } from '../share/reource';
import { getNavigation } from '../utils';

export function initPerformance() {
  const observer = new PerformanceObserver(() => {});
  observer.observe({ type: 'navigation', buffered: true });
  observer.observe({ type: 'resource', buffered: true });

  const entries = observer.takeRecords();
  const navigation = entries.find(i => i.entryType === 'navigation');
  if (navigation) initPerformanceOptions(getNavigation(navigation));

  const sources = entries.filter(i => i.entryType === 'resource');
  initReourceOptions(sources);
}
