import * as RRweb from 'rrweb';
export declare class RecordScreen {
  snapshot: Record<string, any>[];
  closeCallback: ReturnType<typeof RRweb.record>;
  constructor();
  init(): void;
  close(): void;
}
export declare function initRecord(): void;
