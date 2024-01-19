import React from 'react';
import classNames from 'classnames';
import { IconProps } from './interface';
import { ConfigContext } from '../config-provider';

const Icon: React.FC<IconProps> = (props: IconProps) => {
  const { icon, className, ...rest } = props;

  const { prefixCls } = React.useContext(ConfigContext);

  const classname = classNames(
    prefixCls,
    {
      [`${prefixCls}-icon`]: true,
      [`${prefixCls}-${icon}`]: !!icon,
    },
    className,
  );

  return (
    <svg
      className={classname}
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
