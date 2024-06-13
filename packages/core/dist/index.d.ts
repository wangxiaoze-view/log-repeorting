import { IWindow, LogReportingType, IExposure, IPv, IBaseOptions } from '@log-reporting/types';

declare const _global: IWindow;
declare const _support: LogReportingType;

declare function encryptFun(value: Record<string, any>, k?: string): string;
declare function decryptionFun(value: string, k: string): string;

declare function lestenExposure(target: IExposure[] | IExposure): void;

declare function lestenPv(options: IPv): void;

declare const _name: string;
declare const _version: string;
declare const _author: string;
declare const _description: string;
declare const init: (options?: IBaseOptions) => void;

export {
  _author,
  _description,
  _global,
  _name,
  _support,
  _version,
  decryptionFun,
  encryptFun,
  init,
  lestenExposure,
  lestenPv,
};
