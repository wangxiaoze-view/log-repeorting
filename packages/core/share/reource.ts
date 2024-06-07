import { _support } from './global';
import { IReource } from '@log-reporting/types';

export class Reource {
  public data: Partial<IReource>[];
  constructor(reource: Partial<IReource>[]) {
    this.data = reource;
  }
}

export let reource: Reource;
export function initReourceOptions(reourceData: Partial<IReource>[]) {
  if (!_support.baseInfo?.options?.isResource) return;
  reource = new Reource(reourceData);
  _support.reource = reource;
}
