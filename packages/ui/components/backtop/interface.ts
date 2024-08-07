import { HTMLAttributes } from 'react';

enum Animation {
  'fade',
  'fade-up',
  'fade-down',
  'fade-left',
  'fade-right',
  'zoom',
}

enum Easing {
  'linear',
  'quadIn',
  'quadOut',
  'quadInOut',
  'cubicIn',
  'cubicOut',
  'cubicInOut',
  'quartIn',
  'quartOut',
  'quartInOut',
  'quintIn',
  'quintOut',
  'quintInOut',
  'sineIn',
  'sineOut',
  'sineInOut',
  'bounceIn',
  'bounceOut',
  'bounceInOut',
}

/**
 * @title Backtop
 */
export interface BacktopProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  /**
   * @zh 当滚动到这个高度时，显示返回顶部按钮。
   * @en When scrolling to this height, display the back to top button.
   * @defaultValue 400
   */
  visibleHeight?: number;
  /**
   * @zh 设置需要监听其滚动事件的元素，值为一个返回对应 `DOM` 元素的函数。
   * @en Set the element whose scroll event needs to be listened to. The value is a function that returns the corresponding `DOM` element
   * @defaultValue () => window
   */
  target?: () => HTMLElement | Window | null;
  /**
   * @zh 滚动到顶部的缓动方式类型, 所有类型：[easing](https://www.npmjs.com/package/b-tween)。
   * @en Scroll to the top of the easing method type, all types: [easing](https://www.npmjs.com/package/b-tween).
   * @defaultValue quartOut
   */
  easing?: keyof typeof Easing;
  /**
   * @zh 滚动到顶部的时间。
   * @en Duration to scroll to the top
   * @defaultValue 1000
   */
  duration?: number;
  /**
   * 显示动画
   * @defaultValue fade
   */
  animation?: keyof typeof Animation;
}
