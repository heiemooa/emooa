import React, { useContext, forwardRef } from 'react';
import { EmptyProps } from './interface';
import { ConfigContext } from '@/config-provider';
import classNames from 'classnames';
import { ConfigProviderProps } from '@/config-provider/interface';
import useStyle from './style';
import EmptyIcon from './icon';

const defaultEmptyImg = <EmptyIcon />;

const Empty = forwardRef<HTMLDivElement, EmptyProps>((props: EmptyProps, ref) => {
  const { getPrefixCls, components, locale }: ConfigProviderProps = useContext(ConfigContext);
  const {
    style,
    className,
    description,
    children,
    icon = defaultEmptyImg,
    ...rest
  }: EmptyProps = Object.assign({}, components?.Empty, props);

  const prefixCls = getPrefixCls('empty');
  const [hashId] = useStyle(prefixCls);

  const classnames = classNames(prefixCls, hashId, className);

  const des = typeof description !== 'undefined' ? description : locale.Empty.message;
  const alt = typeof des === 'string' ? des : 'empty';

  let imageNode: React.ReactNode = null;
  if (typeof icon === 'string') {
    imageNode = <img alt={alt} src={icon} />;
  } else {
    imageNode = icon;
  }

  return (
    <div ref={ref} className={classnames} style={style} {...rest}>
      <div className={`${prefixCls}-image`}>{imageNode}</div>
      {description && <div className={`${prefixCls}-description`}>{description || locale.Empty.message}</div>}
      {children}
    </div>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Empty.displayName = 'Empty';
}

export default Empty;
