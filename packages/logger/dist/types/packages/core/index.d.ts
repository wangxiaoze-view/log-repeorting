import { _global, _support } from './share/global';
import { IBaseOptions } from '@log-reporting/types';
import { decryptionFun, encryptFun } from './lib/send';
import { lestenExposure } from './lib/exposure';
import { lestenPv } from './lib/pv';
declare const _name: string;
declare const _version: string;
declare const _author: string;
declare const _description: string;
declare const init: (options?: IBaseOptions) => void;
export {
  init,
  encryptFun,
  decryptionFun,
  lestenPv,
  lestenExposure,
  _global,
  _support,
  _name,
  _version,
  _author,
  _description,
};
