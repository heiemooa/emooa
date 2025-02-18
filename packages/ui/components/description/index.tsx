import React, { useContext, forwardRef, useState, useEffect, useRef, Fragment } from 'react';
import { DataType, DescriptionProps } from './interface';
import { ConfigContext } from '@/config-provider';
import { ConfigProviderProps } from '@/config-provider/interface';
import classNames from 'classnames';
import useStyle from './style';
import { isObject, isNumber, isArray } from 'lodash';
import useResponsiveObserver, { Breakpoint, responsiveArray } from '@/_utils/hooks/useResponsiveObserve';

const getLength = (arr?: DataType) => {
  return isArray(arr) ? arr.reduce((p, n) => p + (n.span || 1), 0) : 0;
};

const DescriptionComponent = (props: DescriptionProps, ref) => {
  const { getPrefixCls, components, size: componentSize, rtl }: ConfigProviderProps = useContext(ConfigContext);

  const {
    style,
    styles,
    className,
    classNames: descriptionClassNames,
    column = 3,
    title,
    data,
    bordered,
    layout = 'horizontal',
    colon = layout === 'inline-horizontal' ? true : false,
    size = componentSize ?? 'medium',
    ...rest
  }: DescriptionProps = Object.assign({}, components?.Description, props);

  const prefixCls = getPrefixCls('description');
  const [hashId] = useStyle(prefixCls);
  const [screen, setScreen] = useState<Breakpoint>();

  const responsiveToken = useRef(null);

  const ResponsiveObserve = useResponsiveObserver();

  useEffect(() => {
    responsiveToken.current = ResponsiveObserve.subscribe(screens => {
      for (let i = 0; i < responsiveArray.length; i++) {
        const breakpoint: Breakpoint = responsiveArray[i];
        if (screens[breakpoint]) {
          setScreen(breakpoint);
          break;
        }
      }
    });

    return () => {
      ResponsiveObserve.unsubscribe(responsiveToken.current);
    };
  }, []);

  // get current column number
  let currentColumn = 3;
  if (isObject(column)) {
    currentColumn = column[screen] || 3;
  }
  if (isNumber(column) && (column as number) > 0) {
    currentColumn = column as number;
  }

  const renderData = [];
  if (isArray(data) && data.length > 0 && currentColumn) {
    data.forEach(d => {
      const lastOne = renderData[renderData.length - 1];
      const length = getLength(lastOne);
      if (length === 0) {
        renderData.push([{ ...d, span: d.span ? (d.span > currentColumn ? currentColumn : d.span) : 1 }]);
      } else if (length === currentColumn) {
        renderData.push([
          {
            ...d,
            span: d.span ? (d.span > currentColumn ? currentColumn : d.span) : 1,
          },
        ]);
      } else {
        lastOne.push({
          ...d,
          span: d.span ? (d.span + length > currentColumn ? currentColumn - length : d.span) : 1,
        });
      }
    });
    const lastOne = renderData[renderData.length - 1];
    const lastLength = getLength(lastOne);
    if (lastLength < currentColumn) {
      lastOne[lastOne.length - 1].span = lastOne[lastOne.length - 1].span + currentColumn - lastLength;
    }
  }

  function renderVerticalItems(d, i) {
    return (
      <Fragment key={i}>
        <tr className={`${prefixCls}-row`}>
          {d.map((_d, _i) => {
            const colSpanProps = _d.span > 1 ? { colSpan: _d.span } : {};
            return (
              <td
                key={`${_d.key || _i}_label`}
                className={classNames(`${prefixCls}-item-label`, descriptionClassNames?.label, {
                  [`${prefixCls}-item-has-colon`]: colon,
                })}
                {...colSpanProps}
                style={styles?.label}
              >
                {_d.label}
              </td>
            );
          })}
        </tr>
        <tr className={`${prefixCls}-row`}>
          {d.map((_d, _i) => {
            const colSpanProps = _d.span > 1 ? { colSpan: _d.span } : {};
            return (
              <td
                key={`${_d.key || _i}_value`}
                className={classNames(`${prefixCls}-item-value`, descriptionClassNames?.value)}
                {...colSpanProps}
                style={styles?.value}
              >
                {_d.value}
              </td>
            );
          })}
        </tr>
      </Fragment>
    );
  }

  function renderHorizontalItems(d, i) {
    return (
      <tr key={i} className={`${prefixCls}-row`}>
        {d.map((_d, _i) => {
          const colSpanProps = _d.span > 1 ? { colSpan: _d.span * 2 - 1 } : {};
          return (
            <Fragment key={_d.key || _i}>
              <td
                className={classNames(`${prefixCls}-item-label`, descriptionClassNames?.label, {
                  [`${prefixCls}-item-has-colon`]: colon,
                })}
                style={styles?.label}
              >
                {_d.label}
              </td>
              <td
                className={classNames(`${prefixCls}-item-value`, descriptionClassNames?.value)}
                {...colSpanProps}
                style={styles?.value}
              >
                {_d.value}
              </td>
            </Fragment>
          );
        })}
      </tr>
    );
  }

  function renderInlineItems(d, i) {
    return (
      <tr key={i} className={`${prefixCls}-row`}>
        {d.map((_d, _i) => {
          const colSpanProps = _d.span > 1 ? { colSpan: _d.span } : {};
          return (
            <td key={_d.key || _i} {...colSpanProps} className={`${prefixCls}-item`}>
              <div
                className={classNames(`${prefixCls}-item-label-inline`, descriptionClassNames?.label, {
                  [`${prefixCls}-item-has-colon`]: colon,
                })}
                style={styles?.label}
              >
                {_d.label}
              </div>
              <div
                className={classNames(`${prefixCls}-item-value-inline`, descriptionClassNames?.value)}
                style={styles?.value}
              >
                {_d.value}
              </div>
            </td>
          );
        })}
      </tr>
    );
  }

  function renderItems(d, i) {
    if (layout === 'inline-vertical' || layout === 'inline-horizontal') {
      return renderInlineItems(d, i);
    }
    return layout === 'vertical' ? renderVerticalItems(d, i) : renderHorizontalItems(d, i);
  }

  const classnames = classNames(
    hashId,
    prefixCls,
    {
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-layout-${layout}`]: layout,
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-rtl`]: rtl,
    },
    className,
  );

  return (
    <div className={classnames} style={style} {...rest}>
      {title && (
        <div className={classNames(`${prefixCls}-title`, descriptionClassNames?.title)} style={styles?.title}>
          {title}
        </div>
      )}
      <div className={`${prefixCls}-body`}>
        <table className={`${prefixCls}-table`} cellPadding={0} cellSpacing={0}>
          <tbody>{renderData.map((d, i) => renderItems(d, i))}</tbody>
        </table>
      </div>
    </div>
  );
};

const Description = forwardRef<HTMLDivElement, DescriptionProps>(DescriptionComponent);

if (process.env.NODE_ENV !== 'production') {
  Description.displayName = 'Description';
}

export default Description;
