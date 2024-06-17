import classNames from 'classnames';
import React, { CSSProperties, HTMLAttributes, forwardRef } from 'react';
import { ImageProps } from './interface';
import useShowFooter from './utils/hooks/useFooter';

interface ImageFooterProps extends HTMLAttributes<HTMLDivElement> {
  style?: CSSProperties;
  className?: string;
  title?: ImageProps['title'];
  description?: ImageProps['description'];
  actions?: ImageProps['actions'];
  prefixCls: string;
}

const ImageFooter = forwardRef<HTMLDivElement, ImageFooterProps>((props, ref) => {
  const { style, className, title, description, actions, prefixCls } = props;

  const [showFooter, showCaption, showActions] = useShowFooter({ title, description, actions });

  if (!showFooter) return null;

  const footerPrefixCls = `${prefixCls}-footer`;
  const classnames = classNames(footerPrefixCls, className, {
    [`${footerPrefixCls}-with-actions`]: showActions,
  });

  const renderActionList = () => {
    const actionsList = (
      <div className={`${prefixCls}-actions-list`}>
        {actions.map((item, index) => {
          return (
            <div className={`${prefixCls}-actions-item`} key={`${index}`}>
              {item}
            </div>
          );
        })}
      </div>
    );
    return actionsList;
  };

  return (
    <div className={classnames} style={style}>
      {showCaption && (
        <div className={classNames(`${footerPrefixCls}-block`, `${prefixCls}-caption`)}>
          {title && (
            <div className={`${prefixCls}-caption-title`} title={title}>
              {title}
            </div>
          )}
          {description && (
            <div className={`${prefixCls}-caption-description`} title={description}>
              {description}
            </div>
          )}
        </div>
      )}
      {showActions && (
        <div className={classNames(`${footerPrefixCls}-block`, `${prefixCls}-actions`)}>{renderActionList()}</div>
      )}
    </div>
  );
});

export default ImageFooter;
