export interface MotionBaseToken {
  // Motion
  /**
   * @desc 动效播放速度，快速。用于小型元素动画交互
   */
  motionDurationFast: string;
  /**
   * @desc 动效播放速度，中速。用于中型元素动画交互
   */
  motionDurationMid: string;
  /**
   * @desc 动效播放速度，慢速。用于大型元素如面板动画交互
   */
  motionDurationSlow: string;
}
