import { _support } from './global';
import { IBaseOptions } from '@log-reporting/types';

export class BaseInfo {
  // 基础配置信息
  public options: IBaseOptions;

  constructor(options: IBaseOptions) {
    this.options = options;
  }
}

export let baseInfo: BaseInfo;
export function initBaseOptions(options: IBaseOptions) {
  baseInfo = new BaseInfo(options);
  _support.baseInfo = baseInfo;
}
