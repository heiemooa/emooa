import { ReactNode, CSSProperties, HTMLAttributes } from 'react';
import { ButtonProps } from '@/button/interface';

/**
 * @title Modal
 */
export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'content'> {
  /**
   * @zh 关闭弹出框的回调
   * @en Callback when click cancel button
   */
  onCancel?: (e?: MouseEvent) => void;
  /**
   * @zh 点击确认按钮的回调
   * @en Callback when click ok button
   */
  onOk?: (e?: MouseEvent) => Promise<any> | void;
  /**
   * @zh 指定弹出框挂载的父节点
   * @en Specify the parent node of the Modal
   * @defaultValue () => document.body
   */
  getPopupContainer?: () => HTMLElement;
  /**
   * @zh 弹出框的标题
   * @en The title of Modal
   */
  title?: string | ReactNode;
  /**
   * @zh 弹出框是否可见
   * @en Whether the Modal is open
   */
  open?: boolean;
  /**
   * @zh 是否显示遮罩
   * @en Whether show mask
   * @defaultValue true
   */
  mask?: boolean;
  /**
   * @zh 确认按钮文案
   * @en The text of `ok` button
   */
  okText?: ReactNode;
  /**
   * @zh 取消按钮文案
   * @en The text of `cancel` button
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
   * @zh 自定义页脚，传入 null 则不显示
   * @en Custom `footer`. if it is null, the footer will not be displayed.
   */
  footer?: ReactNode | ((cancelButtonNode: ReactNode, okButtonNode: ReactNode) => ReactNode);
  /**
   * @zh 是否显示右上角的关闭按钮
   * @en Whether to show the close button in TitleBar
   */
  closable?: boolean;
  /**
   * @zh 自定义右上角的关闭按钮节点
   * @en Customize the close icon
   */
  closeIcon?: ReactNode;
  /**
   * @zh 点击蒙层是否可以关闭
   * @en Whether enable click mask to close Modal.
   * @defaultValue true
   */
  maskClosable?: boolean;
  /**
   * @zh 弹框打开之后的回调
   * @en Callback when Modal opened
   */
  afterOpen?: () => void;
  /**
   * @zh 弹框关闭之后的回调
   * @en Callback when Modal closed
   */
  afterClose?: () => void;
  /**
   * @zh 确认按钮加载中
   * @en Whether the `ok` button is loading
   */
  confirmLoading?: boolean;
  /**
   * @zh 是否在初次打开对话框时才渲染 dom
   * @en Whether to render DOM when first opened
   * @defaultValue true
   */
  mountOnEnter?: boolean;
  /**
   * @zh 是否在隐藏之后销毁DOM结构
   * @en Whether to destroy DOM after closed
   */
  unmountOnExit?: boolean;
  /**
   * @zh 按 `ESC` 键关闭
   * @en Whether enable press `ESC` to close Modal
   * @defaultValue true
   */
  escToExit?: boolean;
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
   * @zh 是否默认聚焦第一个可聚焦元素。
   * @en Whether to focus the first focusable element
   * @defaultValue true
   */
  autoFocus?: boolean;
  /**
   * @zh 自定义渲染对话框
   * @en Custom the render of Modal
   */
  modalRender?: (modalNode: ReactNode) => ReactNode;
  /**
   * 是否居中
   */
  center?: boolean;
  /**
   * 在onOk 为 Promise 事件时，并且加载中的时候，取消、close icon、mask 等不可点击
   */
  disabledOnPromise?: boolean;
}

export type ModalReturnProps = { update: Function; close: Function };

export interface ConfirmProps extends ModalProps {
  content?: ReactNode;
  icon?: ReactNode | null;
  isNotice?: boolean;
  noticeType?: string;
}

type modalHookFunction = (config: ConfirmProps) => {
  close: () => void;
  update: (config: ConfirmProps) => void;
};

export type ModalHookReturnType = {
  confirm?: modalHookFunction;
  info?: modalHookFunction;
  success?: modalHookFunction;
  warning?: modalHookFunction;
  error?: modalHookFunction;
};
