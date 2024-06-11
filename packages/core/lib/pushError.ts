import { logger } from '@log-reporting/logger';
import { EVENT_TYPES } from '../enum';
import { _global, _support } from '../share/global';
import { isKeyValid } from '../utils';
import { eventBus } from './eventBus';
import { sendReport } from './send';

export function initPushError() {
  for (const key in EVENT_TYPES) {
    if (isKeyValid(key, EVENT_TYPES)) {
      pushFun(key);
    }
  }
}

function pushFun(type: string) {
  if (!isKeyValid(type, EVENT_TYPES)) return;

  const k = EVENT_TYPES[type as keyof typeof EVENT_TYPES];
  switch (k) {
    case EVENT_TYPES.ERROR:
      pushError(k);
      break;
    case EVENT_TYPES.CONSOLE_ERROR:
      pushConsole(k);
      break;
    case EVENT_TYPES.UNHANDLEDREJECTION:
      pushUnhandledrejection(k);
      break;
    case EVENT_TYPES.XHR:
      pushXhr(k);
      break;
    case EVENT_TYPES.FETCH:
      pushFetch(k);
      break;
    default:
      break;
  }
}

function pushError(type: EVENT_TYPES) {
  eventBus.on(type, errorOptions => {
    if (_support.baseInfo.options.isDebug) {
      logger.error('js逻辑错误：', JSON.stringify(errorOptions));
    }
    sendReport(errorOptions);
  });
}

function pushConsole(type: EVENT_TYPES) {
  eventBus.on(type, errorOptions => {
    if (_support.baseInfo.options.isDebug) {
      logger.info('console错误：', JSON.stringify(errorOptions));
    }
    sendReport(errorOptions);
  });
}

function pushUnhandledrejection(type: EVENT_TYPES) {
  eventBus.on(type, errorOptions => {
    if (_support.baseInfo.options.isDebug) {
      logger.error('Promise错误：', JSON.stringify(errorOptions));
    }
    sendReport(errorOptions);
  });
}

function pushXhr(type: EVENT_TYPES) {
  if (!('XMLHttpRequest' in _global)) return;
  eventBus.on(type, errorOptions => {
    if (_support.baseInfo.options.isDebug) {
      logger.error('xhr接口错误：', JSON.stringify(errorOptions));
    }
    sendReport(errorOptions);
  });
}

function pushFetch(type: EVENT_TYPES) {
  if (!('fetch' in _global)) return;
  eventBus.on(type, errorOptions => {
    if (_support.baseInfo.options.isDebug) {
      logger.error('fetch接口错误：', JSON.stringify(errorOptions));
    }
    sendReport(errorOptions);
  });
}
