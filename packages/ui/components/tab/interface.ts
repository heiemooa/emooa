import { Size } from '../config-provider/interface';
import { CSSProperties, HTMLAttributes, Key, ReactNode } from 'react';

export interface TabItemProps {
  key: Key;
  label?: ReactNode;
  disabled?: boolean;
  content?: ReactNode;
  icon?: ReactNode;
  styles?: {
    /**
     * @zh 显示标签的单元格的样式
     * @en Style of label
     */
    label?: CSSProperties;
    /**
     * @zh 显示值的单元格的样式
     * @en Style of value
     */
    content?: CSSProperties;
  };

  classNames?: {
    /**
     * @zh 显示标签的单元格的类名
     * @en Style of label
     */
    label?: string;
    /**
     * @zh 显示值的单元格的类名
     * @en Style of value
     */
    content?: string;
  };
}

/**
 * @title Tabs
 */
export interface TabProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onChange'> {
  styles?: {
    /**
     * @zh 显示标签的单元格的样式
     * @en Style of label
     */
    label?: CSSProperties;
    /**
     * @zh 显示值的单元格的样式
     * @en Style of value
     */
    content?: CSSProperties;
  };

  classNames?: {
    /**
     * @zh 标题类名
     * @en Style of title
     */
    label?: string;
    /**
     * @zh 显示标签的单元格的类名
     * @en Style of label
     */
    content?: string;
  };

  /**
   * @zh 描述列表的数据
   * @en Data of the tab
   */
  items?: TabItemProps[];
  /**
   * @zh 默认选中的标签选项卡，如不指定默认选择第一个
   * @en The Tab selected by default. If not specified, the first one is selected
   */
  defaultActiveKey?: Key;
  /**
   * @zh 当前选中的 tab 的 key
   * @en The key of the currently selected tab
   */
  activeKey?: Key;
  /**
   * @zh 选项卡位置
   * @en Position of tabs
   * @defaultValue top
   */
  tabPosition?: 'left' | 'right' | 'top' | 'bottom';
  /**
   * @zh 有四个尺寸供选择，分别为`mini`, `small`, `medium`, `large`
   * @en Size of tabs
   */
  size?: Size;
  /**
   * @zh 标签选项卡的类型
   * @en Type of tabs
   * @defaultValue line
   */
  type?: 'line' | 'card' | 'card-gutter' | 'capsule';
  /**
   * @zh 是否允许增减标签。只在 `type` 为 `card` 或 `card-gutter` 时候生效。
   * @en Whether to allow adding or subtracting tabs. It only effect when `type` is `card` or `card-gutter`.
   */
  editable?: boolean;
  /**
   * @zh 标签页头部 编辑/滚动/下拉 图标配置。对于不想展示的图标可以将其设置为`null`
   * @en Tab header edit/scroll/dropdown icon configuration. You can set it to `null` for icons you don't want to display
   */
  icons?: {
    add?: ReactNode;
    delete?: ReactNode;
    prev?: ReactNode;
    next?: ReactNode;
    dropdown?: ReactNode;
  };
  /**
   * @zh 显示在标签页右侧的附加
   * @en Additional on the right side of the tab
   */
  extra?: ReactNode;
  /**
   * @zh 是否销毁隐藏标签页的节点, `TabPane` 的该属性优先级高于 `Tabs`。
   * @en Whether to destroy the DOM structure in the TabPane when the tab is hidden. This attribute of `TabPane` has higher priority than `Tabs`.
   */
  destroyOnHide?: boolean;
  /**
   * @zh 设置为 `true` 时，将不会在组件挂载的时候渲染被隐藏的标签页。
   * @en When set to `true`, hidden tabs will not be rendered when the component is mounted.
   * @defaultValue true
   */
  lazyload?: boolean;
  // /**
  //  * @zh 自定义删除按钮
  //  * @en Custom delete button
  //  */
  // deleteButton?: ReactNode;
  // /**
  //  * @zh 自定义新增按钮
  //  * @en Custom add button
  //  */
  // addButton?: ReactNode;
  /**
   * @zh `activeTab` 改变的回调
   * @en Callback when `activeTab` changed
   */
  onChange?: (key: Key) => void;
  /**
   * @zh 点击选项卡的回调
   * @en Callback when click Tab
   */
  onClickTab?: (key: Key, tab: TabItemProps) => void;
  /**
   * @zh 点击新增 tab 按钮的回调
   * @en Callback when click Add Button
   */
  onAddTab?: () => void;
  /**
   * @zh 点击删除按钮的回调
   * @en Callback when click Delete Button
   */
  onDeleteTab?: (key: Key) => void;
}
