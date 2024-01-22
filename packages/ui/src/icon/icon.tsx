import React from 'react';
import classNames from 'classnames';
import { IconProps } from './interface';
import { ConfigContext } from '../config-provider';

const Icon: React.FC<IconProps> = props => {
  const { prefixCls, getPrefixCls, components } = React.useContext(ConfigContext);

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
      className={classnames}
      height="1em"
      width="1em"
      aria-hidden="true"
      fill="currentColor"
      cursor={!!rest.onClick ? 'pointer' : 'auto'}
      {...rest}
    >
      <use xlinkHref={`#${type}`}></use>
    </svg>
  );
};

export default Icon;
