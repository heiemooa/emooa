import { ButtonProps } from '@/button/interface';
import { ReactNode, CSSProperties, MouseEvent, HTMLAttributes } from 'react';

/**
 * @title Document
 */
export interface DocumentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content' | 'title' | 'children'> {
  /**
   * @zh 配置弹窗内置模块的类名
   * @en The class of the wrapped dom
   */
  classNames?: {
    header?: string;
    content?: string;
    footer?: string;
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
    wrapper?: CSSProperties;
  };
  /**
   * @zh 标题
   * @en The title element.
   */
  title?: string | ReactNode;
  /**
   * @zh 是否在隐藏的时候销毁 DOM 结构
   * @en Whether to unmount component when hidden
   */
  unmountOnExit?: boolean;
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
   * @zh 正则匹配所有符合规则的路由
   */
  patterns?: RegExp[];
  /**
   * 文档首页
   */
  home?: string;
}
