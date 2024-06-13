import { IPerformance } from '@log-reporting/types';
export declare class PerformanceClass {
  data: IPerformance;
  constructor(performance: IPerformance);
}
export declare let performance: PerformanceClass;
export declare function initPerformanceOptions(performanceData: IPerformance): void;
