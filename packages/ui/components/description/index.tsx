import React, { useContext, forwardRef, useState, useEffect, useRef, Fragment, useMemo } from 'react';
import { DescriptionItemProps, DescriptionProps } from './interface';
import { ConfigContext } from '@/config-provider';
import { ConfigProviderProps } from '@/config-provider/interface';
import classNames from 'classnames';
import useStyle from './style';
import { isObject, isNumber, isArray, forEach, isEmpty, map, filter } from 'lodash';
import useResponsiveObserver, { Breakpoint, responsiveArray } from '@/_utils/hooks/useResponsiveObserve';

const getLength = (arr?: DescriptionItemProps[]) => {
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
    items,
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

  const renderData: DescriptionItemProps[][] = [];

  const _items = useMemo(() => {
    return filter(items, (item: DescriptionItemProps) => item.visible !== false);
  }, [items]);

  if (isArray(_items) && !isEmpty(_items) && currentColumn) {
    forEach(_items, (d: DescriptionItemProps) => {
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

  function renderVerticalItems(d: DescriptionItemProps[], i) {
    return (
      <Fragment key={i}>
        <tr className={`${prefixCls}-row`}>
          {d.map((_d, _i) => {
            const {
              key,
              label,
              value,
              span,
              classNames: descriptionItemClassNames,
              styles: descriptionItemStyles,
              ...rest
            } = _d;

            const colSpanProps = span > 1 ? { colSpan: span } : {};
            return (
              <td
                key={`${key || _i}_label`}
                className={classNames(
                  `${prefixCls}-item-label`,
                  descriptionClassNames?.label,
                  descriptionItemClassNames?.label,
                  {
                    [`${prefixCls}-item-has-colon`]: colon,
                  },
                )}
                {...colSpanProps}
                style={Object.assign({}, styles?.label, descriptionItemStyles?.label)}
                {...rest}
              >
                {_d.label}
              </td>
            );
          })}
        </tr>
        <tr className={`${prefixCls}-row`}>
          {d.map((_d, _i) => {
            const {
              key,
              label,
              value,
              span,
              classNames: descriptionItemClassNames,
              styles: descriptionItemStyles,
              ...rest
            } = _d;
            const colSpanProps = span > 1 ? { colSpan: span } : {};
            return (
              <td
                key={`${key || _i}_value`}
                className={classNames(
                  `${prefixCls}-item-value`,
                  descriptionClassNames?.value,
                  descriptionItemClassNames?.value,
                )}
                {...colSpanProps}
                style={Object.assign({}, styles?.value, descriptionItemStyles?.value)}
                {...rest}
              >
                {value}
              </td>
            );
          })}
        </tr>
      </Fragment>
    );
  }

  function renderHorizontalItems(d: DescriptionItemProps[], i) {
    return (
      <tr key={i} className={`${prefixCls}-row`}>
        {d.map((_d, _i) => {
          const {
            key,
            label,
            value,
            span,
            classNames: descriptionItemClassNames,
            styles: descriptionItemStyles,
            ...rest
          } = _d;

          const colSpanProps = span > 1 ? { colSpan: span * 2 - 1 } : {};
          return (
            <Fragment key={key || _i}>
              <td
                className={classNames(
                  `${prefixCls}-item-label`,
                  descriptionClassNames?.label,
                  descriptionItemClassNames?.label,
                  {
                    [`${prefixCls}-item-has-colon`]: colon,
                  },
                )}
                style={Object.assign({}, styles?.label, descriptionItemStyles?.label)}
                {...rest}
              >
                {label}
              </td>
              <td
                className={classNames(
                  `${prefixCls}-item-value`,
                  descriptionClassNames?.value,
                  descriptionItemClassNames?.value,
                )}
                {...colSpanProps}
                style={Object.assign({}, styles?.value, descriptionItemStyles?.value)}
              >
                {value}
              </td>
            </Fragment>
          );
        })}
      </tr>
    );
  }

  function renderInlineItems(d: DescriptionItemProps[], i) {
    return (
      <tr key={i} className={`${prefixCls}-row`}>
        {d.map((_d, _i) => {
          const {
            key,
            label,
            value,
            span,
            classNames: descriptionItemClassNames,
            styles: descriptionItemStyles,
            ...rest
          } = _d;
          const colSpanProps = span > 1 ? { colSpan: span } : {};
          return (
            <td key={key || _i} {...colSpanProps} className={`${prefixCls}-item`} {...rest}>
              <div
                className={classNames(
                  `${prefixCls}-item-label-inline`,
                  descriptionClassNames?.label,
                  descriptionItemClassNames?.label,
                  {
                    [`${prefixCls}-item-has-colon`]: colon,
                  },
                )}
                style={Object.assign({}, styles?.label, descriptionItemStyles?.label)}
              >
                {label}
              </div>
              <div
                className={classNames(
                  `${prefixCls}-item-value-inline`,
                  descriptionClassNames?.value,
                  descriptionItemClassNames?.value,
                )}
                style={Object.assign({}, styles?.value, descriptionItemStyles?.value)}
              >
                {value}
              </div>
            </td>
          );
        })}
      </tr>
    );
  }

  function renderItems(d: DescriptionItemProps[], i) {
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
          <tbody>{map(renderData, (d, i) => renderItems(d, i))}</tbody>
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
