export interface FontBaseToken {
  // Font Size
  /**
   * @desc 小号字体大小
   */
  fontSizeSM: number;
  /**
   * @desc 标准字体大小
   */
  fontSize: number;
  /**
   * @desc 大号字体大小
   */
  fontSizeLG: number;
  /**
   * @desc 超大号字体大小
   */
  fontSizeXL: number;

  /**
   * @desc H1 标签所使用的字号
   * @default 38
   */
  fontSizeHeading1: number;
  /**
   * @desc h2 标签所使用的字号
   * @default 30
   */
  fontSizeHeading2: number;
  /**
   * @desc h3 标签使用的字号
   * @default 24
   */
  fontSizeHeading3: number;
  /**
   * @desc h4 标签使用的字号
   * @default 20
   */
  fontSizeHeading4: number;
  /**
   * @desc h5 标签使用的字号
   * @default 16
   */
  fontSizeHeading5: number;

  // LineHeight
  /**
   * @desc 小型文本行高
   */
  lineHeightSM: number;
  /**
   * @desc 文本行高
   */
  lineHeight: number;
  /**
   * @desc 大型文本行高
   */
  lineHeightLG: number;

  /**
   * @desc 超大大型文本行高
   */
  lineHeightXL: number;

  // TextHeight
  /**
   * @name SM 小型文本高度
   * @desc Round of fontSizeSM * lineHeightSM
   * @internal
   */
  fontHeightSM: number;
  /**
   * @name 文本高度
   * @desc Round of fontSize * lineHeight
   * @internal
   */
  fontHeight: number;
  /**
   * @name LG 大型文本高度
   * @desc Round of fontSizeLG * lineHeightLG
   * @internal
   */
  fontHeightLG: number;
  /**
   * @name XL 超大型文本高度
   * @desc Round of lineHeightXL * lineHeightXL
   * @internal
   */
  fontHeightXL: number;

  /**
   * @name H1 标签行高
   * @desc H1 标签所使用的行高
   * @default 1.4
   */
  lineHeightHeading1: number;
  /**
   * @name H2 标签行高
   * @desc h2 标签所使用的行高
   * @default 1.35
   */
  lineHeightHeading2: number;
  /**
   * @name H3 标签行高
   * @desc h3 标签所使用的行高
   * @default 1.3
   */
  lineHeightHeading3: number;
  /**
   * @name H4 标签行高
   * @desc h4 标签所使用的行高
   * @default 1.25
   */
  lineHeightHeading4: number;
  /**
   * @name H5 标签行高
   * @desc h5 标签所使用的行高
   * @default 1.2
   */
  lineHeightHeading5: number;
  /**
   * @name 选择器、级联选择器等中的操作图标字体大小
   * @desc 控制选择器、级联选择器等中的操作图标字体大小。正常情况下与 fontSizeSM 相同。
   */
  fontSizeIcon: number;
  /**
   * @name 标题类组件
   * @desc 控制标题类组件
   */
  fontWeight: number;

  /**
   * @name 标题类组件（如 h1、h2、h3）或选中项的字体粗细
   * @desc 控制标题类组件（如 h1、h2、h3）或选中项的字体粗细。
   */
  fontWeightStrong: number;
}
