import React, { useContext, Fragment, forwardRef, ReactElement, useRef } from 'react';
import { SpaceProps } from './interface';
import { ConfigContext } from '@/config-provider';
import classNames from 'classnames';
import { ConfigProviderProps } from '@/config-provider/interface';
import useStyle from './style';
import { isPresetSize, isValidGapNumber } from '@/_utils/gap';

function toArray(children) {
  let childrenList = [];
  React.Children.forEach(children, child => {
    if (child['$$typeof'] === Symbol.for('react.fragment') && child.props) {
      childrenList = childrenList.concat(toArray(child.props.children));
    } else if (child !== null && child !== undefined) {
      childrenList.push(child);
    }
  });

  return childrenList;
}

const Space = forwardRef<HTMLDivElement, SpaceProps>((props: SpaceProps, ref) => {
  const { getPrefixCls, size: componentSize, components, rtl }: ConfigProviderProps = useContext(ConfigContext);
  const {
    className,
    children,
    size = componentSize ?? 'small',
    direction = 'horizontal',
    align,
    wrap = true,
    split,
    style,
    ...rest
  }: SpaceProps = Object.assign({}, components?.Space, props);

  const innerAlign = align || (direction === 'horizontal' ? 'center' : '');

  const prefixCls = getPrefixCls('space');
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);
  const [horizontalSize, verticalSize] = Array.isArray(size) ? size : ([size, size] as const);

  const isPresetVerticalSize = isPresetSize(verticalSize);
  const isPresetHorizontalSize = isPresetSize(horizontalSize);
  const isValidVerticalSize = isValidGapNumber(verticalSize);
  const isValidHorizontalSize = isValidGapNumber(horizontalSize);

  const classnames = classNames(
    prefixCls,
    hashId,
    {
      [`${prefixCls}-${direction}`]: direction,
      [`${prefixCls}-align-${innerAlign}`]: innerAlign,
      [`${prefixCls}-wrap`]: wrap,
      [`${prefixCls}-rtl`]: rtl,
      [`${prefixCls}-gap-row-${verticalSize}`]: isPresetVerticalSize,
      [`${prefixCls}-gap-col-${horizontalSize}`]: isPresetHorizontalSize,
    },
    className,
    cssVarCls,
  );

  const getStyle = (): React.CSSProperties => {
    const styles = {};

    if (!isPresetHorizontalSize && isValidHorizontalSize) {
      styles['columnGap'] = horizontalSize;
    }

    if (!isPresetVerticalSize && isValidVerticalSize) {
      styles['rowGap'] = verticalSize;
    }

    return styles;
  };

  return wrapCSSVar(
    <div ref={ref} className={classnames} style={Object.assign({}, getStyle(), style)} {...rest}>
      {toArray(children)?.map((child, index) => {
        const key = (child as ReactElement)?.key || index;
        return (
          <Fragment key={key}>
            {split && index > 0 && <span className={`${prefixCls}-item-split`}>{split}</span>}
            <div className={`${prefixCls}-item`}>{child}</div>
          </Fragment>
        );
      })}
    </div>,
  );
});

export default Space;
