//  事件总线，订阅发布

import { EVENT_TYPES } from '../enum';
import { AnyFun } from '../types';
import { _support } from '../share/global';

export class EventBus {
  static _instance: EventBus;
  public _eventMap: Map<EVENT_TYPES, Array<AnyFun>>;
  constructor() {
    this._eventMap = new Map();
  }

  public static getInstance(): EventBus {
    if (!this._instance) {
      this._instance = new EventBus();
    }
    return this._instance;
  }
  public on(event: EVENT_TYPES, callback: AnyFun) {
    if (!this._eventMap.has(event)) {
      this._eventMap.set(event, []);
    }
    this._eventMap.get(event)?.push(callback);
  }
  public emit(event: EVENT_TYPES, ...args: any[]) {
    if (this._eventMap.has(event)) {
      this._eventMap.get(event)?.forEach(callback => {
        callback(...args);
      });
    }
  }

  public off(event: EVENT_TYPES, callback: AnyFun) {
    if (this._eventMap.has(event)) {
      this._eventMap.get(event)?.forEach((cb, index) => {
        if (cb === callback) {
          this._eventMap.get(event)?.splice(index, 1);
        }
      });
    }
  }

  public once(event: EVENT_TYPES, callback: AnyFun) {
    if (this._eventMap.has(event)) {
      this._eventMap.get(event)?.forEach((cb, index) => {
        if (cb === callback) {
          this._eventMap.get(event)?.splice(index, 1);
        }
      });
    }
  }
}

const eventBus = _support.eventBus || (_support.eventBus = EventBus.getInstance());

export { eventBus };
