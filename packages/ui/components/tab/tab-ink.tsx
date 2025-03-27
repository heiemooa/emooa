import React, { useRef, CSSProperties, useEffect } from 'react';
import { isEqualWith } from 'lodash';
import classNames from 'classnames';
import { caf, raf } from '@/_utils/raf';
import { getRectDiff } from './util';

const throttleByRaf = (cb: (...args: any[]) => void) => {
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
};

const getInkStyle = (direction, curTitle, navRef) => {
  let style: CSSProperties = { left: '', width: '', top: '', height: '' };

  if (curTitle) {
    const diffStyle = getRectDiff(curTitle, navRef);
    if (direction === 'vertical') {
      style = {
        top: `${diffStyle.top}px`,
        height: `${curTitle.offsetHeight}px`,
        left: '',
        width: '',
      };
    } else {
      style = {
        left: `${diffStyle.left}px`,
        width: `${curTitle.offsetWidth}px`,
        top: '',
        height: '',
      };
    }
  }
  return style;
};

const TabInk = ({ prefixCls, direction, getTitleRef, activeKey, getNavRef }) => {
  const inkRef = useRef<HTMLDivElement>();
  const inkStyleRef = useRef<CSSProperties>();

  useEffect(() => {
    const setInkStyle = throttleByRaf(() => {
      const curTitle = getTitleRef(activeKey);
      const newStyle = getInkStyle(direction, curTitle, getNavRef().current);

      if (newStyle && !isEqualWith(inkStyleRef.current, newStyle)) {
        inkStyleRef.current = newStyle;
        if (inkRef.current?.style) {
          Object.keys(newStyle).forEach(key => {
            inkRef.current.style[key] = newStyle[key];
          });
        }
      }
    });

    setInkStyle();

    return () => {
      setInkStyle?.cancel();
    };
  }, [prefixCls, direction, getTitleRef, activeKey, getNavRef]);

  return <div className={classNames(`${prefixCls}-nav-ink`, {})} ref={inkRef} />;
};

export default TabInk;
