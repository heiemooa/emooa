import { ReactNode } from 'react';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content' | 'title'> {
  /**
   * @zh 状态
   * @en Type of the alert
   * @default info
   */
  type?: 'warning' | 'error' | 'success' | 'info';

  /**
   * @zh 设置按钮的图标
   * @en Icon of the alert
   */
  icon?: ReactNode;
  /**
   * @zh 是否可关闭
   * @en Whether Alert can be closed
   */
  closable?: boolean;
  /**
   * @zh 关闭的回调
   * @en Callback when Alert is closed
   */
  onClose?: (e) => void;
  /**
   * @zh 关闭动画结束后执行的回调
   * @en Callback when Alert close animation is complete
   */
  afterClose?: () => void;
  /**
   * @zh 标题
   * @en Alert title
   */
  title?: ReactNode;
  /**
   * @zh 内容
   * @en Alert content
   */
  content?: ReactNode;
  /**
   * @zh 自定义关闭按钮
   * @en Custom close button
   */
  closeIcon?: ReactNode;
  /**
   * @zh 是否显示图标
   * @en Whether to show icon
   * @defaultValue true
   */
  showIcon?: boolean;
  /**
   * @zh 自定义操作项
   * @en Custom action item
   */
  action?: ReactNode;
  /**
   * 是否当作 banner
   */
  banner?: boolean;
}
