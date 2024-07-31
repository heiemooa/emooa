import React, { useContext, forwardRef, useState, useEffect } from 'react';
import { ConfigContext } from '@/config-provider';
import classNames from 'classnames';
import { ConfigProviderProps } from '@/config-provider/interface';
import useStyle from './style';
import { BacktopProps } from './interface';
import BTween from 'b-tween';
import { off, on } from '@/_utils/dom';
import { raf, caf } from '@/_utils/raf';
import EuiCSSTransition from '@/_utils/css-trasition';
import { IconToTop } from '@emooa/icon';
import Button from '@/button';

function throttleByRaf(cb: (...args: any[]) => void) {
  let timer: null | number = null;

  const throttle = function (...args: any[]) {
    timer && caf(timer);
    timer = raf(() => {
      cb(...args);
      timer = null;
    });
  };

  throttle.cancel = () => {
    caf(timer);
    timer = null;
  };

  return throttle;
}

const defaultProps: BacktopProps = {
  visibleHeight: 400,
  easing: 'quartOut',
  duration: 1000,
  animation: 'fade',
  target: () => window,
};

const Component = (props: BacktopProps, ref) => {
  const { getPrefixCls, components, rtl }: ConfigProviderProps = useContext(ConfigContext);
  const { className, easing, animation, duration, children, visibleHeight, onClick, target, ...rest }: BacktopProps =
    Object.assign({}, defaultProps, components?.Backtop, props);

  const rootPrefixCls = getPrefixCls();
  const prefixCls = getPrefixCls('backtop');
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const [visible, setVisible] = useState(false);

  const getTarget = (target: HTMLElement | Window): HTMLElement => {
    return target === window ? document.documentElement : (target as HTMLElement);
  };

  useEffect(() => {
    const currentTarget = target?.();

    const scrollHandler = throttleByRaf(() => {
      const scrollTop = getTarget(currentTarget).scrollTop;
      setVisible(scrollTop >= visibleHeight);
    });

    on(currentTarget, 'scroll', scrollHandler);

    scrollHandler();

    return () => {
      scrollHandler.cancel?.();
      off(currentTarget, 'scroll', scrollHandler);
    };
  }, [target, visibleHeight]);

  const classnames = classNames(
    hashId,
    prefixCls,
    {
      [`${prefixCls}-rtl`]: rtl,
    },
    className,
    cssVarCls,
  );

  const scrollToTop = e => {
    const currentTarget = target?.();
    const dom = getTarget(currentTarget);

    const scrollTop = dom.scrollTop;
    const tween = new BTween({
      from: { scrollTop },
      to: { scrollTop: 0 },
      easing,
      duration,
      onUpdate: keys => {
        dom.scrollTop = keys.scrollTop;
      },
    });
    tween.start();

    onClick?.(e);
  };

  return wrapCSSVar(
    <EuiCSSTransition in={visible} timeout={1000} classNames={`${rootPrefixCls}-${animation}`} appear unmountOnExit>
      <div className={classnames} ref={ref} onClick={scrollToTop} {...rest}>
        {children || (
          <Button className={`${prefixCls}-btn`} type="primary" icon={<IconToTop />} shape="circle" size="large" />
        )}
      </div>
    </EuiCSSTransition>,
  );
};

const Backtop = forwardRef<HTMLDivElement, BacktopProps>(Component);

if (process.env.NODE_ENV !== 'production') {
  Backtop.displayName = 'Backtop';
}

export default Backtop;
