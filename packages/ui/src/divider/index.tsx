import React, { useContext, forwardRef } from 'react';
import { ConfigContext } from '../config-provider';
import { DividerProps } from './interface';
import classNames from 'classnames';
import useStyle from './style';
import { ConfigProviderProps } from '../config-provider/interface';

const Divider = forwardRef<HTMLDivElement, DividerProps>((props: DividerProps, ref) => {
  const { getPrefixCls, components }: ConfigProviderProps = useContext(ConfigContext);

  const {
    className,
    children,
    dashed,
    type = 'horizontal',
    orientation = 'center',
    ...rest
  }: DividerProps = Object.assign({}, components?.Divider, props);

  const prefixCls = getPrefixCls('divider');
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const classnames = classNames(
    hashId,
    prefixCls,
    `${prefixCls}-${type}`,
    {
      [`${prefixCls}-dashed`]: !!dashed,
      [`${prefixCls}-with-text`]: children,
      [`${prefixCls}-with-text-${orientation}`]: children && orientation,
    },
    className,
    cssVarCls,
  );

  return wrapCSSVar(
    <div ref={ref} className={classnames} role="separator" {...rest}>
      {children && type === 'horizontal' && (
        <span className={`${prefixCls}-text ${prefixCls}-text-${orientation}`}>{children}</span>
      )}
    </div>,
  );
});

if (process.env.NODE_ENV !== 'production') {
  Divider.displayName = 'Divider';
}

export default Divider;
