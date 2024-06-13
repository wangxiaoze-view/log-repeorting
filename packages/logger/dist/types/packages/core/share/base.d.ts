import { IBaseOptions } from '@log-reporting/types';
export declare class BaseInfo {
  options: IBaseOptions;
  constructor(options: IBaseOptions);
}
export declare let baseInfo: BaseInfo;
export declare function initBaseOptions(options: IBaseOptions): void;
