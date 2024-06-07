import { EVENT_TYPES } from '../enum';
import { isKeyValid } from '../utils';
import { eventBus } from './eventBus';

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
    case EVENT_TYPES.LOAD:
      pushLoad(k);
      break;
    default:
      break;
  }
}

function pushLoad(type: EVENT_TYPES) {
  eventBus.on(type, e => {
    console.log('load', e);
  });

  eventBus.on(EVENT_TYPES.ERROR, e => {
    console.log('err', e);
  });
}
