import React, { Key, useMemo, useRef, useCallback, useState, useEffect, ReactNode, ReactElement } from 'react';
import { TabItemProps, TabProps } from './interface';
import classNames from 'classnames';
import { map, isNumber } from 'lodash';
import { IconClose, IconPlus } from '@emooa/icon';
import { Enter } from '@/_utils/keycode';
import Button from '@/button';
import TabInk from './tab-ink';
import useHeaderScroll from './hook/useHeaderScroll';
import useDomSize from './hook/useDomSIze';
import useResizeObserver from './hook/useResizeObserver';
import { getRectDiff, updateScrollOffset } from './util';
const transformNames = ['transform', 'WebkitTransform', 'msTransform', 'MozTransform', 'OTransform'];

type TabHeaderProps = Required<
  Pick<
    TabProps,
    | 'items'
    | 'activeKey'
    | 'type'
    | 'editable'
    | 'icons'
    | 'extra'
    | 'onChange'
    | 'onClickTab'
    | 'onAddTab'
    | 'onDeleteTab'
  >
> & { prefixCls: string; setActivekey: React.Dispatch<React.SetStateAction<React.Key>> };

const TabHeader = (props: TabHeaderProps) => {
  const {
    // styles,
    // classNames: tabClassNames,
    items = [],
    activeKey,
    setActivekey,
    type = 'line',
    editable,
    icons,
    extra,
    onChange,
    onClickTab: _onClickTab,
    onAddTab,
    onDeleteTab,
    prefixCls,
  } = props;

  const titleRef = useRef<Record<string, HTMLDivElement>>({});
  const [headerWrapperRef, headerWrapperSize, setHeaderWrapperSize] = useDomSize<HTMLDivElement>();
  const [headerRef, headerSize, setHeaderSize] = useDomSize<HTMLDivElement>();

  const onClickTab = (key: Key, item: TabItemProps) => {
    if (item.disabled) return;
    _onClickTab?.(key, item);
    setActivekey(key);
    onChange?.(key);
  };

  const handleAdd = e => {
    e.stopPropagation();
    onAddTab?.();
  };

  const handleDelete = (e, key: Key) => {
    e.stopPropagation();
    onDeleteTab?.(key);
  };

  const renderAddIcon = useMemo(() => {
    return (
      editable && (
        <Button
          className={`${prefixCls}-add-icon`}
          type="text"
          size="mini"
          shape="circle"
          icon={icons?.add || <IconPlus fontSize="12px" />}
          onClick={handleAdd}
          onKeyDown={e => {
            const keyCode = e.keyCode || e.which;
            if (keyCode === Enter.code) {
              handleAdd(e);
            }
          }}
        />
      )
    );
  }, [editable]);

  const renderDeleteIcon = useCallback(
    (item: TabItemProps) => {
      return (
        editable &&
        !item.disabled && (
          <Button
            disabled={item.disabled}
            className={`${prefixCls}-delete-icon`}
            type="text"
            size="mini"
            shape="circle"
            icon={icons?.delete || <IconClose fontSize="12px" />}
            onClick={e => handleDelete(e, item.key)}
            onKeyDown={e => {
              const keyCode = e.keyCode || e.which;
              if (keyCode === Enter.code) {
                handleDelete(e, item.key);
              }
            }}
          />
        )
      );
    },
    [editable],
  );

  const [headerOffset, setHeaderOffset] = useState(0);
  const direction: 'horizontal' | 'vertical' = 'horizontal';
  const DIRECTION_VERTICAL = 'vertical';

  const getValidOffset = useCallback(
    offset => {
      const maxOffset = headerSize.width - headerWrapperSize.width;
      let validOffset = offset;
      validOffset = Math.min(maxOffset, validOffset);
      validOffset = Math.max(validOffset, 0);
      return validOffset;
    },
    [direction, headerSize, headerWrapperSize],
  );

  useHeaderScroll({
    headerWrapperRef,
    headerOffset,
    align: 'left',
    direction,
    isScrollable: true,
    onScroll(offset) {
      updateHeaderOffset(offset);
    },
  });

  useResizeObserver(headerRef, setHeaderSize);
  useResizeObserver(headerWrapperRef, setHeaderWrapperSize);

  const updateHeaderOffset = offset => {
    const nextOffset = getValidOffset(offset);
    if (nextOffset !== headerOffset) {
      setHeaderOffset(nextOffset);
    }
  };

  const getHeaderStyle = ({
    direction,
    align = 'left',
    headerOffset,
  }: {
    direction: string;
    align: string;
    headerOffset: number;
  }) => {
    let value = `translateX(${-headerOffset}px)`;
    if (align === 'right') {
      value = `translateX(${headerOffset}px)`;
    }
    if (direction === DIRECTION_VERTICAL) {
      value = `translateY(${-headerOffset}px)`;
    }

    return setTransformStyle(value);
  };

  const headerStyle = getHeaderStyle({
    direction,
    align: 'left',
    headerOffset,
  });

  function setTransformStyle(value: string): object {
    const style = {};
    transformNames.forEach(name => {
      style[name] = value;
    });
    return style;
  }

  const getCurrentHeaderOffset = ({
    direction,
    align = 'left',
    headerDom,
    headerWrapperDom,
  }: {
    direction: string;
    align: string;
    headerDom: HTMLElement;
    headerWrapperDom: HTMLElement;
  }) => {
    const diffStyle = getRectDiff(headerDom, headerWrapperDom);
    if (direction === DIRECTION_VERTICAL) return -diffStyle.top;
    if (align === 'right') return diffStyle.right;
    return -diffStyle.left;
  };

  // 根据激活的 tab 更新 headerOffset，所以依赖里面不能加 headerOffset
  useEffect(() => {
    // if (!shouldScroll) {
    //   setShouldScroll(true);
    //   return;
    // }

    const getActiveTabOffset = () => {
      const currentTitleNode = titleRef.current[`${activeKey}`];
      if (!currentTitleNode) {
        return 0;
      }
      const diffStyle = getRectDiff(currentTitleNode, headerWrapperRef.current);
      const currentOffset = getCurrentHeaderOffset({
        direction,
        align: 'left',
        headerDom: headerRef.current,
        headerWrapperDom: headerWrapperRef.current,
      });
      // // 垂直方向的 offset 计算，不分type
      // if (direction === 'vertical') {
      //   let nextOffset = currentOffset;
      //   let scrollAlign = scrollPosition;
      //   const topOffset = currentOffset + diffStyle.top;
      //   const bottomOffset = currentOffset + diffStyle.bottom;
      //   if (scrollAlign === 'auto') {
      //     scrollAlign = diffStyle.top < 0 ? 'start' : diffStyle.bottom > 0 ? 'end' : scrollPosition;
      //   }
      //   if (scrollAlign === 'start') {
      //     nextOffset = topOffset;
      //   } else if (scrollAlign === 'end') {
      //     nextOffset = bottomOffset;
      //   } else if (scrollAlign === 'center') {
      //     nextOffset = topOffset - (diffStyle.top - diffStyle.bottom) / 2;
      //   } else if (isNumber(scrollAlign)) {
      //     nextOffset = Math.max(topOffset - scrollAlign, bottomOffset);
      //   }
      //   return nextOffset;
      // }

      // // 水平方向的 offset 计算，分为 capsule 和其他，因为 capsule 是右对齐
      // if (align === 'right') {
      //   const startOffset = currentOffset - diffStyle.left;
      //   const endOffset = currentOffset - diffStyle.right;
      //   let scrollAlign = scrollPosition;
      //   let nextOffset = currentOffset;

      //   if (scrollPosition === 'auto') {
      //     scrollAlign = diffStyle.left < 0 ? 'start' : diffStyle.right > 0 ? 'end' : scrollPosition;
      //   }
      //   if (scrollAlign === 'start') {
      //     nextOffset = startOffset;
      //   } else if (scrollAlign === 'end') {
      //     nextOffset = endOffset;
      //   } else if (scrollAlign === 'center') {
      //     nextOffset = startOffset + (diffStyle.left - diffStyle.right) / 2;
      //   } else if (isNumber(scrollAlign)) {
      //     nextOffset = Math.min(startOffset + scrollAlign, endOffset);
      //   }

      //   return nextOffset;
      // }

      let nextOffset = currentOffset;
      let scrollAlign = 'auto';
      const startOffset = currentOffset + diffStyle.left;
      const endOffset = currentOffset + diffStyle.right;
      scrollAlign = diffStyle.left < 0 ? 'start' : diffStyle.right > 0 ? 'end' : 'auto';

      if (scrollAlign === 'start') {
        nextOffset = startOffset;
      } else if (scrollAlign === 'end') {
        nextOffset = endOffset;
      } else if (scrollAlign === 'center') {
        nextOffset = startOffset - (diffStyle.left - diffStyle.right) / 2;
      }
      return nextOffset;
    };

    updateScrollOffset(headerWrapperRef.current, direction);
    let offset = getActiveTabOffset();
    offset = getValidOffset(offset);
    setHeaderOffset(offset);
  }, [activeKey, direction, type, getValidOffset]);

  return (
    <div className={`${prefixCls}-header`}>
      <div className={`${prefixCls}-navs`} ref={headerWrapperRef}>
        <div className={`${prefixCls}-nav-items`} ref={headerRef} style={headerStyle}>
          {map(items, (item: TabItemProps, index) => (
            <div
              key={index}
              className={classNames(`${prefixCls}-nav-item`, {
                [item.classNames?.label]: !!item.classNames?.label,
                [`${prefixCls}-nav-item-active`]: activeKey === item.key,
              })}
              role="tab-nav"
              aria-selected={activeKey === item.key}
              tabIndex={activeKey === item.key || item.disabled !== true ? 0 : -1}
              aria-labelledby={`${prefixCls}-nav-item-${index}`}
              aria-disabled={item.disabled}
              onClick={() => onClickTab(item.key, item)}
              style={item.styles?.label}
              ref={node => {
                titleRef.current[`${item.key}`] = node;
              }}
              onKeyDown={event => {
                const keyCode = event.keyCode || event.which;
                if (keyCode === Enter.code) {
                  onClickTab(item.key, event);
                }
              }}
            >
              {item.icon}
              <span>{item.label}</span>
              {renderDeleteIcon(item)}
            </div>
          ))}
          {type === 'line' && (
            <TabInk
              prefixCls={prefixCls}
              getTitleRef={key => titleRef.current[key]}
              activeKey={activeKey}
              getNavRef={() => headerRef}
              direction={undefined}
            />
          )}
        </div>
      </div>
      {renderAddIcon}
      <div className={`${prefixCls}-extra`}>{extra}</div>
    </div>
  );
};

if (process.env.NODE_ENV !== 'production') {
  TabHeader.displayName = 'TabHeader';
}

export default TabHeader;
