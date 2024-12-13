import Button from '@/button';
import ConfigProvider, { ConfigContext } from '@/config-provider';
import {
  IconCheckCircleFill,
  IconClose,
  IconCloseCircleFill,
  IconExclamationCircleFill,
  IconInfoCircleFill,
  IconLoading,
} from '@emooa/icon';
import { IconContext } from '@emooa/icon/esm/context';
import classNames from 'classnames';
import React, { ReactNode, CSSProperties, useEffect, useRef, useContext, useImperativeHandle, forwardRef } from 'react';
import { omitBy, isUndefined, map, isEmpty } from 'lodash';

export interface NoticeProps {
  style?: CSSProperties;
  className?: string;
  title?: ReactNode;
  content?: ReactNode;
  actions?: ReactNode[];
  duration?: number;
  showIcon?: boolean;
  icon?: ReactNode;
  id?: string;
  onClose?: (id) => void;
  position?: string;
  type?: string;
  prefixCls?: string;
  noticeType?: 'message' | 'notification';
  update?: boolean;
  closable?: boolean;
  rtl?: boolean;
  closeIcon?: ReactNode;
}

type NoticeHandle = {
  getRootDOMNode: () => HTMLDivElement;
};

const defaultProps = {
  type: 'info',
  showIcon: true,
  noticeType: 'message',
  duration: 3000,
  closable: false,
};
const Notice = (props: NoticeProps, ref) => {
  const {
    duration,
    onClose,
    id,
    update,
    showIcon,
    icon,
    type,
    prefixCls,
    closable,
    noticeType,
    rtl,
    className,
    style,
    content,
    closeIcon,
    actions,
    title,
  }: NoticeProps = Object.assign({}, defaultProps, omitBy(props, isUndefined));

  const timer = useRef<any>();
  const rootDOMRef = useRef();

  const classnames = classNames(
    prefixCls,
    `${prefixCls}-${type}`,
    {
      [`${prefixCls}-closable`]: closable,
      [`${prefixCls}-rtl`]: rtl,
    },
    className,
  );

  useEffect(() => {
    startTimer();
    return () => {
      removeTimer();
    };
  }, [duration, update]);

  useImperativeHandle<NoticeHandle, NoticeHandle>(
    ref,
    () => ({
      getRootDOMNode: () => rootDOMRef.current,
    }),
    [],
  );

  const startTimer = () => {
    removeTimer();
    // 自动关闭
    if (duration !== 0) {
      timer.current = window.setTimeout(() => {
        onClose?.(id);
        removeTimer();
      }, duration);
    }
  };

  const removeTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const handleClose: React.MouseEventHandler<HTMLSpanElement> = () => {
    onClose?.(id);
  };

  const renderIcon = () => {
    let content: ReactNode;
    if (icon) {
      content = icon;
    } else if (showIcon) {
      switch (type) {
        case 'info':
          content = <IconInfoCircleFill />;
          break;
        case 'success':
          content = <IconCheckCircleFill />;
          break;
        case 'error':
          content = <IconCloseCircleFill />;
          break;
        case 'warning':
          content = <IconExclamationCircleFill />;
          break;
        case 'loading':
          content = <IconLoading />;
          break;
        default:
          break;
      }
      content = <IconContext.Provider value={{}}>{content}</IconContext.Provider>;
    }
    return <span className={`${prefixCls}-icon`}>{content}</span>;
  };

  const onMouseEnter = () => {
    removeTimer();
  };

  const onMouseLeave = () => {
    startTimer();
  };

  const context: React.ContextType<typeof ConfigContext> = useContext(ConfigContext);

  return (
    <>
      {noticeType === 'message' && (
        <ConfigProvider {...context}>
          <div style={{ textAlign: 'center' }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} ref={rootDOMRef}>
            <div className={classnames} style={style} role="alert">
              {showIcon && renderIcon()}
              <span className={`${prefixCls}-content`}>{content}</span>
              {closable &&
                (closeIcon !== undefined ? (
                  <Button
                    size="small"
                    icon={closeIcon}
                    onClick={handleClose}
                    type="text"
                    className={`${prefixCls}-close-btn`}
                  />
                ) : (
                  <Button
                    size="small"
                    icon={<IconClose />}
                    onClick={handleClose}
                    type="text"
                    className={`${prefixCls}-close-btn`}
                  />
                ))}
            </div>
          </div>
        </ConfigProvider>
      )}
      {noticeType === 'notification' && (
        <ConfigProvider {...context}>
          <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} ref={rootDOMRef}>
            <div className={classnames} style={style} role="alert">
              {showIcon && <div>{renderIcon()}</div>}
              <div className={`${prefixCls}-body`}>
                {title && <div className={`${prefixCls}-title`}>{title}</div>}
                <div className={`${prefixCls}-content`}>{content}</div>
                {!isEmpty(actions) && (
                  <div className={`${prefixCls}-actions`}>
                    {map(actions, (action, index) => (
                      <span key={`action-${index}`} className={`${prefixCls}-action`}>
                        {action}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {closable &&
                (closeIcon !== undefined ? (
                  <Button
                    size="small"
                    icon={closeIcon}
                    onClick={handleClose}
                    type="text"
                    className={`${prefixCls}-close-btn`}
                  />
                ) : (
                  <Button
                    size="small"
                    icon={<IconClose />}
                    onClick={handleClose}
                    type="text"
                    className={`${prefixCls}-close-btn`}
                  />
                ))}
            </div>
          </div>
        </ConfigProvider>
      )}
    </>
  );
};

export default forwardRef<NoticeHandle, NoticeProps>(Notice);
