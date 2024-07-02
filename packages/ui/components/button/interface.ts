import { Size } from '@/config-provider/interface';
import { CSSProperties, HTMLProps, ReactNode } from 'react';

export type { Size as ButtonSize } from '@/config-provider/interface';

export interface BaseButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * @zh 类型
   * @en The Button type
   * @defaultValue default
   */
  type?: 'secondary' | 'primary' | 'dashed' | 'outline' | 'text';

  /**
   * @zh 尺寸
   * @en The Button size
   * @defaultValue medium
   */
  size?: Size;
  /**
   * @zh 按钮状态
   * @en Status of the button
   * @defaultValue default
   */
  status?: 'warning' | 'danger' | 'success' | 'default';
  /**
   * @zh 按钮形状，`circle` - 圆形， `round` - 全圆角， `square` - 长方形
   * @en Three button shapes are available: `circle`, `round` and `square`
   * @defaultValue square
   */
  shape?: 'circle' | 'round' | 'square';
  /**
   * @zh 是否禁用
   * @en Whether to disable the button
   */
  disabled?: boolean;
  /**
   * @zh 按钮是否是加载状态
   * @en Whether the button is in the loading state
   */
  loading?: boolean;
  /**
   * @zh 设置按钮的图标
   * @en Icon of the button
   */
  icon?: ReactNode;
  /**
   * @zh 按钮宽度随容器自适应。
   * @en Whether the width of the button should adapt to the container.
   */
  full?: boolean;
}

export type AnchorButtonProps = {
  /**
   * @zh 添加跳转链接，设置此属性，button表现跟a标签一致
   * @en The button behaves like `<a>` with href as target url.
   * @defaultValue default
   */
  href?: string;
  /**
   * @zh a 链接的 target 属性，href 存在时生效
   * @en The target attribute of the link, which takes effect when href exists.
   */
  target?: '_blank' | '_self' | '_parent' | '_top';
  anchorProps?: HTMLProps<HTMLAnchorElement>;
} & BaseButtonProps;

export type FinalButtonProps = {
  /**
   * @zh 按钮原生的 html type 类型
   * @en html button type
   * @defaultValue button
   */
  htmlType?: 'button' | 'submit' | 'reset';
} & BaseButtonProps;

/**
 * @title Button
 */
export type ButtonProps = Partial<FinalButtonProps & AnchorButtonProps>;

export interface ButtonGroupProps {
  style?: CSSProperties;
  className?: string | string[];
  children?: ReactNode;
}
