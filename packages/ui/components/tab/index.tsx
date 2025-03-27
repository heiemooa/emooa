import React, { useContext, forwardRef, Key } from 'react';
import { TabProps } from './interface';
import { ConfigContext } from '@/config-provider';
import { ConfigProviderProps } from '@/config-provider/interface';
import classNames from 'classnames';
import useStyle from './style';
import { get } from 'lodash';
import useValue from '@/_utils/hooks/useValue';
import TabHeader from './tab-header';
import TabContent from './tab-content';

const Component = (props: TabProps, ref) => {
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
    onClickTab,
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

  return (
    <div className={classnames} style={style} ref={ref} {...rest}>
      <TabHeader
        setActivekey={setActivekey}
        activeKey={activeKey}
        prefixCls={prefixCls}
        items={items}
        type={type}
        editable={editable}
        icons={icons}
        extra={extra}
        onChange={onChange}
        onClickTab={onClickTab}
        onAddTab={onAddTab}
        onDeleteTab={onDeleteTab}
      />
      <TabContent items={items} activeKey={activeKey} prefixCls={prefixCls} />
    </div>
  );
};

const Tab = forwardRef<HTMLDivElement, TabProps>(Component);

if (process.env.NODE_ENV !== 'production') {
  Tab.displayName = 'Tab';
}

export default Tab;
