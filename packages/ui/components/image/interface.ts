import { CSSProperties, HTMLAttributes, ImgHTMLAttributes, ReactElement, ReactNode } from 'react';

/**
 * @title ImagePreviewActionProps
 * @zh `<Image.Preview>` 中类型 `ImagePreviewActionProps` 详细参数。
 * @en Detailed parameters of type `ImagePreviewActionProps` in `<Image.Preview>`.
 */
export interface ImagePreviewActionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  /**
   * @zh 唯一标识
   * @en Unique identifier
   */
  key: string;
  /**
   * @zh 内容
   * @en content
   */
  content: ReactNode;
  /**
   * @zh 名称
   * @en name
   */
  name?: string;
  /**
   * @zh 是否禁用
   * @en Whether disabled
   */
  disabled?: boolean;
}

/**
 * @zh `<Image.Preview>` 详细参数。
 */
export interface ImagePreviewProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 图片获取地址, 在 Image 中默认是 Image 的 src
   * @en Image path, The default in Image is the src of Image
   */
  src?: string;
  /**
   * @zh 图片属性，透传至预览弹窗中的 `img` 标签上
   * @en Image props, passthrough to the `img` tag in the preview modal
   */
  extra?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>;
  /**
   * @zh 是否可见，受控属性
   * @en Whether is visible
   */
  visible?: boolean;
  /**
   * @zh 默认是否可见，非受控
   * @en Whether visible by default
   */
  defaultVisible?: boolean;
  // /**
  //  * @zh 触发 toolbar 切换为 simple 模式的宽度
  //  * @en The width that triggers the toolbar to switch to simple mode
  //  * @defaultValue 316
  //  */
  // breakPoint?: number;
  /**
   * @zh 点击 mask 是否触发关闭
   * @en Whether click mask to close
   * @defaultValue true
   */
  maskClosable?: boolean;
  /**
   * @zh 是否显示关闭按钮
   * @en Whether display close button
   * @defaultValue true
   */
  closable?: boolean;
  /**
   * @zh 额外操作，[ImagePreviewActionProps](#imagepreviewactionprops)
   * @en Extra operations, [ImagePreviewActionProps](#imagepreviewactionprops)
   */
  actions?: ImagePreviewActionProps[];
  /**
   * @zh 控制条的布局
   * @en The layout of the control bar
   * @defaultValue ['fullScreen', 'rotateRight', 'rotateLeft', 'zoomIn', 'zoomOut', 'originalSize', 'extra']
   */
  actionsLayout?: string[];
  /**
   * @zh 在预览缩放时会使用当前数组中的缩放百分比。若不包含 `100%`，则会自动添加在最相邻的位置。
   * @en The zoom percentage in the current array is used when previewing zooms. If `100%` is not included, the `100%` scale will be automatically added in the most adjacent position.
   * @defaultValue [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 110, 120, 130, 140, 150, 175, 200, 250, 300, 400, 500, 750, 1000 ];
   */
  scales?: number[];
  /**
   * @zh 切换可见状态触发的事件
   * @en Callback when visibility changes
   */
  onVisibleChange?: (visible: boolean, preVisible: boolean) => void;
  /**
   * @zh 弹出层挂载的节点
   * @en Get popup's parent node
   * @defaultValue () => document.body
   */
  getPopupContainer?: () => HTMLElement;
  /**
   * @zh  按 `ESC` 键关闭预览
   * @en Whether to enable pressing `ESC` to close the preview.
   * @defaultValue true
   */
  escToExit?: boolean;
  /**
   * @zh 自定义 IMG 元素的渲染
   * @en Rendering of custom IMG elements
   */
  imageRender?: (originalNode: ReactElement) => ReactNode;
  zIndex?: number;
}

export type PartialImagePreviewProps = Partial<ImagePreviewProps>;

/**
 * @title Image.PreviewGroup
 */
export interface ImagePreviewGroupProps extends Omit<PartialImagePreviewProps, 'src'> {
  /**
   * @zh 图片列表 （设置了本属性之后，将不再收集 Image 子组件的图片信息）
   * @en Image path list（After setting this property, the information of the `Image` sub-component will no longer be collected)
   */
  items?: string[];
  /**
   * @zh 当前展示的图片的下标 (受控属性)
   * @en The index of current image (controlled prop)
   */
  current?: number;
  /**
   * @zh 第一张展示的图片的下标
   * @en The default index of first image
   */
  defaultCurrent?: number;
  /**
   * @zh 是否无限循环
   * @en Whether to loop infinitely
   */
  loop?: boolean;
  /**
   * @zh 是否渲染图片列表，用于提前加载图片
   * @en Whether to render the image list for loading images in advance
   */
  forceRender?: boolean;
  /**
   * @zh 切换图片触发的事件
   * @en Callback when image switches
   */
  onChange?: (index: number) => void;
}
interface ImageBaseProps
  extends Omit<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: ReactNode[]; // 额外操作
  preview?: boolean | ImagePreviewProps; // 是否开启预览
  src?: string;
  error?: React.ReactNode; // 错误状态下显示的内容
  motion?: boolean; // 加载成功动画
  delay?: number; // The placeholder will be rendered if the url is not loaded within the delay time range.
  placeholder?: boolean | string | React.ReactNode; // Default image placeholder
  onError?: (e: any) => void;
  onLoad?: (e: any) => void;
}

export type ObserverImageProps = {
  lazy: boolean | IntersectionObserverInit; // 开启懒加载
} & ImageBaseProps;

export type ImageProps = Partial<ObserverImageProps>;
