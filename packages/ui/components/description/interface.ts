import { Size } from '../config-provider/interface';
import React, { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export interface DescriptionItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'style'> {
  key?: React.Key;
  label?: ReactNode;
  value?: ReactNode;
  span?: number;
  visible?: boolean;
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
    value?: CSSProperties;
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
    value?: string;
  };
}

/**
 * @title Descriptions
 */
export interface DescriptionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  styles?: {
    /**
     * @zh 标题样式
     * @en Style of title
     */
    title?: CSSProperties;
    /**
     * @zh 显示标签的单元格的样式
     * @en Style of label
     */
    label?: CSSProperties;
    /**
     * @zh 显示值的单元格的样式
     * @en Style of value
     */
    value?: CSSProperties;
  };

  classNames?: {
    /**
     * @zh 标题类名
     * @en Style of title
     */
    title?: string;
    /**
     * @zh 显示标签的单元格的类名
     * @en Style of label
     */
    label?: string;
    /**
     * @zh 显示值的单元格的类名
     * @en Style of value
     */
    value?: string;
  };

  /**
   * @zh 描述列表的数据
   * @en Data of the description
   */
  items?: DescriptionItemProps[];
  /**
   * @zh
   * 一行放置几列数据，一个数据为一列。支持配置 `column` 为数字或者对象，配置对象格式时，
   * 支持配置为 `{ xs: 1, md: 2, lg: 3 }` 这种形式来支持响应式排列
   * @en Number of data columns in a row, with one data counted as one column. Can be set with a number or object.
   * Use object format such as `{ xs: 1, md: 2, lg: 3 }` for responsive arrangement
   * @defaultValue 3
   */
  column?:
    | number
    | {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        xxl?: number;
        xxxl?: number;
      };
  /**
   * @zh 标题
   * @en Title of the description
   */
  title?: ReactNode;
  /**
   * @zh 标签文字后显示的内容，一般配置为 ` :`
   * @en The content displayed after the label text, generally configured as `:`
   */
  colon?: ReactNode;
  /**
   * @zh 是否显示边框
   * @en Whether to display the border
   */
  bordered?: boolean;
  /**
   * @zh 排列方式
   * @en Layout arrangement
   * @defaultValue horizontal
   */
  layout?: 'horizontal' | 'vertical' | 'inline-horizontal' | 'inline-vertical';
  /**
   * @zh 描述列表的尺寸
   * @en Size of the list
   */
  size?: Size;
}
