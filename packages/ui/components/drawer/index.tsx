import React, { useContext, forwardRef, useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { ConfigContext } from '../config-provider';
import { DrawerProps } from './interface';
import classNames from 'classnames';
import useStyle from './style';
import { ConfigProviderProps } from '../config-provider/interface';
import useValue from '@/_utils/hooks/useValue';
import useOverflowHidden from '@/_utils/hooks/useOverflowHidden';
import { Esc } from '@/_utils/keycode';
import Button from '@/button';
import { isFunction } from 'lodash';
import Portal from '@/portal';
import EuiCSSTransition from '@/_utils/css-trasition';
import { IconClose } from '@emooa/icon';
import FocusLock from 'react-focus-lock';
import DrawerContext, { DrawerContextProps } from './context';

let globalDialogIndex = 0;

const defaultProps: DrawerProps = {
  mask: true,
  maskClosable: true,
  mountOnEnter: true,
  escToExit: true,
  closable: true,
  placement: 'right',
  getPopupContainer: () => document.body,
};

const Component = (props: DrawerProps, ref) => {
  const { getPrefixCls, components, locale, rtl }: ConfigProviderProps = useContext(ConfigContext);
  const [pushed, setPushed] = React.useState(false);

  const {
    className,
    classNames: modalClassNames,
    style,
    styles,
    open,
    title,
    children,
    okText,
    okButtonProps,
    cancelText,
    cancelButtonProps,
    footer,
    confirmLoading,
    mountOnEnter,
    unmountOnExit,
    autoFocus,
    maskClosable,
    mask,
    escToExit,
    closeIcon,
    closable,
    placement,
    disabledOnPromise,
    onCancel,
    onOk,
    afterClose,
    afterOpen,
    getPopupContainer,
    ...rest
  }: DrawerProps = Object.assign({}, defaultProps, components?.Drawer, props);

  const prefixCls = getPrefixCls('drawer');
  const rootPrefixCls = getPrefixCls();

  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const classnames = classNames(
    hashId,
    `${prefixCls}-root`,
    {
      [`${prefixCls}-root-hide`]: !open,
      [`${prefixCls}-no-mask`]: !mask,
      [`${prefixCls}-${placement}`]: !!placement,
      [`${prefixCls}-rtl`]: rtl,
    },
    className,
    cssVarCls,
  );

  const modalRef = useRef<HTMLDivElement>(null);

  // 标识是否是处于第一次 open 之前
  const beforeFirstOpen = useRef<boolean>(true);

  if (open && beforeFirstOpen.current) {
    beforeFirstOpen.current = false;
  }

  const dialogIndex = useRef<number>();

  if (!dialogIndex.current) {
    dialogIndex.current = globalDialogIndex++;
  }

  const [loading, setLoading] = useValue(false, {
    defaultValue: false,
    value: confirmLoading,
  });

  const getContainer = useCallback(() => {
    return getPopupContainer?.() || document.body;
  }, [getPopupContainer]);

  useOverflowHidden(getContainer, { hidden: open && mask });

  const handlerCancel = event => {
    if (disabledOnPromise && loading) return; // 希望在loading期间禁用
    onCancel?.(event);
  };

  const onEscExit = (event: React.KeyboardEvent) => {
    if (escToExit && open && event.key === Esc.key) {
      event.stopPropagation();
      handlerCancel(event);
    }
  };

  const inExit = useRef(false);
  const onClickMask = e => {
    if (!inExit.current && maskClosable && mask && e.target === e.currentTarget) {
      setTimeout(() => {
        handlerCancel(e);
      }, 100);
    }
  };

  const onConfirmModal = e => {
    const ok = onOk?.(e);
    if (ok && ok.then) {
      setLoading(true);
      ok.then(
        () => {
          setLoading(false);
        },
        (e: Error) => {
          setLoading(false);
          console.error(e);
        },
      );
    }
  };

  const renderFooter = () => {
    if (footer === null) return;

    const cancelButtonNode = (
      <Button
        onClick={handlerCancel}
        {...Object.assign({}, disabledOnPromise ? { disabled: loading } : {}, cancelButtonProps)}
      >
        {cancelText || locale.Drawer.cancelText}
      </Button>
    );
    const okButtonNode = (
      <Button loading={loading} onClick={onConfirmModal} type="primary" {...okButtonProps}>
        {okText || locale.Drawer.okText}
      </Button>
    );
    const footerContent = isFunction(footer)
      ? (footer as Function)(cancelButtonNode, okButtonNode)
      : footer || (
          <>
            {cancelButtonNode}
            {okButtonNode}
          </>
        );

    return (
      <div className={classNames(`${prefixCls}-footer`, modalClassNames?.footer)} style={styles?.footer}>
        {footerContent}
      </div>
    );
  };

  /**
   * 定义多层抽屉的时候，移动的距离
   */
  const distance = 180;

  const parentContext = useContext(DrawerContext);

  const mergedContext = useMemo<DrawerContextProps>(
    () => ({
      distance,
      push: () => {
        setPushed(true);
      },
      pull: () => {
        setPushed(false);
      },
    }),
    [distance],
  );

  useEffect(() => {
    if (open) {
      parentContext?.push?.();
    } else {
      parentContext?.pull?.();
    }
  }, [open]);

  // Clean up
  useEffect(() => {
    return () => {
      parentContext?.pull?.();
    };
  }, []);

  const wrapperStyle = useCallback(() => {
    if (pushed) {
      switch (placement) {
        case 'top':
          return { transform: `translateY(${distance}px)` };
        case 'bottom':
          return { transform: `translateY(${-distance}px)` };
        case 'left':
          return { transform: `translateX(${distance}px)` };
        default:
          return { transform: `translateX(-${distance}px)` };
      }
    }
  }, [pushed]);

  const element = (
    <div
      className={classNames(`${prefixCls}-wrapper`, modalClassNames?.wrapper)}
      style={Object.assign({}, styles?.wrapper, wrapperStyle())}
    >
      {title && (
        <div className={classNames(`${prefixCls}-header`, modalClassNames?.header)} style={styles?.header}>
          <div className={`${prefixCls}-title`} id={`${prefixCls}-${dialogIndex.current}`}>
            {title}
          </div>
        </div>
      )}
      <div className={classNames(`${prefixCls}-content`, modalClassNames?.content)} style={styles?.content}>
        {children}
      </div>

      {renderFooter()}
      {closable &&
        (closeIcon !== undefined ? (
          <span onClick={handlerCancel} className={`${prefixCls}-close-icon`}>
            {closeIcon}
          </span>
        ) : (
          <Button
            className={`${prefixCls}-close-icon`}
            tabIndex={-1}
            type="text"
            onClick={handlerCancel}
            disabled={disabledOnPromise ? loading : false}
            icon={<IconClose className={`${prefixCls}-close-icon`} role="button" aria-label="Close" />}
          />
        ))}
    </div>
  );

  const ariaProps = title ? { 'aria-labelledby': `${prefixCls}-${dialogIndex.current}` } : {};

  const modalDom = (
    <div
      role="dialog"
      aria-modal="true"
      {...ariaProps}
      className={classNames(prefixCls, className)}
      style={style}
      ref={modalRef}
      {...rest}
    >
      <FocusLock
        as="span"
        crossFrame={false}
        disabled={!open}
        autoFocus={autoFocus}
        lockProps={{
          tabIndex: -1,
          onKeyDown: onEscExit,
        }}
      >
        {element}
      </FocusLock>
    </div>
  );

  // mountOnEnter 只在第一次open=true之前生效。
  // 使用 modalRef.current 而不是 mountOnExit 是因为动画结束后，modalRef.current 会变成 null，此时再去销毁dom结点，避免动画问题
  const forceRender = beforeFirstOpen.current ? !mountOnEnter : !!modalRef.current;

  return open || forceRender
    ? wrapCSSVar(
        <DrawerContext.Provider value={mergedContext}>
          <Portal visible={open} getContainer={getPopupContainer}>
            <div
              ref={ref}
              className={classnames}
              style={getContainer() === document.body ? undefined : { position: 'absolute' }}
            >
              {mask ? (
                <EuiCSSTransition
                  in={open}
                  timeout={400}
                  appear
                  mountOnEnter={mountOnEnter}
                  classNames={`${rootPrefixCls}-fade`}
                  unmountOnExit={unmountOnExit}
                  onEnter={e => {
                    if (!e) return;
                    e.parentNode.style.display = 'block';
                  }}
                  onExited={e => {
                    if (!e) return;
                    e.parentNode.style.display = '';
                  }}
                >
                  <div
                    aria-hidden
                    className={classNames(`${prefixCls}-mask`, modalClassNames?.mask)}
                    style={styles?.mask}
                    onClick={onClickMask}
                  />
                </EuiCSSTransition>
              ) : null}
              <EuiCSSTransition
                in={open}
                timeout={400}
                appear
                classNames={`${rootPrefixCls}-fade-${
                  {
                    top: 'down',
                    bottom: 'up',
                    left: 'right',
                    right: 'left',
                  }[placement]
                }`}
                unmountOnExit={unmountOnExit}
                mountOnEnter={mountOnEnter}
                onEnter={(e: HTMLDivElement) => {
                  if (!e) return;
                  modalRef.current = e;
                }}
                onEntered={(e: HTMLDivElement) => {
                  if (!e) return;
                  afterOpen?.();
                }}
                onExit={() => {
                  inExit.current = true;
                }}
                onExited={e => {
                  if (!e) return;
                  afterClose?.();
                  inExit.current = false;
                  if (unmountOnExit) {
                    modalRef.current = null;
                  }
                }}
              >
                {React.cloneElement(modalDom)}
              </EuiCSSTransition>
            </div>
          </Portal>
        </DrawerContext.Provider>,
      )
    : null;
};

const Drawer = forwardRef<HTMLDivElement, DrawerProps>(Component);

if (process.env.NODE_ENV !== 'production') {
  Drawer.displayName = 'Drawer';
}

export default Drawer;
