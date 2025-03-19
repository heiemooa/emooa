import React, { useContext, forwardRef, Key, useMemo, useRef } from 'react';
import { TabItemProps, TabProps } from './interface';
import { ConfigContext } from '@/config-provider';
import { ConfigProviderProps } from '@/config-provider/interface';
import classNames from 'classnames';
import useStyle from './style';
import { map, get } from 'lodash';
import useValue from '@/_utils/hooks/useValue';
import { IconPlus } from '@emooa/icon';
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
    animation,
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
    _onClickTab?.(key, item);
    setActivekey(key);
    onChange?.(key);
  };

  const handleAdd = e => {
    onAddTab?.();
  };

  const renderAddIcon = useMemo(() => {
    return (
      editable && (
        <span
          className={`${prefixCls}-add-icon`}
          aria-label="add tab"
          tabIndex={0}
          onClick={handleAdd}
          onKeyDown={e => {
            const keyCode = e.keyCode || e.which;
            if (keyCode === Enter.code) {
              handleAdd(e);
            }
          }}
        >
          <Button type="text" size="mini" shape="circle" icon={icons?.add || <IconPlus />} />
        </span>
      )
    );
  }, [editable]);

  const titleRef = useRef({});
  const navRef = useRef(null);
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
                role="tabnav"
                aria-selected={activeKey === item.key}
                tabIndex={activeKey === item.key ? 0 : -1}
                aria-labelledby={`${prefixCls}-nav-item-${index}`}
                aria-disabled={item.disabled}
                onClick={() => onClickTab(item.key, item)}
                style={item.styles?.label}
                ref={node => {
                  titleRef.current[`${item.key}`] = node;
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
            {type === 'line' && (
              <TabInk
                prefixCls={prefixCls}
                // animation={animation}
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
        {map(items, (item: TabItemProps, index) => (
          <div
            key={index}
            className={classNames(`${prefixCls}-content-item`, {
              [item.classNames?.content]: !!item.classNames?.content,
              [`${prefixCls}-content-item-active`]: activeKey === item.key,
            })}
            role="tabpanel"
            tabIndex={activeKey === item.key ? 0 : -1}
            aria-hidden={activeKey !== item.key}
            aria-labelledby={`${prefixCls}-content-item-${index}`}
            style={item.styles?.content}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

const Tab = forwardRef<HTMLDivElement, TabProps>(TabComponent);

if (process.env.NODE_ENV !== 'production') {
  Tab.displayName = 'Tab';
}

export default Tab;
