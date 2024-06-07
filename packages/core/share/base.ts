import { IBaseOptions } from '../types';
import { _support } from './global';

export class BaseInfo {
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
