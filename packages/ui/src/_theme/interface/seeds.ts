import type { ColorPalettes, PresetColorType } from './presetColors';
// ======================================================================
// ==                            Seed Token                            ==
// ======================================================================

export interface SeedToken {
  //  ----------   Color   ---------- //
  colors: PresetColorType & Partial<ColorPalettes>;

  /**
   * @name 主题色
   * @desc 品牌色是体现产品特性和传播理念最直观的视觉元素之一。在你完成品牌主色的选取之后，我们会自动帮你生成一套完整的色板，并赋予它们有效的设计语义
   */
  colorPrimary: string;

  /**
   * @name 成功色
   * @desc 用于表示操作成功的 Token 序列，如 Result、Progress 等组件会使用该组梯度变量。
   */
  colorSuccess: string;

  /**
   * @name 警戒色
   * @desc 用于表示操作警告的 Token 序列，如 Notification、 Alert等警告类组件或 Input 输入类等组件会使用该组梯度变量。
   */
  colorWarning: string;

  /**
   * @name 错误色
   * @desc 用于表示操作失败的 Token 序列，如失败按钮、错误状态提示（Result）组件等。
   */
  colorError: string;

  /**
   * @name 信息色
   * @desc 用于表示操作信息的 Token 序列，如 Alert 、Tag、 Progress 等组件都有用到该组梯度变量。
   */
  colorInfo: string;

  /**
   * @name 基础文本色
   * @desc 用于派生文本色梯度的基础变量，v5 中我们添加了一层文本色的派生算法可以产出梯度明确的文本色的梯度变量。但请不要在代码中直接使用该 Seed Token ！
   */
  colorTextBase: string;

  /**
   * @name 基础背景色
   * @desc 用于派生背景色梯度的基础变量，v5 中我们添加了一层背景色的派生算法可以产出梯度明确的背景色的梯度变量。但请不要在代码中直接使用该 Seed Token ！
   */
  colorBgBase: string;

  /**
   * @name 超链接颜色
   * @desc 控制超链接的颜色。
   */
  colorLink: string;

  //  ----------   Font   ---------- //

  /**
   * @name 字体
   * @desc Emooa UI 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。
   */
  fontFamily: string;

  /**
   * @name 代码字体
   * @desc 代码字体，用于 Typography 内的 code、pre 和 kbd 类型的元素
   */
  fontFamilyCode: string;

  /**
   * @name 默认字号
   * @desc 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。
   * @default 14
   */
  fontSize: number;

  //  ----------   Line   ---------- //

  /**
   * @name 基础线宽
   * @desc 用于控制组件边框、分割线等的宽度
   */
  lineWidth: number;

  /**
   * @name 线条样式
   * @desc 用于控制组件边框、分割线等的样式，默认是实线
   */
  lineType: string;

  //  ----------   BorderRadius   ---------- //

  /**
   * @name 基础圆角
   * @descEN Border radius of base components
   */
  borderRadius: number;

  //  ----------   Size   ---------- //

  /**
   * @name 尺寸变化单位
   * @desc 用于控制组件尺寸的变化单位，在 Emooa UI 中我们的基础单位为 4 ，便于更加细致地控制尺寸梯度
   * @default 4
   */
  sizeUnit: number;

  /**
   * @name 尺寸步长
   * @desc 用于控制组件尺寸的基础步长，尺寸步长结合尺寸变化单位，就可以派生各种尺寸梯度。通过调整步长即可得到不同的布局模式，例如 V5 紧凑模式下的尺寸步长为 2
   * @default 4
   */
  sizeStep: number;

  /**
   * @name 组件箭头尺寸
   * @desc 组件箭头的尺寸
   */
  sizePopupArrow: number;

  /**
   * @name 基础高度
   * @desc Emooa UI 中按钮和输入框等基础控件的高度
   * @default 32
   */
  baseHeight: number;

  //  ----------   zIndex   ---------- //

  /**
   * @name 基础 zIndex
   * @desc 所有组件的基础 Z 轴值，用于一些悬浮类的组件的可以基于该值 Z 轴控制层级，例如 BackTop、 Affix 等
   *
   * @default 0
   */
  zIndexBase: number;

  /**
   * @name 浮层基础 zIndex
   * @desc 浮层类组件的基础 Z 轴值，用于一些悬浮类的组件的可以基于该值 Z 轴控制层级，例如 FloatButton、 Affix、Modal 等
   * @default 1000
   */
  zIndexPopupBase: number;

  //  ----------   Opacity   ---------- //

  /**
   * @name 图片不透明度
   */
  opacityImage: number;

  //  ----------   motion   ---------- //

  /**
   * @name 动画时长变化单位
   * @desc 用于控制动画时长的变化单位
   * @default 100 ms
   */
  motionUnit: number;

  /**
   * @name 动画基础时长。
   */
  motionBase: number;

  /**
   * @name CSS 过渡函数
   * @desc 线性
   */
  motionLinear: string;

  /**
   * @name CSS 过渡函数
   * @desc 标准
   */
  motionStandard: string;

  /**
   * @name CSS 过渡函数
   * @desc 过冲
   */
  motionOvershoot: string;

  /**
   * @name CSS 过渡函数
   * @desc 减速
   */
  motionDecelerate: string;

  /**
   * @name CSS 过渡函数
   * @desc  加速
   */
  motionAccelerate: string;

  //  ----------   Style   ---------- //

  /**
   * @name 动画风格
   * @desc 用于配置动画效果，为 `false` 时则关闭动画
   * @default false
   */
  motion: boolean;
}
