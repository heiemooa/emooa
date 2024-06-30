import React, { useContext, forwardRef, ReactElement, useState, useCallback, useEffect } from 'react';
import { SpinProps } from './interface';
import { ConfigContext } from '@/config-provider';
import classNames from 'classnames';
import { ConfigProviderProps } from '@/config-provider/interface';
import useStyle from './style';
import { debounce } from 'lodash';
import { isEmptyReactNode } from '@/_utils/is';
import { IconLoading } from '@emooa/icon';

const Spin = forwardRef<HTMLDivElement, SpinProps>((props: SpinProps, ref) => {
  const { getPrefixCls, components }: ConfigProviderProps = useContext(ConfigContext);
  const {
    style,
    className,
    children,
    loading: _loading = true,
    size,
    icon,
    element,
    tip,
    delay,
    full,
    ...rest
  }: SpinProps = Object.assign({}, components?.Spin, props);

  const [loading, setLoading] = useState<boolean>(delay ? false : _loading);
  const debouncedSetLoading = useCallback(debounce(setLoading, delay), [delay]);

  const _usedLoading = delay ? loading : _loading;

  const prefixCls = getPrefixCls('spin');
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  useEffect(() => {
    delay && debouncedSetLoading(_loading);
    return () => {
      debouncedSetLoading && debouncedSetLoading.cancel();
    };
  }, [_loading]);

  const classnames = classNames(
    hashId,
    prefixCls,
    {
      [`${prefixCls}-full`]: full,
      [`${prefixCls}-with-loading`]: _usedLoading,
      [`${prefixCls}-icon-only`]: isEmptyReactNode(children),
    },
    className,
    cssVarCls,
  );

  const loadingIcon = (
    <span className={`${prefixCls}-icon`}>
      {icon
        ? React.cloneElement(icon as ReactElement, {
            className: classNames(`${prefixCls.replace('-spin', '-icon')}-loading`),
            style: {
              fontSize: size,
            },
          })
        : element || <IconLoading style={{ fontSize: size }} />}
    </span>
  );

  return wrapCSSVar(
    <div ref={ref} className={classnames} {...rest}>
      {!isEmptyReactNode(children) && <div className={`${prefixCls}-container`}>{children}</div>}
      {_usedLoading && (
        <div className={classNames(`${prefixCls}-loading`)} style={{ fontSize: size }}>
          <div className={`${prefixCls}-loading-inner`}>
            {loadingIcon}
            {tip ? <div className={`${prefixCls}-tip`}>{tip}</div> : null}
          </div>
        </div>
      )}
    </div>,
  );
});

if (process.env.NODE_ENV !== 'production') {
  Spin.displayName = 'Spin';
}

export default Spin;
