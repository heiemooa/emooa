import React, { useContext, forwardRef, LegacyRef } from 'react';
import { LinkProps } from './interface';
import ConfigProvider, { ConfigContext } from '@/config-provider';
import { ConfigProviderProps } from '@/config-provider/interface';
import Button from '@/button';

const LinkComponent = (props: LinkProps, ref) => {
  const {
    prefixCls,
    getPrefixCls,
    size: componentSize,
    components,
    ...restConfigProvider
  }: ConfigProviderProps = useContext(ConfigContext);
  const {
    className,
    size = componentSize ?? 'medium',
    status = 'default',
    loading,
    icon,
    href,
    disabled,
    target,
    children,
    ...rest
  }: LinkProps = Object.assign({}, components?.Link, props);

  return (
    <ConfigProvider
      getPrefixCls={() => `${prefixCls}-link`}
      size={size}
      components={components}
      {...restConfigProvider}
    >
      <Button
        ref={ref as LegacyRef<HTMLButtonElement>}
        size={size}
        type="text"
        status={status}
        loading={loading}
        disabled={disabled}
        icon={icon}
        href={href}
        target={target}
        anchorProps={rest}
      >
        {children}
      </Button>
    </ConfigProvider>
  );
};

const Link = forwardRef<HTMLLinkElement | HTMLAnchorElement, LinkProps>(LinkComponent);

if (process.env.NODE_ENV !== 'production') {
  Link.displayName = 'Link';
}

export default Link;
