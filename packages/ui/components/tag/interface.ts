import { Size } from '../config-provider/interface';
import { ReactNode } from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @zh 设置标签背景颜色
   * @en The background color of Tag
   */
  color?: string;
  /**
   * @zh 是否显示边框
   * @en Whether the tag is bordered
   */
  bordered?: Boolean;
  /**
   * @zh 标签尺寸
   * @en The size of Tag
   * @defaultValue small
   */
  size?: Size;
  /**
   * @zh 设置标签显示隐藏
   * @en Whether the Tag is visible
   */
  visible?: boolean;
  /**
   * @zh 是否可关闭标签
   * @en Whether the Tag is closable
   */
  closable?: boolean;
  /**
   * @zh 是否支持选中
   * @en Whether the Tag is checkable
   */
  checkable?: boolean;
  /**
   * @zh 是否默认选中
   * @en Initial checked state
   */
  defaultChecked?: boolean;
  /**
   * @zh 是否选中（受控模式）
   * @en Used for setting the currently selected value(Controlled Component)
   */
  checked?: boolean;
  /**
   * @zh 设置图标
   * @en Set icon
   */
  icon?: ReactNode;
  /**
   * @zh 自定义关闭图标
   * @en Custom Close Icon
   */
  closeIcon?: ReactNode;
  /**
   * @zh 关闭标签回调函数
   * @en Callback when the tag closed
   */
  onClose?: (e) => Promise<any> | void;
  /**
   * @zh 选中的回调
   * @en Callback when checked the tag
   */
  onCheck?: (checked: boolean) => void;
}
