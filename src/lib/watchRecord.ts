import logReporting from '../index';
import * as rrweb from "rrweb";

export function watchRecord() {
    logReporting.stopFn = rrweb.record({
        emit(event, isCheckout) {
            // isCheckout 是一个标识，告诉你重新制作了快照
            isCheckout && (logReporting.snapshot = [])
            logReporting.snapshot.push(event);
        },
        checkoutEveryNms: 15 * 1000, // 每15s重新制作快照
        checkoutEveryNth: 200, // 每 200 个 event 重新制作快照
        // packFn: rrweb.pack,
        sampling: {
            // 不录制鼠标移动事件
            mousemove: false,
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
        }
    });
}