import React, { useContext, Fragment, forwardRef, ReactElement, useState, useCallback, useEffect } from 'react';
import { SpinProps } from './interface';
import { ConfigContext } from '@/config-provider';
import classNames from 'classnames';
import { ConfigProviderProps } from '@/config-provider/interface';
import useStyle from './style';
import { debounce } from 'lodash';
import { isEmptyReactNode } from '@/_utils/is';
import { IconLoading } from '@emooa/icon';

const Spin = forwardRef<HTMLDivElement, SpinProps>((props: SpinProps, ref) => {
  const { getPrefixCls, components, rtl }: ConfigProviderProps = useContext(ConfigContext);
  const {
    style,
    className,
    children,
    loading: propLoading,
    size,
    icon,
    element,
    tip,
    dot,
    delay,
    block = false,
    ...rest
  }: SpinProps = Object.assign({}, components?.Spin, props);

  const [loading, setLoading] = useState<boolean>(delay ? false : propLoading);
  const debouncedSetLoading = useCallback(debounce(setLoading, delay), [delay]);

  const _usedLoading = delay ? loading : propLoading;

  const prefixCls = getPrefixCls('spin');
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  useEffect(() => {
    delay && debouncedSetLoading(propLoading);
    return () => {
      debouncedSetLoading && debouncedSetLoading.cancel();
    };
  }, [propLoading]);

  const classnames = classNames(
    hashId,
    prefixCls,
    {
      [`${prefixCls}-block`]: block,
      [`${prefixCls}-loading`]: _usedLoading,
      [`${prefixCls}-with-tip`]: tip && !children,
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
      {isEmptyReactNode(children) ? (
        <>
          {loadingIcon}
          {tip ? <div className={`${prefixCls}-tip`}>{tip}</div> : null}
        </>
      ) : (
        <>
          <div className={`${prefixCls}-container`}>{children}</div>
          {_usedLoading && (
            <div className={`${prefixCls}-loading-layer`} style={{ fontSize: size }}>
              <span className={`${prefixCls}-loading-layer-inner`}>
                {loadingIcon}
                {tip ? <div className={`${prefixCls}-tip`}>{tip}</div> : null}
              </span>
            </div>
          )}
        </>
      )}
    </div>,
  );
});

if (process.env.NODE_ENV !== 'production') {
  Spin.displayName = 'Spin';
}

export default Spin;
