import { EVENT_TYPES } from '../enum';
import { isKeyValid, on } from '../utils';
import { _global } from '../share/global';
import { eventBus } from './eventBus';

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
    case EVENT_TYPES.EVENT:
      listenEvent(k);
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

function listenLoad(type: EVENT_TYPES) {
  on(_global, type, e => {
    eventBus.emit(type, e);
  });
}

function listenEvent(type: EVENT_TYPES) {
  // TODO: 监听事件
  console.log(type);
  // ["click", "touchstart", "mousedown", "keydown", "mouseover"].forEach(
  // 	eventType => {
  // 		document.addEventListener(
  // 			eventType,
  // 			event => {
  // 				console.log(event);
  // 			},
  // 			{
  // 				// 是在捕获阶段还是冒泡阶段执行
  // 				capture: true,
  // 				// 默认不阻止默认事件
  // 				passive: true,
  // 			}
  // 		);
  // 	}
  // );
}

function listenBeforeUnLoad(type: EVENT_TYPES) {
  on(_global, type, () => {
    eventBus.on(type, () => {
      console.log(123123);
    });
  });
}
