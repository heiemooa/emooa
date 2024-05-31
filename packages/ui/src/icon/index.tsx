import React, { ForwardRefExoticComponent, RefAttributes, forwardRef, useContext } from 'react';
import classNames from 'classnames';
import { IconProps } from './interface';
import { ConfigContext } from '@/config-provider';
import createFromIconfontCN from './createFromIconfontCN';
import useStyle from './style';

const Icon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { getPrefixCls, components } = useContext(ConfigContext);

  const { type, className, ...rest }: IconProps = Object.assign({}, components?.Icon, props);

  const prefixCls = getPrefixCls('icon');
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const classnames = classNames(
    hashId,
    prefixCls,
    {
      [`${prefixCls}-${type}`]: !!type,
    },
    cssVarCls,
    className,
  );

  return wrapCSSVar(
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
    </svg>,
  );
});

const IconComponent = Icon as typeof Icon & {
  createFromIconfontCN: typeof createFromIconfontCN;
};

IconComponent.createFromIconfontCN = createFromIconfontCN;

export default Icon;
