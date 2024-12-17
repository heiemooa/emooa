import { CSSProperties, ReactNode } from 'react';

/**
 * @title Divider
 */
export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @zh 分割线的类型，是水平还是竖直，分别对应 `horizontal` 和 `vertical`
   * @en Two types are available: `horizontal` and `vertical`
   * @defaultValue horizontal
   */
  type?: 'horizontal' | 'vertical';
  /**
   * @zh 分割线文字的位置
   * @en The position of description content in Divider
   * @defaultValue center
   */
  orientation?: 'left' | 'right' | 'center';
  /**
   * @zh 是否是虚线
   * @en Dashed line
   * @defaultValue center
   */
  dashed?: boolean;
  /**
   * @zh 线颜色
   * @en Line color
   */
  color?: string;
}
