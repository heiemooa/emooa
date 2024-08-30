import { ReactNode, HTMLAttributes } from 'react';

/**
 * @title Message
 */
export interface MessageProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'content' | 'children'> {
  /**
   * @zh 消息内容
   * @en Message content
   */
  content?: ReactNode | string;
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
   * @en The unique identifier of the current message, which can be used to update the message
   */
  id?: string;
  /**
   * @zh 消息的位置，分为 `top` 上方和 `bottom` 下方
   * @en The position of the message
   */
  position?: 'top' | 'bottom';
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
}

export enum MessageType {
  'info',
  'success',
  'warning',
  'error',
  'loading',
}

export type ConfigMessageProps = {
  maxCount?: number;
  getContainer?: () => HTMLElement;
  duration?: number;
  closable?: boolean;
};

type messageHookFunction = (config: MessageProps | string) => Function;

export type MessageHookReturnType = {
  -readonly [key in keyof typeof MessageType]: messageHookFunction;
};
