import { IExposure } from '@log-reporting/types';
/**
 * 曝光上报
 * 查了一下资料, 网上说可以用交叉视图的方式去监听;
 * options 公共的参数
 * observerMap: 监听可以单个, 也支持多个
 * lestenExposure({ target: null, message: '曝光按钮', threshold: 0.5, params: { a: 123 } })
 * lestenExposure([{ target: null, message: '曝光按钮', threshold: 0.5, params: { a: 123 } }])
 * targetMap: 没有曝光的元素才会进行曝光
 *
 */
export declare class Exposure {
    private options;
    observerMap: WeakMap<IExposure, IntersectionObserver>;
    targetMap: IExposure[];
    constructor();
    init(item: IExposure): IntersectionObserver;
    observer(targetData: IExposure[] | IExposure): void;
    unobserver(target: Element[] | Element): void;
}
export declare let exposure: Exposure;
export declare function initExposure(): void;
export declare function lestenExposure(target: IExposure[] | IExposure): void;
