import type * as React from 'react';
import type { BaseToken } from './base';

// ======================================================================
// == 🔥🔥🔥🔥🔥🔥🔥             Alias Token           🔥🔥🔥🔥🔥🔥🔥 ==
// ======================================================================

export interface AliasToken extends BaseToken {
  // Background
  /**
   * @name 内容区域背景色（悬停）
   * @desc 控制内容区域背景色在鼠标悬停时的样式。
   */
  colorFillContentHover: string;
  /**
   * @name 替代背景色
   * @desc 控制元素替代背景色。
   */
  colorFillAlter: string;
  /**
   * @name 内容区域背景色
   * @desc 控制内容区域的背景色。
   */
  colorFillContent: string;
  /**
   * @name 容器禁用态下的背景色
   * @desc 控制容器在禁用状态下的背景色。
   */
  colorBgContainerDisabled: string;
  /**
   * @name 文本悬停态背景色
   * @desc 控制文本在悬停状态下的背景色。
   */
  colorBgTextHover: string;
  /**
   * @name 文本激活态背景色
   * @desc 控制文本在激活状态下的背景色。
   */
  colorBgTextActive: string;

  // Border
  /**
   * @name 背景边框颜色
   * @desc 控制元素背景边框的颜色。
   */
  colorBorderBg: string;

  // Text
  /**
   * @name 占位文本颜色
   * @desc 控制占位文本的颜色。
   */
  colorTextPlaceholder: string;
  /**
   * @name 禁用字体颜色
   * @desc 控制禁用状态下的字体颜色。
   */
  colorTextDisabled: string;
  /**
   * @name 标题字体颜色
   * @desc 控制标题字体颜色。
   */
  colorTextHeading: string;
  /**
   * @name 文本标签字体颜色
   * @desc 控制文本标签字体颜色。
   */
  colorTextLabel: string;
  /**
   * @name 文本描述字体颜色
   * @desc 控制文本描述字体颜色。
   */
  colorTextDescription: string;

  /**
  /**
   * @name 弱操作图标颜色
   * @desc 控制弱操作图标的颜色，例如 allowClear 或 Alert 关闭按钮。
   */
  colorIcon: string;

  /**  */
  /**
   * @name 弱操作图标悬浮态颜色
   * @desc 控制弱操作图标在悬浮状态下的颜色，例如 allowClear 或 Alert 关闭按钮。
   */
  colorIconHover: string;

  /**
   * @name 高亮颜色
   * @desc 控制页面元素高亮时的颜色。
   */
  colorHighlight: string;

  // Line
  /**
   * @name 线条宽度(聚焦态)
   * @desc 控制线条的宽度，当组件处于聚焦态时。
   */
  lineWidthFocus: number;

  // Padding
  paddings: {
    /**
     * @name 极小内间距
     * @desc 控制元素的极小内间距。
     */
    XXS: number;
    /**
     * @name 特小内间距
     * @desc 控制元素的特小内间距。
     */
    XS: number;
    /**
     * @name 小内间距
     * @desc 控制元素的小内间距。
     */
    SM: number;
    /**
     * @name 内间距
     * @desc 控制元素的内间距。
     */
    MD: number;
    /**
     * @name 大内间距
     * @desc 控制元素的大内间距。
     */
    LG: number;
    /**
     * @name 特大内间距
     * @desc 控制元素的特大内间距。
     */
    XL: number;
  };

  // Margin
  margins: {
    /**
     * @name 外边距 XXS
     * @desc 控制元素外边距，最小尺寸。
     */
    XXS: number;
    /**
     * @name 外边距 XS
     * @desc 控制元素外边距，小尺寸。
     */
    XS: number;
    /**
     * @name 外边距 SM
     * @desc 控制元素外边距，中小尺寸。
     */
    SM: number;
    /**
     * @name 外边距
     * @desc 控制元素外边距，中等尺寸。
     */
    MD: number;
    /**
     * @name 外边距 LG
     * @desc 控制元素外边距，大尺寸。
     */
    LG: number;
    /**
     * @name 外边距 XL
     * @desc 控制元素外边距，超大尺寸。
     */
    XL: number;
    /**
     * @name 外边距 XXL
     * @desc 控制元素外边距，最大尺寸。
     */
    XXL: number;
  };

  /**
   * @name 链接文本装饰
   * @desc 控制链接文本的装饰样式。
   */
  linkDecoration: React.CSSProperties['textDecoration'];
  /**
   * @name 链接鼠标悬浮时文本装饰
   * @desc 控制链接鼠标悬浮时文本的装饰样式。
   */
  linkHoverDecoration: React.CSSProperties['textDecoration'];
  /**
   * @name 链接聚焦时文本装饰
   * @desc 控制链接聚焦时文本的装饰样式。
   */
  linkFocusDecoration: React.CSSProperties['textDecoration'];

  // Media queries breakpoints
  screens: {
    /**
     * @name 屏幕宽度（像素） - 超小屏幕
     * @desc 控制超小屏幕的屏幕宽度。
     */
    XS: number;
    /**
     * @name 屏幕宽度（像素） - 超小屏幕最小值
     * @desc 控制超小屏幕的最小宽度。
     */
    XSMin: number;
    /**
     * @name 屏幕宽度（像素） - 超小屏幕最大值
     * @desc 控制超小屏幕的最大宽度。
     */
    XSMax: number;
    /**
     * @name 屏幕宽度（像素） - 小屏幕
     * @desc 控制小屏幕的屏幕宽度。
     */
    SM: number;
    /**
     * @name 屏幕宽度（像素） - 小屏幕最小值
     * @desc 控制小屏幕的最小宽度。
     */
    SMMin: number;
    /**
     * @name 屏幕宽度（像素） - 小屏幕最大值
     * @desc 控制小屏幕的最大宽度。
     */
    SMMax: number;
    /**
     * @name 屏幕宽度（像素） - 中等屏幕
     * @desc 控制中等屏幕的屏幕宽度。
     */
    MD: number;
    /**
     * @name 屏幕宽度（像素） - 中等屏幕最小值
     * @desc 控制中等屏幕的最小宽度。
     */
    MDMin: number;
    /**
     * @name 屏幕宽度（像素） - 中等屏幕最大值
     * @desc 控制中等屏幕的最大宽度。
     */
    MDMax: number;
    /**
     * @name 屏幕宽度（像素） - 大屏幕
     * @desc 控制大屏幕的屏幕宽度。
     */
    LG: number;
    /**
     * @name 屏幕宽度（像素） - 大屏幕最小值
     * @desc 控制大屏幕的最小宽度。
     */
    LGMin: number;
    /**
     * @name 屏幕宽度（像素） - 大屏幕最大值
     * @desc 控制大屏幕的最大宽度。
     */
    LGMax: number;
    /**
     * @name 屏幕宽度（像素） - 超大屏幕
     * @desc 控制超大屏幕的屏幕宽度。
     */
    XL: number;
    /**
     * @name 屏幕宽度（像素） - 超大屏幕最小值
     * @desc 控制超大屏幕的最小宽度。
     */
    XLMin: number;
    /**
     * @name 屏幕宽度（像素） - 超大屏幕最大值
     * @desc 控制超大屏幕的最大宽度。
     */
    XLMax: number;
    /**
     * @name 屏幕宽度（像素） - 超超大屏幕
     * @desc 控制超超大屏幕的屏幕宽度。
     */
    XXL: number;
    /**
     * @name 屏幕宽度（像素） - 超超大屏幕最小值
     * @desc 控制超超大屏幕的最小宽度。
     */
    XXLMin: number;
  };
}
