import { ReactNode } from 'react';

export type SpaceSize = 'mini' | 'small' | 'medium' | 'large' | number;
export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline';

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @zh 对齐方式
   * @en Alignment of items
   */
  align?: SpaceAlign;
  /**
   * @zh 间距方向
   * @en The space direction
   * @defaultValue horizontal
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * @zh 尺寸
   * @en The space size
   * @defaultValue medium
   */
  size?: SpaceSize | SpaceSize[];
  /**
   * @zh 环绕类型的间距，用于折行的场景。
   * @en Whether to wrap line automatic
   */
  wrap?: boolean;
  /**
   * @zh 设置分隔符
   * @en Set separator
   */
  split?: ReactNode;
}
