export interface MotionBaseToken {
  // Motion

  /**
   * @name 动画时长变化单位
   * @desc 用于控制动画时长的变化单位
   * @default 100 ms
   */
  unit: number;

  /**
   * @name 动画基础时长。
   */
  base: number;

  /**
   * @name CSS 过渡函数
   * @desc 线性
   */
  linear: string;

  /**
   * @name CSS 过渡函数
   * @desc 标准
   */
  standard: string;

  /**
   * @name CSS 过渡函数
   * @desc 过冲
   */
  overshoot: string;

  /**
   * @name CSS 过渡函数
   * @desc 减速
   */
  decelerate: string;

  /**
   * @name CSS 过渡函数
   * @desc  加速
   */
  accelerate: string;

  /**
   * @desc 动效播放速度，快速。用于小型元素动画交互
   */
  durationFast: string;
  /**
   * @desc 动效播放速度，中速。用于中型元素动画交互
   */
  durationMid: string;
  /**
   * @desc 动效播放速度，慢速。用于大型元素如面板动画交互
   */
  durationSlow: string;
}
