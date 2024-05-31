import React, { useContext, forwardRef, ReactNode, LegacyRef } from 'react';
import { ButtonProps } from './interface';
import { ConfigContext } from '@/config-provider';
import classNames from 'classnames';
import { ConfigProviderProps } from '@/config-provider/interface';
import useStyle from './style';
import { IconLoading } from '@emooa/icon';
import Group from './Group';
import omit from '@/_utils/omit';

function processChildren(children?: ReactNode) {
  const childrenList = [];
  let isPrevChildPure = false;
  React.Children.forEach(children, child => {
    const isCurrentChildPure = typeof child === 'string' || typeof child === 'number';
    if (isCurrentChildPure && isPrevChildPure) {
      const lastIndex = childrenList.length - 1;
      const lastChild = childrenList[lastIndex];
      childrenList[lastIndex] = `${lastChild}${child}`;
    } else {
      childrenList.push(child);
    }
    isPrevChildPure = isCurrentChildPure;
  });
  return React.Children.map(childrenList, child => (typeof child === 'string' ? <span>{child}</span> : child));
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>((props: ButtonProps, ref) => {
  const { getPrefixCls, size: componentSize, components, rtl }: ConfigProviderProps = useContext(ConfigContext);
  const {
    className,
    children,
    type = 'secondary',
    size = componentSize ?? 'medium',
    status = 'default',
    shape = 'square',
    href,
    disabled,
    loading,
    full,
    icon,
    htmlType,
    onClick,
    anchorProps,
    target,
    ...rest
  }: ButtonProps = Object.assign({}, components?.Button, props);

  const prefixCls = getPrefixCls('btn');
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const classnames = classNames(
    hashId,
    prefixCls,
    `${prefixCls}-${size}`,
    `${prefixCls}-${status}`,
    `${prefixCls}-${type}`,
    {
      [`${prefixCls}-${size}`]: !!size,
      [`${prefixCls}-${shape}`]: shape !== 'square',
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-full`]: full,
      [`${prefixCls}-rtl`]: rtl,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-icon-only`]: icon && !children,
    },
    className,
    cssVarCls,
  );

  const iconNode = loading ? <IconLoading /> : icon;
  const InnerContent = (
    <>
      {iconNode}
      {processChildren(children)}
    </>
  );

  const handleClick: React.MouseEventHandler<HTMLElement> = (e: any): void => {
    if (loading || disabled) {
      typeof e?.preventDefault === 'function' && e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  if (href) {
    const _anchorProps = { ...anchorProps };
    if (disabled) {
      delete _anchorProps.href;
    } else {
      _anchorProps.href = href;
    }
    return wrapCSSVar(
      <a
        ref={ref as LegacyRef<HTMLAnchorElement>}
        href={disabled ? undefined : href}
        target={target}
        disabled={disabled}
        className={classnames}
        onClick={handleClick}
        {..._anchorProps}
      >
        {InnerContent}
      </a>,
    );
  }

  return wrapCSSVar(
    <button
      ref={ref as LegacyRef<HTMLButtonElement>}
      disabled={disabled}
      className={classnames}
      onClick={handleClick}
      type={htmlType}
      {...rest}
    >
      {InnerContent}
    </button>,
  );
});

const ButtonComponent = Button as typeof Button & {
  Group: typeof Group;
};

ButtonComponent.Group = Group;

export default Button;
