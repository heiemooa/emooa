import { ReactNode } from 'react';
import { Locale } from '@/_locale/interface';
import { ImageProps } from '@/image/interface';
import { IconProps } from '@/icon/interface';
import { GeoJSONProps } from '@/geojson/interface';
import { SpaceProps } from '@/space/interface';
import { EuiTokenProviderProps } from '@/_theme/interface';
import { ButtonProps } from '@/button/interface';
import { DividerProps } from '@/divider/interface';
import { WatermarkProps } from '@/watermark/interface';
import { SpinProps } from '@/spin/interface';
import { ModalProps } from '@/modal/interface';

export type Size = 'mini' | 'small' | 'medium' | 'large';

export type Components = {
  Button?: ButtonProps;
  Divider?: DividerProps;
  Modal?: ModalProps;
  Image?: ImageProps;
  Icon?: IconProps;
  GeoJSON?: GeoJSONProps;
  Space?: SpaceProps;
  Spin?: SpinProps;
  Watermark?: WatermarkProps;
};

/**
 * @title ConfigProvider
 */
export interface ConfigProviderProps {
  /**
   * @zh 用于全局配置所有组件的默认参数
   * @en Default parameters for global configuration of all components
   */
  components?: Components;
  /**
   * @zh 设置语言包
   * @en Language package setting
   */
  locales?: {
    [key: string]: Locale;
  };
  locale?: Locale;
  /**
   * @zh 主题配置
   * @en Theme Configuration
   */
  theme?: EuiTokenProviderProps;
  /**
   * @zh 配置组件的默认尺寸，只会对支持`size`属性的组件生效。
   * @en Configure the default size of the component, which will only take effect for components that support the `size` property.
   * @defaultValue medium
   */
  size?: Size;
  /**
   * @zh 视图的表现形式是从右开始向左结束。
   * @en View starts from the right and ends on the left.
   */
  rtl?: boolean;
  /**
   * @zh 全局组件类名前缀
   * @en Global ClassName prefix
   */
  prefixCls?: string;
  getPrefixCls?: (componentName?: string, customPrefix?: string) => string;
  children?: ReactNode;
}
