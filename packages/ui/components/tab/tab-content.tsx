import React, { useContext, forwardRef, Key } from 'react';
import { TabItemProps, TabProps } from './interface';
import { ConfigContext } from '@/config-provider';
import { ConfigProviderProps } from '@/config-provider/interface';
import classNames from 'classnames';
import { map, findIndex } from 'lodash';

type TabContentProps = Required<Pick<TabProps, 'items' | 'activeKey'>> & { prefixCls: string };

const TabContent = (props: TabContentProps) => {
  const { rtl }: ConfigProviderProps = useContext(ConfigContext);

  const {
    // styles,
    // classNames: tabClassNames,
    items = [],
    activeKey,
    prefixCls,
  } = props;

  const activeIndex = findIndex(items, { key: activeKey });

  return (
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
  );
};

if (process.env.NODE_ENV !== 'production') {
  TabContent.displayName = 'TabContent';
}

export default TabContent;
