import classNames from 'classnames';
import React, { HTMLAttributes, forwardRef, useContext } from 'react';
import { ImagePreviewActionProps } from './interface';
import { PreviewGroupContext } from './previewGroupContext';

interface ImagePreviewToolsProps extends HTMLAttributes<HTMLDivElement> {
  prefixCls: string;
  previewPrefixCls: string;
  actions: ImagePreviewActionProps[];
  actionsLayout: string[];
  defaultActions: ImagePreviewActionProps[];
}

const ImagePreviewTools = forwardRef<HTMLDivElement, ImagePreviewToolsProps>((props, ref) => {
  const {
    previewPrefixCls,
    actions: _actions = [],
    actionsLayout = [],
    defaultActions: _defaultActions = [],
    style,
    className,
  } = props;
  const { previewUrlMap, currentIndex } = useContext(PreviewGroupContext);
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

  const renderAction = (itemData: ImagePreviewActionProps) => {
    const { content, disabled, key, name, onClick, ...rest } = itemData;
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
      </div>
    );
    return action;
  };

  if (!actions.length) return null;

  const currentActions = actions.map(item => {
    const action = renderAction(item);
    if (item.name) {
      return (
        <div content={item.name} key={item.key}>
          {action}
        </div>
      );
    }
    return action;
  });

  return (
    <div ref={ref} className={classNames(`${previewPrefixCls}-tools`, className)} style={style}>
      {previewUrlMap.size ? (
        <div className={`${previewPrefixCls}-tools-progress`}>{`${currentIndex + 1} / ${previewUrlMap.size}`}</div>
      ) : null}
      {currentActions}
    </div>
  );
});

export default ImagePreviewTools;
