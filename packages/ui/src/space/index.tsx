import React, { useContext, Fragment, forwardRef, ReactElement } from 'react';
import { isArray, isNumber } from '../_utils/is';
import { SpaceSize, SpaceProps } from './interface';
import { ConfigContext } from '../config-provider';
import classNames from 'classnames';
import { ConfigProviderProps } from '../config-provider/interface';

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

const Space: React.FC<SpaceProps> = (props: SpaceProps) => {
  const { prefixCls, getPrefixCls, componentConfig }: ConfigProviderProps = useContext(ConfigContext);

  const {
    className,
    children,
    size = 'small',
    direction = 'horizontal',
    align,
    wrap,
    split,
    style,
    ...rest
  }: SpaceProps = Object.assign({}, componentConfig?.Space, props);

  const innerAlign = align || (direction === 'horizontal' ? 'center' : '');

  const space = getPrefixCls('space');
  const classnames = classNames(
    prefixCls,
    space,
    {
      [`${space}-${direction}`]: direction,
      [`${space}-align-${innerAlign}`]: innerAlign,
      [`${space}-wrap`]: wrap,
    },
    className,
  );

  function getMargin(size: SpaceSize) {
    if (isNumber(size)) {
      return size;
    }
    switch (size) {
      case 'mini':
        return 4;
      case 'small':
        return 8;
      case 'medium':
        return 16;
      case 'large':
        return 24;
      default:
        return 8;
    }
  }

  const getStyle = () => {
    if (typeof size === 'string' || typeof size === 'number') {
      const margin = getMargin(size);
      return { gap: margin };
    }
    if (isArray(size)) {
      return { gap: `${getMargin(size[0])}px ${getMargin(size[1])}px` };
    }
  };

  return (
    <div className={classnames} style={Object.assign({ display: 'flex' }, getStyle(), style)} {...rest}>
      {toArray(children)?.map((child, index) => {
        const key = (child as ReactElement)?.key || index;
        return (
          <Fragment key={key}>
            {split && index > 0 && <span className={`${space}-item-split`}>{split}</span>}
            <div className={`${space}-item`}>{child}</div>
          </Fragment>
        );
      })}
    </div>
  );
};

// const SpaceComponent = forwardRef<unknown, SpaceProps>(Space);

export default Space;
