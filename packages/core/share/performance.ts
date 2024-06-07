import { _support } from './global';
import { IPerformance } from '@log-reporting/types';

export class PerformanceClass {
  public data: IPerformance;
  constructor(performance: IPerformance) {
    this.data = performance;
  }
}

export let performance: PerformanceClass;
export function initPerformanceOptions(performanceData: IPerformance) {
  if (!_support.baseInfo?.options?.isPerformance) return;
  performance = new PerformanceClass(performanceData);
  _support.performance = performance;
}
