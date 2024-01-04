import {ErrorData, LoggerType} from "./types";
import dayjs from "dayjs";

enum LoggerTypeConfig {
    log = 'SDK-LOG',
    warn = 'SDK-WARNING',
    error = 'SDK-ERROR',
    info = 'SDK-INFO',
}

export class Logger {
    public debug: boolean | undefined;

    time(time?: Date, format = 'YYYY-MM-DD HH:mm:ss') {
        return dayjs(time).format(format);
    }

    logger(type: LoggerType, message: string) {
        return {
            title: `%c日志上报系统${LoggerTypeConfig[type] || ''}====>` + ` 时间:${this.time()}  错误信息: ${message || '-'}`,
            cs: 'background: #ecf5ff;color:#409eff;padding: 2px 4px;font-size: 12px;font-weight: 600;'
        }
    }

    console(
        type: LoggerType,
        message: string,
        error?: ErrorData | Record<string, any>,
    ) {
        if (!this.debug) return;
        const {title, cs} = this.logger(type, message)
        console.log(title, cs);
        error && console.table(error);
    }
}