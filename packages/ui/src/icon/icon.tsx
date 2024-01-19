import React from 'react';
import classnames from 'classnames';
import { IconProps } from './interface';
import { ConfigContext } from '../config-provider';

const Icon: React.FC<IconProps> = (props: IconProps) => {
  const { icon, className, ...rest } = props;

  const { prefixCls, getPrefixCls } = React.useContext(ConfigContext);

  const classNames = classnames(
    prefixCls,
    getPrefixCls('icon'),
    {
      [`${prefixCls}-${icon}`]: !!icon,
    },
    className,
  );

  return (
    <svg
      className={classNames}
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
