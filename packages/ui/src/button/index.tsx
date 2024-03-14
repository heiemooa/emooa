import React, { useContext, forwardRef } from 'react';
import { ButtonProps } from './interface';
import { ConfigContext } from '@/config-provider';
import classNames from 'classnames';
import { ConfigProviderProps } from '@/config-provider/interface';
import useStyle from './style';
import IconLoading from '../../../icon/IconLoading';

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref) => {
  const { getPrefixCls, size: componentSize, components, rtl }: ConfigProviderProps = useContext(ConfigContext);
  const {
    className,
    children,
    type = 'default',
    size = componentSize ?? 'medium',
    status = 'default',
    shape = 'default',
    href,
    disabled,
    loading,
    icon,
    onClick,
    ...rest
  }: ButtonProps = Object.assign({}, components?.Button, props);

  const prefixCls = getPrefixCls('btn');
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const classnames = classNames(
    prefixCls,
    hashId,
    {
      [`${prefixCls}-${status}`]: status !== 'default',
      [`${prefixCls}-${type}`]: type !== 'default',
      [`${prefixCls}-${size}`]: size !== 'medium',
      [`${prefixCls}-${shape}`]: shape !== 'default',
      [`${prefixCls}-rtl`]: rtl,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-disbaled`]: disabled,
      [`${prefixCls}-icon-only`]: icon && !children,
    },
    className,
    cssVarCls,
  );

  const iconNode = loading ? <IconLoading /> : icon;
  const InnerContent = (
    <>
      {iconNode}
      {children}
    </>
  );

  return wrapCSSVar(
    <button ref={ref} disabled={disabled} className={classnames} {...rest}>
      {InnerContent}
    </button>,
  );
});

export default Button;
