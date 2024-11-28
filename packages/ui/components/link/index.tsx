import React, { useContext, forwardRef, LegacyRef, ReactNode } from 'react';
import { LinkProps } from './interface';
import { ConfigContext } from '@/config-provider';
import { ConfigProviderProps } from '@/config-provider/interface';
import classNames from 'classnames';
import useStyle from './style';
import { IconLoading } from '@emooa/icon';

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

const LinkComponent = (props: LinkProps, ref) => {
  const { getPrefixCls, components, rtl }: ConfigProviderProps = useContext(ConfigContext);

  const {
    className,
    status = 'default',
    loading,
    icon,
    href,
    disabled,
    hoverable = true,
    children,
    onClick,
    ...rest
  }: LinkProps = Object.assign({}, components?.Link, props);

  const prefixCls = getPrefixCls('link');
  const [hashId] = useStyle(prefixCls);

  const classnames = classNames(
    hashId,
    prefixCls,
    `${prefixCls}-${status}`,
    {
      [`${prefixCls}-hoverable`]: hoverable,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-rtl`]: rtl,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-icon-only`]: icon && !children,
    },
    className,
  );

  const handleClick: React.MouseEventHandler<HTMLElement> = (e: any): void => {
    if (loading || disabled) {
      typeof e?.preventDefault === 'function' && e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const iconNode = loading ? <IconLoading /> : icon;
  const InnerContent = (
    <>
      {iconNode}
      {processChildren(children)}
    </>
  );

  return (
    <a
      ref={ref as LegacyRef<HTMLAnchorElement>}
      href={disabled ? undefined : href}
      className={classnames}
      onClick={handleClick}
      {...rest}
    >
      {InnerContent}
    </a>
  );
};

const Link = forwardRef<HTMLLinkElement | HTMLAnchorElement, LinkProps>(LinkComponent);

if (process.env.NODE_ENV !== 'production') {
  Link.displayName = 'Link';
}

export default Link;
