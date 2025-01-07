import React, { useContext, forwardRef, ReactNode, useState } from 'react';
import { AlertProps } from './interface';
import { ConfigContext } from '@/config-provider';
import { ConfigProviderProps } from '@/config-provider/interface';
import classNames from 'classnames';
import useStyle from './style';
import {
  IconCheckCircleFill,
  IconClose,
  IconCloseCircleFill,
  IconExclamationCircleFill,
  IconInfoCircleFill,
} from '@emooa/icon';
import EuiCSSTransition from '@/_utils/css-trasition';
import Button from '@/button';

const AlertComponent = (props: AlertProps, ref) => {
  const { getPrefixCls, components, rtl }: ConfigProviderProps = useContext(ConfigContext);

  const {
    className,
    type = 'info',
    icon,
    children,
    afterClose,
    onClose,
    showIcon = true,
    closable,
    closeIcon,
    title,
    content,
    action,
    banner,
    ...rest
  }: AlertProps = Object.assign({}, components?.Alert, props);

  const prefixCls = getPrefixCls('alert');
  const [hashId] = useStyle(prefixCls);
  const [visible, setVisible] = useState<boolean>(true);

  const classnames = classNames(
    hashId,
    prefixCls,
    `${prefixCls}-${type}`,
    {
      [`${prefixCls}-rtl`]: rtl,
      [`${prefixCls}-banner`]: banner,
      [`${prefixCls}-with-title`]: title,
    },
    className,
  );

  function renderIcon(type: string): ReactNode {
    if (icon) {
      return icon;
    }
    switch (type) {
      case 'info':
        return <IconInfoCircleFill />;
      case 'success':
        return <IconCheckCircleFill />;
      case 'warning':
        return <IconExclamationCircleFill />;
      case 'error':
        return <IconCloseCircleFill />;
      default:
        return null;
    }
  }

  function onHandleClose(e) {
    setVisible(false);
    onClose?.(e);
  }

  return (
    <EuiCSSTransition
      in={visible}
      timeout={3000}
      classNames={`${prefixCls}-animate`}
      unmountOnExit
      onExited={() => {
        afterClose?.();
      }}
    >
      <div ref={ref} className={classnames} role="alert" {...rest}>
        {showIcon && <div className={`${prefixCls}-icon-wrapper`}>{renderIcon(type)}</div>}
        <div className={`${prefixCls}-content-wrapper`}>
          {title && <div className={`${prefixCls}-title`}>{title}</div>}
          {content && <div className={`${prefixCls}-content`}>{content}</div>}
        </div>
        {action && <div className={`${prefixCls}-action`}>{action}</div>}
        {closable && (
          <Button
            size="small"
            onClick={onHandleClose}
            className={classNames(`${prefixCls}-close-btn`, {
              [`${prefixCls}-close-custom-btn`]: closeIcon,
            })}
            type="text"
            icon={closeIcon || <IconClose />}
          />
        )}
      </div>
    </EuiCSSTransition>
  );
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(AlertComponent);

if (process.env.NODE_ENV !== 'production') {
  Alert.displayName = 'Alert';
}

export default Alert;
