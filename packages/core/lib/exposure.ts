import { IExposure } from '@log-reporting/types';
import { EVENT_TYPES } from '../enum';
import { _support } from '../share/global';
import { sendReport } from './send';
import { logger } from '@log-reporting/logger';
import { getErrorElInfo } from './error';

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
export class Exposure {
  // https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/rootMargin
  private options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5, // 阀值设为0.5，当只有比例达到一半时才触发回调函数
  };

  // 每一组数据的配置
  observerMap: WeakMap<IExposure, IntersectionObserver> = new WeakMap();

  targetMap: IExposure[] = [];

  constructor() {}

  // 初始化
  init(item: IExposure) {
    return new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            sendReport(EVENT_TYPES.EXPOSURE, {
              time: Date.now(),
              threshold: item.threshold,
              message: item.message,
              // 元素
              el: getErrorElInfo(item.target),
              snapshot: [],
            });
          }
        });
      },
      {
        ...this.options,
        threshold: item.threshold || 0.5,
      },
    );
  }

  // 监听, 可以监听多个元素
  observer(targetData: IExposure[] | IExposure) {
    const data = Array.isArray(targetData) ? targetData : [targetData];
    data.forEach(item => {
      const targetList = Array.isArray(item.target) ? item.target : [item.target];

      // this.init(item).observe(item.target);
      // const threshold = item.threshold || 0.5;
      // 既然兼容多个元素, 每个对象都要有一个observer, 那么以map的形式展示
      if (!this.observerMap.has(item)) {
        this.observerMap.set(item, this.init(item));
      }
      targetList.forEach(target => {
        // 首次曝光才会生效
        const getExit = this.targetMap.find(i => i.target === target);
        if (!getExit) {
          this.observerMap.get(item)?.observe(item.target);
          this.targetMap.push(item);
        }
      });

      // 停止监听 需要针对于某一个进行停止,那么数据就要处理
      // this.init(item).unobserve(item.target);
    });
  }

  // 对某个元素停止, 那就要找到对应的map集合, map 的key是整个对象, 只能暂时存缓存数组,再从缓存数据读取对应的内容;
  // 完成之后清空内存
  unobserver(target: Element[] | Element) {
    const data = Array.isArray(target) ? target : [target];
    data.forEach(item => {
      const findExit = this.targetMap.find(_ => _.target === item);
      const index = this.targetMap.findIndex(_ => _.target === item);
      if (findExit && this.observerMap.get(findExit)) {
        this.observerMap.get(findExit)?.unobserve(item);
        this.observerMap.delete(findExit);
        this.targetMap.slice(index, 1);
      }
    });
  }
}

export let exposure: Exposure;

export function initExposure() {
  if (!_support.baseInfo.options.isExposure) return;
  exposure = new Exposure();
  _support.exposure = exposure;
}

// 搜集曝光
export function lestenExposure(target: IExposure[] | IExposure) {
  if (!_support.baseInfo.options.isExposure) return;
  try {
    exposure.observer(target);
  } catch (error: any) {
    if (_support.baseInfo.options!.isDebug) {
      logger.error('曝光Api报错', (error.message || '') as string);
    }
  }
}
