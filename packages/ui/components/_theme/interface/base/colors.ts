export interface ColorNeutralBaseen {
  /**
   * @internal
   */
  colorTextBase: string;

  /**
   * @internal
   */
  colorBgBase: string;

  // ----------   Text   ---------- //

  /**
   * @name 一级文本色
   * @desc 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。
   */
  colorText: string;

  /**
   * @name 二级文本色
   * @desc 作为第二梯度的文本色，一般用在不那么需要强化文本颜色的场景，例如 Label 文本、Menu 的文本选中态等场景。
   */
  colorTextSecondary: string;

  /**
   * @name 三级文本色
   * @desc 第三级文本色一般用于描述性文本，例如表单的中的补充说明文本、列表的描述性文本等场景。
   */
  colorTextTertiary: string;

  /**
   * @name 四级文本色
   * @desc 第四级文本色是最浅的文本色，例如表单的输入提示文本、禁用色文本等。
   */
  colorTextQuaternary: string;

  // ----------   Border   ---------- //

  /**
   * @name 一级边框色
   * @desc 默认使用的边框颜色, 用于分割不同的元素，例如：表单的分割线、卡片的分割线等。
   */
  colorBorder: string;

  /**
   * @name 二级边框色
   * @desc 比默认使用的边框色要浅一级。
   */
  colorBorderSecondary: string;

  // ----------   Fill   ---------- //

  /**
   * @name 一级填充色
   * @desc 最深的填充色，用于拉开与二、三级填充色的区分度。
   */
  colorFill: string;

  /**
   * @name 二级填充色
   * @desc 二级填充色可以较为明显地勾勒出元素形体，如 Rate、Skeleton 等。也可以作为三级填充色的 Hover 状态，如 Table 等。
   */
  colorFillSecondary: string;

  /**
   * @name 三级填充色
   * @desc 三级填充色用于勾勒出元素形体的场景，如 Slider、Segmented 等。如无强调需求的情况下，建议使用三级填色作为默认填色。
   */
  colorFillTertiary: string;

  /**
   * @name 四级填充色
   * @desc 最弱一级的填充色，适用于不易引起注意的色块，例如斑马纹、区分边界的色块等。
   */
  colorFillQuaternary: string;

  // ----------   Surface   ---------- //

  /**
   * @name 布局背景色
   * @desc 该色用于页面整体布局的背景色，只有需要在页面中处于 B1 的视觉层级时才会使用该 token，其他用法都是错误的
   */
  colorBgLayout: string;

  /**
   * @name 组件容器背景色
   * @desc 组件的容器背景色，例如：默认按钮、输入框等。务必不要将其与 `colorBgElevated` 混淆。
   */
  colorBgContainer: string;

  /**
   * @name 浮层容器背景色
   * @desc 浮层容器背景色，在暗色模式下该 token 的色值会比 `colorBgContainer` 要亮一些。例如：模态框、弹出框、菜单等。
   */
  colorBgElevated: string;

  /**
   * @name 引起注意的背景色
   * @desc 该色用于引起用户强烈关注注意的背景色，目前只用在 Tooltip 的背景色上。
   * @descEN This color is used to draw the user's strong attention to the background color, and is currently only used in the background color of Tooltip.
   */
  colorBgSpotlight: string;
  /**
   * @name 毛玻璃容器背景色
   * @desc 控制毛玻璃容器的背景色，通常为透明色。
   */
  colorBgBlur: string;
}

/**
 * 品牌色梯度变量
 */

type ColorKey = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface ColorLinkBaseToken {
  /**
   * @name 超链接颜色
   * @desc 控制超链接的颜色。
   */
  colorLink: string;

  /**
   * 不可点击
   */
  colorLinkDidsabled: string;
  /**
   * @name 超链接悬浮颜色
   * @desc 控制超链接悬浮时的颜色。
   */
  colorLinkHover: string;
  /**
   * @name 超链接激活颜色
   * @desc 控制超链接被点击时的颜色。
   */
  colorLinkActive: string;
}

export interface ColorBaseToken extends ColorNeutralBaseen {
  colorPrimarys: {
    [key in ColorKey[number]]: string;
  };
  colorErrors: {
    [key in ColorKey[number]]: string;
  };
  colorSuccesses: {
    [key in ColorKey[number]]: string;
  };
  colorWarnings: {
    [key in ColorKey[number]]: string;
  };
  colorInfos: {
    [key in ColorKey[number]]: string;
  };
  colorLinks: ColorLinkBaseToken;
}
