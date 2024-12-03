export interface OtherBaseToken {
  /**
   * @name 线宽
   * @desc 描边类组件的默认线宽，如 Button、Input、Select 等输入类控件。
   * @default 1
   */
  lineWidthBold: number;

  rounded: {
    /**
     * @name XS号圆角
     * @desc 用于组件中的一些小圆角，如 Segmented 、Arrow 等一些内部圆角的组件样式中。
     * @default 2
     */
    XS: number;
    /**
     * @name SM号圆角
     * @desc 用于组件小尺寸下的圆角，如 Button、Input、Select 等输入类控件在 small size 下的圆角
     * @default 4
     */
    SM: number;
    /**
     * @name 默认尺寸
     * @default 4
     */
    MD: number;
    /**
     * @name LG号圆角
     * @desc 用于组件中的一些大圆角，如 Card、Modal 等一些组件样式。
     * @default 8
     */
    LG: number;
  };
}
