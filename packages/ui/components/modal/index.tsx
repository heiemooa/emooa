import React, { useContext, forwardRef, useRef, useState, useCallback, useEffect, ReactElement } from 'react';
import { ConfigContext } from '../config-provider';
import { ModalProps } from './interface';
import classNames from 'classnames';
import useStyle from './style';
import { ConfigProviderProps } from '../config-provider/interface';
import { isServerRendering } from '@/_utils/dom';
import useValue from '@/_utils/hooks/useValue';
import useOverflowHidden from '@/_utils/hooks/useOverflowHidden';
import { Esc } from '@/_utils/keycode';
import { isContains } from '@/_utils/is';
import Button from '@/button';
import { isFunction } from 'lodash';
import Portal from '@/portal';
import EuiCSSTransition from '@/_utils/css-trasition';
import { IconClose } from '@emooa/icon';
import FocusLock from 'react-focus-lock';

type CursorPositionType = { left: number; top: number } | null;
let cursorPosition: CursorPositionType | null = null;
let globalDialogIndex = 0;

if (!isServerRendering) {
  document.documentElement.addEventListener(
    'click',
    (e: MouseEvent) => {
      cursorPosition = {
        left: e.clientX,
        top: e.clientY,
      };
      // 受控模式下，用户不一定马上打开弹窗，这期间可能出现其他 UI 操作，那这个位置就不可用了。
      setTimeout(() => {
        cursorPosition = null;
      }, 100);
    },
    true,
  );
}

const defaultProps: ModalProps = {
  mask: true,
  maskClosable: true,
  mountOnEnter: true,
  escToExit: true,
  getPopupContainer: () => document.body,
};

const Component = (props: ModalProps, ref) => {
  const { getPrefixCls, components, locale, rtl }: ConfigProviderProps = useContext(ConfigContext);

  const {
    className,
    classNames: modalClassNames,
    style,
    styles,
    visible,
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
    onCancel,
    onOk,
    afterClose,
    afterOpen,
    getPopupContainer,
    modalRender,
    ...rest
  }: ModalProps = Object.assign(defaultProps, components?.Modal, props);

  const prefixCls = getPrefixCls('modal');
  const rootPrefixCls = getPrefixCls();

  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const classnames = classNames(
    hashId,
    `${prefixCls}-root`,
    {
      [`${prefixCls}-root-hide`]: !visible,
      [`${prefixCls}-no-mask`]: !mask,
      [`${prefixCls}-rtl`]: rtl,
    },
    className,
    cssVarCls,
  );

  const modalWrapperRef = useRef<HTMLDivElement>(null);
  const contentWrapper = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [wrapperVisible, setWrapperVisible] = useState<boolean>();
  const [popupZIndex, setPopupZIndex] = useState<number>();
  const cursorPositionRef = useRef<CursorPositionType>(null);
  const haveOriginTransformOrigin = useRef<boolean>(false);
  const maskClickRef = useRef(false);

  // 标识是否是处于第一次 visible 之前
  const beforeFirstVisible = useRef<boolean>(true);

  if (visible && beforeFirstVisible.current) {
    beforeFirstVisible.current = false;
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

  useOverflowHidden(getContainer, { hidden: visible && mask });

  const handlerCancel = () => {
    onCancel?.();
  };

  const onEscExit = (event: React.KeyboardEvent) => {
    if (escToExit && visible && event.key === Esc.key) {
      event.stopPropagation();
      handlerCancel();
    }
  };

  const inExit = useRef(false);
  const onClickMask = e => {
    if (!maskClickRef.current) return;
    maskClickRef.current = false;
    if (!inExit.current && maskClosable && mask && e.target === e.currentTarget) {
      setTimeout(() => {
        handlerCancel();
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

  useEffect(() => {
    let timer = null;
    if (escToExit && visible) {
      timer = setTimeout(() => {
        if (isContains(document.body, modalWrapperRef.current)) {
          modalWrapperRef.current?.focus();
        }
      });
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [visible, escToExit]);

  const initPopupZIndex = () => {
    if (visible && popupZIndex === undefined) {
      if (modalWrapperRef.current) {
        // 根据wrapper的zindex，设置内部所有弹出型组件的zindex。
        const zIndex = +window.getComputedStyle(modalWrapperRef.current, null)?.zIndex;
        if (!isNaN(zIndex)) {
          setPopupZIndex(zIndex + 1);
        }
      }
    }
  };

  const renderFooter = () => {
    if (footer === null) return;

    const cancelButtonNode = (
      <Button onClick={handlerCancel} {...cancelButtonProps}>
        {cancelText || locale.Modal.cancelText}
      </Button>
    );
    const okButtonNode = (
      <Button loading={loading} onClick={onConfirmModal} type="primary" {...okButtonProps}>
        {okText || locale.Modal.okText}
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

  const element = (
    <>
      {title && (
        <div className={classNames(`${prefixCls}-header`, modalClassNames?.header)} style={styles?.header}>
          <div className={`${prefixCls}-title`} id={`${prefixCls}-${dialogIndex.current}`}>
            {title}
          </div>
        </div>
      )}
      <div
        ref={contentWrapper}
        className={classNames(`${prefixCls}-content`, modalClassNames?.content)}
        style={styles?.content}
      >
        {children}
      </div>
      {renderFooter()}
      {closable &&
        (closeIcon !== undefined ? (
          <span onClick={handlerCancel} className={`${prefixCls}-close-icon`}>
            {closeIcon}
          </span>
        ) : (
          <IconClose
            tabIndex={-1}
            onClick={handlerCancel}
            className={`${prefixCls}-close-icon`}
            role="button"
            aria-label="Close"
          />
        ))}
    </>
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
    >
      <FocusLock
        crossFrame={false}
        disabled={!visible}
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

  const setTransformOrigin = (e: HTMLDivElement) => {
    if (haveOriginTransformOrigin.current) return;

    let transformOrigin = '';
    if (cursorPositionRef.current) {
      const eRect = e.getBoundingClientRect();
      const { left, top } = cursorPositionRef.current;
      transformOrigin = `${left - eRect.left}px ${top - eRect.top}px`;
    }
    e.style.transformOrigin = transformOrigin;
  };

  // mountOnEnter 只在第一次visible=true之前生效。
  // 使用 modalRef.current 而不是 mountOnExit 是因为动画结束后，modalRef.current 会变成 null，此时再去销毁dom结点，避免动画问题
  const forceRender = beforeFirstVisible.current ? !mountOnEnter : !!modalRef.current;

  return visible || forceRender
    ? wrapCSSVar(
        <Portal visible={visible} getContainer={getPopupContainer}>
          <div ref={ref} className={classnames}>
            {mask ? (
              <EuiCSSTransition
                in={visible}
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
                />
              </EuiCSSTransition>
            ) : null}
            <div
              {...rest}
              tabIndex={!autoFocus ? -1 : null}
              ref={node => {
                modalWrapperRef.current = node;
                initPopupZIndex();
              }}
              className={classNames(`${prefixCls}-wrapper`, modalClassNames?.wrapper)}
              style={{
                ...(styles?.wrapper || {}),
                // 必须 visible=false，立即设置display:none，否则modal加载react-monaco-editor的时候，编辑器显示异常
                display: visible || wrapperVisible ? 'block' : 'none',
                overflow: !visible && wrapperVisible ? 'hidden' : '',
              }}
              onKeyDown={!autoFocus ? onEscExit : null}
              onMouseDown={e => {
                maskClickRef.current = e.target === e.currentTarget;
              }}
              onClick={onClickMask}
            >
              <EuiCSSTransition
                in={visible}
                timeout={400}
                appear
                classNames={`${rootPrefixCls}-zoom`}
                unmountOnExit={unmountOnExit}
                mountOnEnter={mountOnEnter}
                onEnter={(e: HTMLDivElement) => {
                  if (!e) return;
                  setWrapperVisible(true);
                  cursorPositionRef.current = cursorPosition;
                  haveOriginTransformOrigin.current = !!e.style.transformOrigin;
                  setTransformOrigin(e);

                  modalRef.current = e;
                }}
                onEntered={(e: HTMLDivElement) => {
                  if (!e) return;
                  setTransformOrigin(e);
                  cursorPositionRef.current = null;
                  afterOpen?.();
                }}
                onExit={() => {
                  inExit.current = true;
                }}
                onExited={e => {
                  if (!e) return;
                  setWrapperVisible(false);
                  setTransformOrigin(e);
                  afterClose?.();
                  inExit.current = false;
                  if (unmountOnExit) {
                    modalRef.current = null;
                  }
                }}
              >
                {React.cloneElement((isFunction(modalRender) ? modalRender(modalDom) : modalDom) as ReactElement, {
                  onMouseDown: () => {
                    maskClickRef.current = false;
                  },
                  onMouseUp: () => {
                    maskClickRef.current = false;
                  },
                })}
              </EuiCSSTransition>
            </div>
          </div>
        </Portal>,
      )
    : null;
};

const Modal = forwardRef<HTMLDivElement, ModalProps>(Component);

if (process.env.NODE_ENV !== 'production') {
  Modal.displayName = 'Modal';
}

export default Modal;
