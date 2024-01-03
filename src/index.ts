import {LogConfig, LogMethodType, LogOptions} from './types';
import {watchJsError, watchReadyError, removeJsError} from './lib/watchJsError';
import {cancelRequest, watchAxios} from './lib/watchAxios';
import {Logger} from "./logger";
import {watchRecord} from "./lib/watchRecord";


class LogReporting extends Logger {
    // 录制的片段信息
    public snapshot: Record<string, any>[] = []
    // 是否停止录制
    public stopFn: any = null
    // dsn
    public dsn: string = ''
    // 上报地址
    public logMethod: LogMethodType = 'fetch';
    // 全局配置信息
    public config: LogConfig | Record<string, any> = {};
    // 全部参数, 适用于重新执行
    public options: LogOptions | Record<string, any> = {}

    constructor() {
        super();
    }

    init(options: LogOptions) {
        try {
            this.validateConfig(options).then(initSuccess => {
                if (!initSuccess) return
                this.console('info', '欢迎使用【log-reporting】日志上报系统!');
                // 是否开启录制
                this.config.isRecord && watchRecord();
                // 页面准备好就开始监听
                this.config.watchReady && watchReadyError();
                // 搜集js报错, 资源报错
                this.config.watchJsError && watchJsError();
                // 监听请求报错
                this.config.watchAxios && watchAxios();
            });
        } catch (e) {
            this.console('error', (e as any).message, options)
        }
    }

    // 校验参数完整性
    validateConfig(options: LogOptions) {
        return new Promise<boolean>((resolve, reject) => {
            const keys = Object.keys(options);
            const {dsn, debug, config, logMethod} = options
            // 没有传入对应的参数报错提示
            if (!options || !keys.length) {
                return reject({
                    message: '初始化参数错误!',
                });
            }
            if (!options.dsn) {
                return reject({
                    message: 'dsn不能为空!',
                });
            }
            // 上报地址
            this.dsn = dsn || ''
            // 上报的方式, 默认fetch
            this.logMethod = logMethod || 'fetch'
            // 如果没有设置，默认为debug模式，debug将会打印所有报错的信息
            // debug 默认开启
            this.debug = debug || true
            // 初始化config参数
            this.config = config || {}
            // 临时值，初始化所有参数
            this.options = options || {}
            resolve(true);
        });
    }

    // 销毁
    destroy() {
        // 销毁全局变量
        this.snapshot = []
        this.stopFn = null
        this.dsn = ''
        this.config = {}
        this.debug = false
        // 元素事件
        this.config.watchReady && removeJsError('load');
        this.config.watchJsError && removeJsError('js');
        // 请求事件
        cancelRequest();
    }

    // 重新执行
    afresh() {
        this.init(this.options as LogOptions)
    }
}

const logReporting = new LogReporting();
(window as any).logReporting = logReporting;
export default logReporting;
