import { ReactNode, HTMLAttributes, ReactInstance } from 'react';

/**
 * @title Notification
 */
export interface NotificationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'content' | 'children'> {
  /**
   * @zh 提示标题
   * @en Notification content
   */
  title?: ReactNode;
  /**
   * @zh 消息内容
   * @en Notification content
   */
  content?: ReactNode;
  /**
   * @zh 是否显示图标
   * @en Whether to show the icon
   * @defaultValue true
   */
  showIcon?: boolean;
  /**
   * @zh 自定义图标
   * @en Custom icon
   */
  icon?: ReactNode;
  /**
   * @zh 自动关闭的时间，单位为 `ms`
   * @en Automatic shutdown time, the unit is `ms`
   * @defaultValue 3000
   */
  duration?: number;
  /**
   * @zh 关闭时的回调
   * @en Callback when close
   */
  onClose?: () => void;
  /**
   * @zh 当前消息的唯一标识，可以用来更新消息
   * @en The unique identifier of the current notification, which can be used to update the notification
   */
  id?: string;
  /**
   * @zh 消息的位置，分为 `topLeft` 左上方、`topRight` 右上方、`bottomLeft` 左下方和 `bottomRight` 右下方
   * @en The position of the message
   */
  position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  /**
   * @zh 是否显示关闭按钮
   * @en Whether to show the close button
   * @defaultValue true
   */
  closable?: boolean;
  /**
   * @zh 自定义右上角关闭按钮
   * @en Custom the close button on top-right of the drawer dialog
   */
  closeIcon?: ReactNode;
  /**
   * @zh 操作
   */
  actions?: ReactNode[];
}

export enum NotificationType {
  'info',
  'success',
  'warning',
  'error',
}

export type ConfigNotificationProps = {
  maxCount?: number;
  getContainer?: () => HTMLElement;
  duration?: number;
  closable?: boolean;
  title?: ReactNode;
};

type notificationHookFunction = (config: NotificationProps | string) => () => void;

export type NotificationHookReturnType = {
  -readonly [key in Exclude<keyof typeof NotificationType, number>]: notificationHookFunction;
};
