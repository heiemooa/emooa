import React, { useContext, forwardRef, Key, useMemo, useRef, useCallback } from 'react';
import { TabItemProps, TabProps } from './interface';
import { ConfigContext } from '@/config-provider';
import { ConfigProviderProps } from '@/config-provider/interface';
import classNames from 'classnames';
import useStyle from './style';
import { map, get, findIndex } from 'lodash';
import useValue from '@/_utils/hooks/useValue';
import { IconClose, IconPlus } from '@emooa/icon';
import { Enter } from '@/_utils/keycode';
import Button from '@/button';
import TabInk from './tab-ink';

const TabComponent = (props: TabProps, ref) => {
  const { getPrefixCls, components, size: componentSize, rtl }: ConfigProviderProps = useContext(ConfigContext);

  const {
    style,
    styles,
    className,
    classNames: tabClassNames,
    items = [],
    tabPosition = 'top',
    size = componentSize ?? 'medium',
    defaultActiveKey,
    activeKey: _activeKey,
    type = 'line',
    editable,
    icons,
    extra,
    destroyOnHide,
    lazyload,
    onChange,
    onClickTab: _onClickTab,
    onAddTab,
    onDeleteTab,
    ...rest
  }: TabProps = Object.assign({}, components?.Tab, props);

  const prefixCls = getPrefixCls('tab');
  const [hashId] = useStyle(prefixCls);

  const titleRef = useRef({});
  const navRef = useRef(null);

  const [activeKey, setActivekey] = useValue<Key>(get(items, '[0].key') as Key, {
    defaultValue: 'defaultActiveKey' in props ? defaultActiveKey : undefined,
    value: 'activeKey' in props ? _activeKey : undefined,
  });

  const classnames = classNames(
    hashId,
    prefixCls,
    `${prefixCls}-${type}`,
    `${prefixCls}-${size}`,
    {
      [`${prefixCls}-position-${tabPosition}`]: !!tabPosition,
      [`${prefixCls}-rtl`]: !!rtl,
    },
    className,
  );

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

  const activeIndex = findIndex(items, { key: activeKey });
  return (
    <div className={classnames} style={style} ref={ref} {...rest}>
      <div className={`${prefixCls}-header`}>
        <div className={`${prefixCls}-navs`}>
          <div className={`${prefixCls}-nav-items`} ref={navRef}>
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
                getNavRef={() => navRef}
                direction={undefined}
              />
            )}
          </div>
          {renderAddIcon}
        </div>
        <div className={`${prefixCls}-extra`}>{extra}</div>
      </div>
      <div className={`${prefixCls}-content`}>
        <div
          className={`${prefixCls}-panes`}
          style={rtl ? { marginRight: `-${activeIndex * 100}%` } : { marginLeft: `-${activeIndex * 100}%` }}
        >
          {map(items, (item: TabItemProps, index) => (
            <div
              key={index}
              className={classNames(`${prefixCls}-pane-item`, {
                [item.classNames?.content]: !!item.classNames?.content,
                [`${prefixCls}-pane-item-active`]: activeKey === item.key,
              })}
              role="tab-pane"
              tabIndex={activeKey === item.key ? 0 : -1}
              aria-hidden={activeKey !== item.key}
              aria-labelledby={`${prefixCls}-pane-item-${index}`}
              style={item.styles?.content}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Tab = forwardRef<HTMLDivElement, TabProps>(TabComponent);

if (process.env.NODE_ENV !== 'production') {
  Tab.displayName = 'Tab';
}

export default Tab;
