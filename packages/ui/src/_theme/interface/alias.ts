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
  /**
   * @name 分割线颜色
   * @desc 用于作为分割线的颜色，此颜色和 colorBorderSecondary 的颜色一致，但是用的是透明色。
   */
  colorSplit: string;

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
   * @name 固定文本高亮颜色
   * @desc 控制带背景色的文本，例如 Primary Button 组件中的文本高亮颜色。
   */
  colorTextLightSolid: string;

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

  /**
   * @name 输入组件的 Outline 颜色
   * @desc 控制输入组件的外轮廓线颜色。
   */
  controlOutline: string;

  /**
   * @name 警告状态下的 Outline 颜色
   * @desc 控制输入组件警告状态下的外轮廓线颜色。
   */
  colorWarningOutline: string;

  /**
   * @name 错误状态下的 Outline 颜色
   * @desc 控制输入组件错误状态下的外轮廓线颜色。
   */
  colorErrorOutline: string;

  // Font
  /**
   * @name 选择器、级联选择器等中的操作图标字体大小
   * @desc 控制选择器、级联选择器等中的操作图标字体大小。正常情况下与 fontSizeSM 相同。
   */
  fontSizeIcon: number;

  /**
   * @name 标题类组件（如 h1、h2、h3）或选中项的字体粗细
   * @desc 控制标题类组件（如 h1、h2、h3）或选中项的字体粗细。
   */
  fontWeightStrong: number;

  // Control

  /**
   * @name 输入组件的外轮廓线宽度
   * @desc 控制输入组件的外轮廓线宽度。
   */
  controlOutlineWidth: number;

  /**
   * @name 控制组件项在鼠标悬浮时的背景颜色
   * @desc 控制组件项在鼠标悬浮时的背景颜色。
   */
  controlItemBgHover: string; // Note. It also is a color

  /**
   * @name 控制组件项在激活状态下的背景颜色
   * @desc 控制组件项在激活状态下的背景颜色。
   */
  controlItemBgActive: string; // Note. It also is a color

  /**
   * @name 控制组件项在鼠标悬浮且激活状态下的背景颜色
   * @desc 控制组件项在鼠标悬浮且激活状态下的背景颜色。
   */
  controlItemBgActiveHover: string; // Note. It also is a color

  /**
   * @name 控制组件的交互大小
   * @desc 控制组件的交互大小。
   */
  controlInteractiveSize: number;

  /**
   * @name 控制组件项在禁用状态下的激活背景颜色
   * @desc 控制组件项在禁用状态下的激活背景颜色。
   */
  controlItemBgActiveDisabled: string; // Note. It also is a color

  // Line
  /**
   * @name 线条宽度(聚焦态)
   * @desc 控制线条的宽度，当组件处于聚焦态时。
   */
  lineWidthFocus: number;

  // Padding
  /**
   * @name 极小内间距
   * @desc 控制元素的极小内间距。
   */
  paddingXXS: number;
  /**
   * @name 特小内间距
   * @desc 控制元素的特小内间距。
   */
  paddingXS: number;
  /**
   * @name 小内间距
   * @desc 控制元素的小内间距。
   */
  paddingSM: number;
  /**
   * @name 内间距
   * @desc 控制元素的内间距。
   */
  padding: number;
  /**
   * @name 中等内间距
   * @desc 控制元素的中等内间距。
   */
  paddingMD: number;
  /**
   * @name 大内间距
   * @desc 控制元素的大内间距。
   */
  paddingLG: number;
  /**
   * @name 特大内间距
   * @desc 控制元素的特大内间距。
   */
  paddingXL: number;

  // Padding Content
  /**
   * @name 内容水平内间距（LG）
   * @desc 控制内容元素水平内间距，适用于大屏幕设备。
   */
  paddingContentHorizontalLG: number;
  /**
   * @name 内容水平内间距
   * @desc 控制内容元素水平内间距。
   */
  paddingContentHorizontal: number;
  /**
   * @name 内容水平内间距（SM）
   * @desc 控制内容元素水平内间距，适用于小屏幕设备。
   */
  paddingContentHorizontalSM: number;
  /**
   * @name 内容垂直内间距（LG）
   * @desc 控制内容元素垂直内间距，适用于大屏幕设备。
   */
  paddingContentVerticalLG: number;
  /**
   * @name 内容垂直内间距
   * @desc 控制内容元素垂直内间距。
   */
  paddingContentVertical: number;
  /**
   * @name 内容垂直内间距（SM）
   * @desc 控制内容元素垂直内间距，适用于小屏幕设备。
   */
  paddingContentVerticalSM: number;

  // Margin
  /**
   * @name 外边距 XXS
   * @desc 控制元素外边距，最小尺寸。
   */
  marginXXS: number;
  /**
   * @name 外边距 XS
   * @desc 控制元素外边距，小尺寸。
   */
  marginXS: number;
  /**
   * @name 外边距 SM
   * @desc 控制元素外边距，中小尺寸。
   */
  marginSM: number;
  /**
   * @name 外边距
   * @desc 控制元素外边距，中等尺寸。
   */
  margin: number;
  /**
   * @name 外边距 MD
   * @desc 控制元素外边距，中大尺寸。
   */
  marginMD: number;
  /**
   * @name 外边距 LG
   * @desc 控制元素外边距，大尺寸。
   */
  marginLG: number;
  /**
   * @name 外边距 XL
   * @desc 控制元素外边距，超大尺寸。
   */
  marginXL: number;
  /**
   * @name 外边距 XXL
   * @desc 控制元素外边距，最大尺寸。
   */
  marginXXL: number;

  /**
   * @name 一级阴影
   * @desc 控制元素阴影样式。
   */
  boxShadow: string;
  /**
   * @name 二级阴影
   * @desc 控制元素二级阴影样式。
   */
  boxShadowSecondary: string;
  /**
   * @name 三级阴影
   * @desc 控制元素三级盒子阴影样式。
   */
  boxShadowTertiary: string;

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

  /**
   * @name 控制水平内间距
   * @desc 控制元素水平内间距。
   */
  controlPaddingHorizontal: number;
  /**
   * @name 控制中小尺寸水平内间距
   * @desc 控制元素中小尺寸水平内间距。
   */
  controlPaddingHorizontalSM: number;

  // Media queries breakpoints
  /**
   * @name 屏幕宽度（像素） - 超小屏幕
   * @desc 控制超小屏幕的屏幕宽度。
   */
  screenXS: number;
  /**
   * @name 屏幕宽度（像素） - 超小屏幕最小值
   * @desc 控制超小屏幕的最小宽度。
   */
  screenXSMin: number;
  /**
   * @name 屏幕宽度（像素） - 超小屏幕最大值
   * @desc 控制超小屏幕的最大宽度。
   */
  screenXSMax: number;
  /**
   * @name 屏幕宽度（像素） - 小屏幕
   * @desc 控制小屏幕的屏幕宽度。
   */
  screenSM: number;
  /**
   * @name 屏幕宽度（像素） - 小屏幕最小值
   * @desc 控制小屏幕的最小宽度。
   */
  screenSMMin: number;
  /**
   * @name 屏幕宽度（像素） - 小屏幕最大值
   * @desc 控制小屏幕的最大宽度。
   */
  screenSMMax: number;
  /**
   * @name 屏幕宽度（像素） - 中等屏幕
   * @desc 控制中等屏幕的屏幕宽度。
   */
  screenMD: number;
  /**
   * @name 屏幕宽度（像素） - 中等屏幕最小值
   * @desc 控制中等屏幕的最小宽度。
   */
  screenMDMin: number;
  /**
   * @name 屏幕宽度（像素） - 中等屏幕最大值
   * @desc 控制中等屏幕的最大宽度。
   */
  screenMDMax: number;
  /**
   * @name 屏幕宽度（像素） - 大屏幕
   * @desc 控制大屏幕的屏幕宽度。
   */
  screenLG: number;
  /**
   * @name 屏幕宽度（像素） - 大屏幕最小值
   * @desc 控制大屏幕的最小宽度。
   */
  screenLGMin: number;
  /**
   * @name 屏幕宽度（像素） - 大屏幕最大值
   * @desc 控制大屏幕的最大宽度。
   */
  screenLGMax: number;
  /**
   * @name 屏幕宽度（像素） - 超大屏幕
   * @desc 控制超大屏幕的屏幕宽度。
   */
  screenXL: number;
  /**
   * @name 屏幕宽度（像素） - 超大屏幕最小值
   * @desc 控制超大屏幕的最小宽度。
   */
  screenXLMin: number;
  /**
   * @name 屏幕宽度（像素） - 超大屏幕最大值
   * @desc 控制超大屏幕的最大宽度。
   */
  screenXLMax: number;
  /**
   * @name 屏幕宽度（像素） - 超超大屏幕
   * @desc 控制超超大屏幕的屏幕宽度。
   */
  screenXXL: number;
  /**
   * @name 屏幕宽度（像素） - 超超大屏幕最小值
   * @desc 控制超超大屏幕的最小宽度。
   */
  screenXXLMin: number;
}
