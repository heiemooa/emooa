import React from 'react';
import classNames from 'classnames';
import { IconProps } from './interface';
import { ConfigContext } from '../config-provider';

const Icon: React.FC<IconProps> = props => {
  const { prefixCls, getPrefixCls, componentConfig } = React.useContext(ConfigContext);

  const { icon, className, ...rest }: IconProps = Object.assign({}, componentConfig?.Icon, props);

  const classnames = classNames(
    prefixCls,
    getPrefixCls('icon'),
    {
      [`${prefixCls}-${icon}`]: !!icon,
    },
    className,
  );

  return (
    <svg
      className={classnames}
      height="1em"
      width="1em"
      aria-hidden="true"
      fill="currentColor"
      cursor={!!rest.onClick ? 'pointer' : 'auto'}
      {...rest}
    >
      <use xlinkHref={`#${icon}`}></use>
    </svg>
  );
};

export default Icon;
