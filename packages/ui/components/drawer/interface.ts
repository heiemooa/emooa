import { ButtonProps } from '@/button/interface';
import { ReactNode, CSSProperties, MouseEvent, HTMLAttributes } from 'react';

/**
 * @title Drawer
 */
export interface DrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content' | 'title'> {
  /**
   * @zh 配置弹窗内置模块的类名
   * @en The class of the wrapped dom
   */
  classNames?: {
    header?: string;
    content?: string;
    footer?: string;
    mask?: string;
    wrapper?: string;
  };
  /**
   * @zh 配置弹窗内置模块的 style
   * @en The style of the wrapped dom
   */
  styles?: {
    header?: CSSProperties;
    content?: CSSProperties;
    footer?: CSSProperties;
    mask?: CSSProperties;
    wrapper?: CSSProperties;
  };
  /**
   * @zh 弹出框的标题（设置为 null 时，不显示标题栏）
   * @en The title element. Drawer will not render the title element when `title` is `null`
   */
  title?: string | ReactNode;
  /**
   * @zh 是否显示弹出框
   * @en Visibility of the drawer
   */
  open?: boolean;
  /**
   * @zh 是否显示遮罩
   * @en Whether to show mask
   * @defaultValue true
   */
  mask?: boolean;
  /**
   * @zh 点击蒙层是否可以关闭
   * @en Whether to close the drawer when the mask is clicked
   * @defaultValue true
   */
  maskClosable?: boolean;
  /**
   * @zh 自定义按钮确认和取消按钮，为 null 的话没有按钮组
   * @en The footer element. Drawer will not render the footer element when `footer` is `null`
   */

  footer?: ReactNode | ((cancelButtonNode: ReactNode, okButtonNode: ReactNode) => ReactNode);
  /**
   * @zh 是否显示右上角关闭按钮
   * @en Whether to show the close button on top-right of the drawer dialog
   * @defaultValue true
   */
  closable?: boolean;
  /**
   * @zh 自定义右上角关闭按钮
   * @en Custom the close button on top-right of the drawer dialog
   * @version 2.49.0
   */
  closeIcon?: ReactNode;
  /**
   * @zh 确认按钮文案
   * @en Text of the OK button
   */
  okText?: ReactNode;
  /**
   * @zh 取消按钮文案
   * @en Text of the Cancel button
   */
  cancelText?: ReactNode;
  /**
   * @zh 确认按钮的 props
   * @en The props of `ok` button
   */
  okButtonProps?: ButtonProps;
  /**
   * @zh 取消按钮的 props
   * @en The props of `cancel` button
   */
  cancelButtonProps?: ButtonProps;
  /**
   * @zh 确认按钮是否为加载中状态
   * @en Whether the OK button is in loading state
   */
  confirmLoading?: boolean;
  /**
   * @zh 是否在初次打开对话框时才渲染 dom。
   * @en Whether to render the drawer component only when it is opened initially.
   * @defaultValue true
   */
  mountOnEnter?: boolean;
  /**
   * @zh 是否在隐藏的时候销毁 DOM 结构
   * @en Whether to unmount component when hidden
   */
  unmountOnExit?: boolean;
  /**
   * @zh  按 `ESC` 键关闭
   * @en Whether to enable pressing `ESC` to close the drawer.
   * @defaultValue true
   */
  escToExit?: boolean;
  /**
   * @zh 是否默认聚焦第一个可聚焦元素，只在 `focusLock` 开启时生效。
   * @en Whether to focus on the first focusable element by default. Only works when `focusLock` is turned on.
   * @defaultValue true
   */
  autoFocus?: boolean;
  /**
   * @zh 抽屉的方向 `top` `right` `bottom` `left`
   * @en The placement of the drawer: `top` `right` `bottom` `left`
   * @defaultValue right
   */
  placement?: 'top' | 'right' | 'bottom' | 'left';
  /**
   * @zh 点击确认按钮的回调
   * @en Callback when the OK button is clicked
   */
  onOk?: (e?: MouseEvent | Event) => Promise<any> | void;
  /**
   * @zh 关闭弹出框的回调
   * @en Callback when the Cancel button is clicked
   */
  onCancel?: (e?: MouseEvent) => void;
  /**
   * @zh 抽屉打开之后的回调
   * @en Callback when drawer is opened
   */
  afterOpen?: () => void;
  /**
   * @zh 抽屉关闭之后的回调
   * @en Callback when drawer is closed
   */
  afterClose?: () => void;
  /**
   * @zh 指定弹出框挂载的父节点
   * @en Parent node which the drawer should be rendered to.
   * @defaultValue () => document.body
   */
  getPopupContainer?: () => HTMLElement | null;

  /**
   * 在onOk 为 Promise 事件时，并且加载中的时候，取消、close icon、mask 等不可点击
   */
  disabledOnPromise?: boolean;
}
