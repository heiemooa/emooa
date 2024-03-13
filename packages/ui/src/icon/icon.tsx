import React, { ForwardRefExoticComponent, RefAttributes, forwardRef, useContext } from 'react';
import classNames from 'classnames';
import { IconProps } from './interface';
import { ConfigContext } from '@/config-provider';
import createFromIconfontCN from './createFromIconfontCN';

interface IconComponent extends ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> {
  createFromIconfontCN: typeof createFromIconfontCN; // 假设 createFromIconfontCN 是一个函数
}

const Icon: IconComponent = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { prefixCls, getPrefixCls, components } = useContext(ConfigContext);
  const { type, className, ...rest }: IconProps = Object.assign({}, components?.Icon, props);

  const classnames = classNames(
    prefixCls,
    getPrefixCls('icon'),
    {
      [`${prefixCls}-${type}`]: !!type,
    },
    className,
  );

  return (
    <svg
      ref={ref}
      className={classnames}
      height="1em"
      width="1em"
      aria-hidden="true"
      fill="currentColor"
      cursor={!!rest.onClick ? 'pointer' : 'inherit'}
      {...rest}
    >
      <use xlinkHref={`#${type}`}></use>
    </svg>
  );
}) as IconComponent; // 避免 TS 不知道 Icon 组件包含 createFromIconfontCN 属性

Icon.createFromIconfontCN = createFromIconfontCN;

export default Icon;
