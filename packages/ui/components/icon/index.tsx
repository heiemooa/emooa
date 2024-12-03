import React, { ForwardRefExoticComponent, RefAttributes, forwardRef, useContext } from 'react';
import classNames from 'classnames';
import { IconProps } from './interface';
import { ConfigContext } from '@/config-provider';
import createFromIconfontCN from './createFromIconfontCN';
import useStyle from './style';

const IconComponent = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { getPrefixCls, components } = useContext(ConfigContext);

  const { type, className, ...rest }: IconProps = Object.assign({}, components?.Icon, props);

  const prefixCls = getPrefixCls('icon');
  const [hashId] = useStyle(prefixCls);

  const classnames = classNames(
    hashId,
    prefixCls,
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
});

const Icon = IconComponent as typeof IconComponent & {
  createFromIconfontCN: typeof createFromIconfontCN;
};

Icon.createFromIconfontCN = createFromIconfontCN;

if (process.env.NODE_ENV !== 'production') {
  Icon.displayName = 'Icon';
}

export default Icon;
