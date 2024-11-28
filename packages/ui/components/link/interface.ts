import { ReactNode } from 'react';

export interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  /**
   * @zh 按钮状态
   * @en Status of the link
   * @defaultValue default
   */
  status?: 'warning' | 'danger' | 'success' | 'default';
  /**
   * @zh 是否展示悬浮背景
   */
  hoverable?: boolean;
  /**
   * @zh 是否禁用
   * @en Whether to disable the link
   */
  disabled?: boolean;
  /**
   * @zh 按钮是否是加载状态
   * @en Whether the link is in the loading state
   */
  loading?: boolean;
  /**
   * @zh 设置按钮的图标
   * @en Icon of the link
   */
  icon?: ReactNode;
  /**
   * @zh 添加跳转链接，设置此属性，button表现跟a标签一致
   * @en The link behaves like `<a>` with href as target url.
   * @defaultValue default
   */
  href?: string;
  /**
   * @zh a 链接的 target 属性，href 存在时生效
   * @en The target attribute of the link, which takes effect when href exists.
   */
  target?: '_blank' | '_self' | '_parent' | '_top';
}
