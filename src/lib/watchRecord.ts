import logReporting from '../index';
import * as rrweb from "rrweb";

export function watchRecord() {
    logReporting.stopFn = rrweb.record({
        emit(event, isCheckout) {
            // isCheckout 是一个标识，告诉你重新制作了快照
            isCheckout && (logReporting.snapshot = [])
            logReporting.snapshot.push(event);
        },
        checkoutEveryNms: 0.25 * 60 * 1000, // 每15s重新制作快照
        // checkoutEveryNth: 200, // 每 200 个 event 重新制作快照
    });
}