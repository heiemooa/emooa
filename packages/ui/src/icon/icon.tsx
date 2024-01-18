import React from 'react';
import classNames from 'classnames';
import Context from '../context';

interface IconBaseProps extends React.HTMLProps<SVGSVGElement> {
  spin?: boolean;
  rotate?: number;
}

export interface IconProps<T extends string = string> extends IconBaseProps {
  icon: T;
}

const Icon = (props: IconProps) => {
  const { icon, className, ...rest } = props;

  const { prefixCls, rootClassName } = React.useContext(Context);

  const classname = classNames(
    rootClassName,
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
