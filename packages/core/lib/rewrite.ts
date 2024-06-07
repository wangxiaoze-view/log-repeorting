import { EVENT_TYPES } from '../enum';
import { isKeyValid, on } from '../utils';
import { _global } from '../share/global';
import { eventBus } from './eventBus';
import getErrorEle from './getErrorEle';

// 重写各类拦截错误的方法
export function initReWrite(): void {
  for (const key in EVENT_TYPES) {
    if (isKeyValid(key, EVENT_TYPES)) {
      reWriteFun(key);
    }
  }
}

// 重写各类拦截错误的方法
function reWriteFun(type: string) {
  if (!isKeyValid(type, EVENT_TYPES)) return;

  const k = EVENT_TYPES[type as keyof typeof EVENT_TYPES];
  switch (k) {
    case EVENT_TYPES.ERROR:
      listenError(k);
      break;
    case EVENT_TYPES.CONSOLE_ERROR:
      listenConsole(k);
      break;
    case EVENT_TYPES.CLICK:
      // listenClick(k);
      break;
    case EVENT_TYPES.LOAD:
      listenLoad(k);
      break;
    case EVENT_TYPES.BEFORE_UN_LOAD:
      listenBeforeUnLoad(k);
      break;
    default:
      break;
  }
}

// 监听错误
function listenError(type: EVENT_TYPES) {
  on(
    _global,
    type,
    (e: ErrorEvent) => {
      const error = getErrorEle();
      console.log(error);
      eventBus.emit(type, e);
    },
    true,
  );
}

// 重写 console.error
function listenConsole(type: EVENT_TYPES) {
  const oldConsole = console['error'];
  console['error'] = function (...args: any[]) {
    eventBus.emit(type, args);
    oldConsole.apply(console, args);
  };
}

// 页面加载
function listenLoad(type: EVENT_TYPES) {
  on(_global, type, e => {
    eventBus.emit(type, e);
  });
}

//  TODO: 或许不需要
// function listenClick(type: EVENT_TYPES) {
//   // on(_global, type, e => {
//   //   console.log(e, '-----------');
//   //   eventBus.emit(type, e);
//   // });
// }

// 页面离开加载
function listenBeforeUnLoad(type: EVENT_TYPES) {
  on(_global, type, e => {
    eventBus.emit(type, e);
  });
}
