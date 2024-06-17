import classNames from 'classnames';
import React, { HTMLAttributes, forwardRef } from 'react';
import { IconMore } from '@emooa/icon';
import { ImagePreviewActionProps } from './interface';

interface ImagePreviewToolsProps extends HTMLAttributes<HTMLDivElement> {
  prefixCls: string;
  previewPrefixCls: string;
  simple: boolean;
  actions: ImagePreviewActionProps[];
  actionsLayout: string[];
  defaultActions: ImagePreviewActionProps[];
}

const TriggerForTools = (props: HTMLAttributes<HTMLDivElement> & { prefixCls: string }) => {
  const { style, className, prefixCls, children } = props;
  return (
    <div style={style} className={classNames(`${prefixCls}-trigger`, className)}>
      {children}
    </div>
  );
};

const ImagePreviewTools = forwardRef<HTMLDivElement, ImagePreviewToolsProps>((props, ref) => {
  const {
    prefixCls,
    previewPrefixCls,
    simple = false,
    actions: _actions = [],
    actionsLayout = [],
    defaultActions: _defaultActions = [],
    style,
    className,
  } = props;

  // Filter based on layout
  const actionsLayoutSet = new Set(actionsLayout);
  const filterWithLayout = (item: ImagePreviewActionProps) => actionsLayoutSet.has(item.key);
  const filteredActions = [..._defaultActions.filter(filterWithLayout), ..._actions.filter(filterWithLayout)];
  const extraActions = _actions.filter(item => !actionsLayoutSet.has(item.key));

  // Sort by layout
  const actions = filteredActions.sort((pre, cur) => {
    const preIndex = actionsLayout.indexOf(pre.key);
    const curIndex = actionsLayout.indexOf(cur.key);
    return preIndex > curIndex ? 1 : -1;
  });

  if (actionsLayoutSet.has('extra')) {
    const extraIndex = actionsLayout.indexOf('extra');
    actions.splice(extraIndex, 0, ...extraActions);
  }

  const renderAction = (itemData: ImagePreviewActionProps, renderName = false) => {
    const { content, disabled, key, name, getContainer, onClick, ...rest } = itemData;
    const action = (
      <div
        className={classNames(`${previewPrefixCls}-tools-action`, {
          [`${previewPrefixCls}-tools-action-disabled`]: disabled,
        })}
        key={key}
        onClick={e => {
          if (!disabled && onClick) {
            onClick(e);
          }
        }}
        onMouseDown={e => {
          // To solve the problem that tooltip is selected when button is quickly clicked
          e.preventDefault();
        }}
        {...rest}
      >
        {content && <span className={`${previewPrefixCls}-tools-action-content`}>{content}</span>}
        {renderName && name && <span className={`${previewPrefixCls}-tools-action-name`}>{name}</span>}
      </div>
    );
    if (getContainer) {
      return getContainer(action);
    }
    return action;
  };

  if (!actions.length) return null;

  const currentActions = actions.map(item => {
    const action = renderAction(item, simple);
    if (!simple && item.name && !item.getContainer) {
      return (
        <div content={item.name} key={item.key}>
          {action}
        </div>
      );
    }
    return action;
  });

  return (
    <div
      ref={ref}
      className={classNames(
        `${previewPrefixCls}-tools`,
        {
          [`${previewPrefixCls}-tools-simple`]: simple,
        },
        className,
      )}
      style={style}
    >
      {simple && (
        <TriggerForTools
          prefixCls={prefixCls}
          className={`${previewPrefixCls}-trigger`}
          //   popup={() => <div>{actionList}</div>}
        >
          {renderAction({
            key: 'trigger',
            content: (
              <span>
                <IconMore />
              </span>
            ),
          })}
        </TriggerForTools>
      )}
      {!simple && currentActions}
    </div>
  );
});

export default ImagePreviewTools;
