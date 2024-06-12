import { IPv } from '@log-reporting/types';
import { EVENT_TYPES } from '../enum';
import { _support } from '../share/global';
import { sendReport } from './send';
import { eventBus } from './eventBus';

// 搜集到之后进行上报
export function initPv() {
  if (!_support.baseInfo.options.isPv) return;
  eventBus.on(EVENT_TYPES.PV, options => {
    sendReport(EVENT_TYPES.PV, { ...options, snapshot: [] });
  });
}

// 搜集pv
export function lestenPv(options: IPv) {
  if (!_support.baseInfo.options.isPv) return;
  eventBus.emit(EVENT_TYPES.PV, options);
}
