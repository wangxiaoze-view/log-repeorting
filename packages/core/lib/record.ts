import { _support } from '../share/global';
import * as RRweb from 'rrweb';

const MAX_time = 60 * 1000;
export class RecordScreen {
  // 视频录制信息
  public snapshot: Record<string, any>[] = [];
  closeCallback: ReturnType<typeof RRweb.record>;
  constructor() {
    this.init();
  }

  // 初始化
  init() {
    const time = _support.baseInfo.options.record.time;
    this.closeCallback = RRweb.record({
      emit: (event, isCheckout) => {
        // isCheckout 是一个标识，告诉你重新制作了快照

        isCheckout && (this.snapshot = []);
        this.snapshot.push(event);
      },
      recordCanvas: true,
      checkoutEveryNms: time >= MAX_time ? MAX_time : time,
      sampling: {
        // 不录制鼠标移动事件
        mousemove: true,
        // 设置滚动事件的触发频率
        scroll: 150, // 每 150ms 最多触发一次
        // set the interval of media interaction event
        media: 800,
        // 设置输入事件的录制时机
        input: 'last', // 连续输入时，只录制最终值
        // 定义不录制的鼠标交互事件类型，可以细粒度的开启或关闭对应交互录制
        mouseInteraction: {
          MouseUp: false,
          MouseDown: false,
          Click: false,
          ContextMenu: false,
          DblClick: false,
          Focus: false,
          Blur: false,
          TouchStart: false,
          TouchEnd: false,
        },
      },
    });
  }

  close() {
    // 关闭销毁，避免内存问题
    this.closeCallback?.();
    this.closeCallback = undefined;
  }

  // TODO: 后续添加压缩解压数据
}
let record: RecordScreen;

export function initRecord() {
  if (!_support.baseInfo.options.record || !_support.baseInfo.options.record.open) {
    // record.close();
    return;
  }
  record = new RecordScreen();
  _support.record = record;
}
