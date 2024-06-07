import { logger } from '@log-reporting/logger';
import { AnyFun, IBaseOptions } from '../types';

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
export function verifyBase(options: IBaseOptions) {
  if (!options.dsn || typeof options.dsn !== 'string') {
    logger.error('dsn参数错误', 'dsn地址应该为 [字符串], 例如: https://www.wangxiaoze.wang');
    return false;
  }
  return true;
}

// 检验字段是否在对象中
export function isKeyValid(key: string, obj: object) {
  // key in obj
  return Object.prototype.hasOwnProperty.call(obj, key);
}
// 事件
export function on(
  target: Window | Document | HTMLElement,
  event: string,
  callback: AnyFun,
  options = false,
) {
  target.addEventListener(event, callback, options);
}
