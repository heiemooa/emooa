import React, { useState, useContext, forwardRef, useEffect } from 'react';
import { GridRowGutter, RowProps } from './interface';
import { RowContext } from './context';
import { ConfigProviderProps } from '@/config-provider/interface';
import { ConfigContext } from '@/config-provider';
import classNames from 'classnames';
import useResponsiveObserver, { Breakpoint, responsiveArray, ScreenMap } from './utils/responsiveObserve';
import useProps from '@/_utils/hooks/useProps';
import omit from '@/_utils/omit';
import { useRowStyle } from './style';

const defaultProps: RowProps = {
  gutter: 0,
  align: 'start',
  justify: 'start',
  wrap: true,
};

function Row(baseProps: RowProps, ref) {
  const { getPrefixCls, components, rtl }: ConfigProviderProps = useContext(ConfigContext);
  const prefixCls = getPrefixCls('row');
  const [hashId] = useRowStyle(prefixCls);

  const props = useProps<RowProps>(baseProps, defaultProps, components?.['Grid.Row']);
  const { className, style, children, align, justify, gutter, wrap, ...rest } = props;
  const [screens, setScreens] = useState<ScreenMap>({
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
    xxl: true,
  });

  const ResponsiveObserve = useResponsiveObserver();

  useEffect(() => {
    const token = ResponsiveObserve.subscribe(screens => {
      if (
        (!Array.isArray(gutter) && typeof gutter === 'object') ||
        (Array.isArray(gutter) && (typeof gutter[0] === 'object' || typeof gutter[1] === 'object'))
      ) {
        setScreens(screens);
      }
    });

    return () => {
      ResponsiveObserve.unsubscribe(token);
    };
  }, []);

  function getGutter(gutter: GridRowGutter): number {
    let result = 0;

    if (typeof gutter === 'object') {
      for (let i = 0; i < responsiveArray.length; i++) {
        const breakpoint: Breakpoint = responsiveArray[i];
        if (screens[breakpoint] && gutter[breakpoint] !== undefined) {
          result = gutter[breakpoint] as number;
          break;
        }
      }
    } else {
      result = gutter;
    }

    return result;
  }

  const classnames = classNames(
    prefixCls,
    hashId,
    {
      [`${prefixCls}-no-wrap`]: !wrap,
      [`${prefixCls}-align-${align}`]: align,
      [`${prefixCls}-justify-${justify}`]: justify,
      [`${prefixCls}-rtl`]: rtl,
    },
    className,
  );
  const marginStyle: {
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
  } = {};
  const gutterHorizontal = getGutter(Array.isArray(gutter) ? gutter[0] : gutter);
  const gutterVertical = getGutter(Array.isArray(gutter) ? gutter[1] : 0);

  if (gutterHorizontal || gutterVertical) {
    const marginHorizontal = -gutterHorizontal / 2;
    const marginVertical = -gutterVertical / 2;
    if (marginHorizontal) {
      marginStyle.marginLeft = marginHorizontal;
      marginStyle.marginRight = marginHorizontal;
    }
    if (marginVertical) {
      marginStyle.marginTop = marginVertical;
      marginStyle.marginBottom = marginVertical;
    }
  }

  return (
    <div
      ref={ref}
      {...omit(rest, ['gutter'])}
      style={{
        ...style,
        ...marginStyle,
      }}
      className={classnames}
    >
      <RowContext.Provider value={{ gutter: [gutterHorizontal, gutterVertical] }}>{children}</RowContext.Provider>
    </div>
  );
}

const RowComponent = forwardRef(Row);

RowComponent.displayName = 'Row';

export default RowComponent;
