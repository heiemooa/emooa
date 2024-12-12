import React, { useContext, forwardRef, ReactElement, useState, useCallback, useEffect } from 'react';
import { SpinProps } from './interface';
import { ConfigContext } from '@/config-provider';
import classNames from 'classnames';
import { ConfigProviderProps } from '@/config-provider/interface';
import useStyle from './style';
import { debounce } from 'lodash';
import { isEmptyReactNode } from '@/_utils/is';
import { IconLoading } from '@emooa/icon';
import DotLoading from './dot';
import EuiCSSTransition from '@/_utils/css-trasition';

const Spin = forwardRef<HTMLDivElement, SpinProps>((props: SpinProps, ref) => {
  const { getPrefixCls, components, size: componentSize }: ConfigProviderProps = useContext(ConfigContext);
  const {
    className,
    children,
    loading: _loading = true,
    size = componentSize ?? 'medium',
    icon,
    element,
    tip,
    delay,
    full,
    dot,
    color,
    style,
    ...rest
  }: SpinProps = Object.assign({}, components?.Spin, props);

  const [loading, setLoading] = useState<boolean>(delay ? false : _loading);
  const debouncedSetLoading = useCallback(debounce(setLoading, delay), [delay]);

  const _usedLoading = delay ? loading : _loading;

  const prefixCls = getPrefixCls('spin');
  const [hashId] = useStyle(prefixCls);

  useEffect(() => {
    delay && debouncedSetLoading(_loading);
    return () => {
      debouncedSetLoading && debouncedSetLoading.cancel();
    };
  }, [_loading]);

  const classnames = classNames(
    hashId,
    prefixCls,
    `${prefixCls}-${size}`,
    {
      [`${prefixCls}-full`]: full,
      [`${prefixCls}-with-loading`]: _usedLoading,
      [`${prefixCls}-icon-only`]: isEmptyReactNode(children),
      [`${prefixCls}-with-dot`]: dot,
    },
    className,
  );

  const loadingIcon = (
    <span className={`${prefixCls}-icon`}>
      {icon
        ? React.cloneElement(icon as ReactElement, {
            className: classNames(`${prefixCls.replace('-spin', '-icon')}-loading`),
          })
        : element ||
          (dot ? (
            <EuiCSSTransition
              in={dot}
              timeout={200}
              classNames={`${prefixCls}-fade`}
              appear
              mountOnEnter
              unmountOnExit={false}
              onEnter={e => {
                if (!e) return;
                e.style.opacity = '1';
                e.style.transition = `opacity 1s linear`;
              }}
              onExited={e => {
                if (!e) return;
                e.style.opacity = '0';
              }}
            >
              <DotLoading size={size} />
            </EuiCSSTransition>
          ) : (
            <IconLoading />
          ))}
    </span>
  );

  return (
    <div ref={ref} className={classnames} style={color ? Object.assign({}, style, { color }) : style} {...rest}>
      {!isEmptyReactNode(children) && <div className={`${prefixCls}-container`}>{children}</div>}
      {_usedLoading && (
        <div className={classNames(`${prefixCls}-loading`)}>
          <div className={`${prefixCls}-loading-inner`}>
            {loadingIcon}
            {tip ? <div className={`${prefixCls}-tip`}>{tip}</div> : null}
          </div>
        </div>
      )}
    </div>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Spin.displayName = 'Spin';
}

export default Spin;
