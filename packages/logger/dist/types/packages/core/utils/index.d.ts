import { AnyFun, IBaseOptions } from '@log-reporting/types';
/**
 * 验证配置选项是否满足基础要求。
 *
 * 该函数用于在进行进一步的操作前，校验传入的配置选项是否包含了一个有效的DSN（Data Source Name）。
 * DSN是用来标识数据源的字符串，在本上下文中，它可能是用于标识日志服务的URL。
 * 如果DSN不存在或不是字符串类型，则认为配置不合法，函数将记录错误并返回false。
 * 否则，函数将返回true，表示配置满足基础要求。
 *
 * @param options 配置选项对象，包含DSN等信息。
 * @returns 如果DSN有效则返回true，否则返回false。
 */
export declare function verifyBase(options: IBaseOptions): boolean;
export declare function isKeyValid(key: string, obj: object): boolean;
export declare function on(target: Window | Document | HTMLElement, event: string, callback: AnyFun, options?: boolean): void;
export declare function getNavigation(entry: Record<string, any>): {
    dns: number;
    tcp: number;
    ssl: any;
    ttfb: number;
    render: any;
    dom: any;
    load: number;
    total: number;
};
export declare function getParams(search: string): {
    [key: string]: string;
};
