import { EVENT_TYPES } from '../enum';
import { AnyFun } from '@log-reporting/types';
export declare class EventBus {
  static _instance: EventBus;
  _eventMap: Map<EVENT_TYPES, Array<AnyFun>>;
  constructor();
  static getInstance(): EventBus;
  on(event: EVENT_TYPES, callback: AnyFun): void;
  emit(event: EVENT_TYPES, ...args: any[]): void;
  off(event: EVENT_TYPES, callback: AnyFun): void;
  once(event: EVENT_TYPES, callback: AnyFun): void;
}
declare const eventBus: EventBus;
export { eventBus };
