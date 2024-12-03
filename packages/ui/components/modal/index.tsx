import React, { useContext, forwardRef, useRef, useCallback } from 'react';
import { ConfigContext } from '../config-provider';
import { ConfirmProps, ModalHookReturnType, ModalProps, ModalReturnProps } from './interface';
import classNames from 'classnames';
import useStyle from './style';
import { ConfigProviderProps } from '../config-provider/interface';
import { isServerRendering } from '@/_utils/dom';
import useValue from '@/_utils/hooks/useValue';
import useOverflowHidden from '@/_utils/hooks/useOverflowHidden';
import { Esc } from '@/_utils/keycode';
import Button from '@/button';
import { isFunction } from 'lodash';
import Portal from '@/portal';
import EuiCSSTransition from '@/_utils/css-trasition';
import { IconClose } from '@emooa/icon';
import FocusLock from 'react-focus-lock';
import confirm from './confirm';
import useModal from './useModal';
import { ModalConfigType, destroyList, setModalConfig } from './config';

type CursorPositionType = { left: number; top: number } | null;
let cursorPosition: CursorPositionType | null = null;
let globalDialogIndex = 0;

/**
 * 获取点击的时候，用户的鼠标位置，作为动画起始点
 */
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
  closable: true,
  getPopupContainer: () => document.body,
};

const Component = (props: ModalProps, ref) => {
  const { getPrefixCls, components, locale, rtl }: ConfigProviderProps = useContext(ConfigContext);

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
    disabledOnPromise,
    mountOnEnter,
    unmountOnExit,
    autoFocus,
    maskClosable,
    mask,
    escToExit,
    closeIcon,
    closable,
    center,
    onCancel,
    onOk,
    afterClose,
    afterOpen,
    getPopupContainer,
    modalRender,
    isNotice,
    ...rest
  }: ModalProps & { isNotice?: boolean } = Object.assign({}, defaultProps, components?.Modal, props);

  const prefixCls = getPrefixCls('modal');
  const rootPrefixCls = getPrefixCls();

  const [hashId] = useStyle(prefixCls);

  const classnames = classNames(
    hashId,
    `${prefixCls}-root`,
    {
      [`${prefixCls}-root-hide`]: !open,
      [`${prefixCls}-no-mask`]: !mask,
      [`${prefixCls}-rtl`]: rtl,
      [`${prefixCls}-center`]: center,
    },
    className,
  );

  const modalRef = useRef<HTMLDivElement>(null);
  const cursorPositionRef = useRef<CursorPositionType>(null);
  const haveOriginTransformOrigin = useRef<boolean>(false);

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
        {cancelText || locale.Modal.cancelText}
      </Button>
    );
    const okButtonNode = (
      <Button loading={loading} onClick={onConfirmModal} type="primary" {...okButtonProps}>
        {okText || (isNotice ? locale.Modal.noticeText : locale.Modal.okText)}
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
    <div className={classNames(`${prefixCls}-wrapper`, modalClassNames?.wrapper)} style={styles?.wrapper}>
      {title && (
        <div className={classNames(`${prefixCls}-header`, modalClassNames?.header)} style={styles?.header}>
          <div className={`${prefixCls}-title`} id={`${prefixCls}-${dialogIndex.current}`}>
            {title}
          </div>
        </div>
      )}
      {((isNotice && children) || !isNotice) && (
        <div className={classNames(`${prefixCls}-content`, modalClassNames?.content)} style={styles?.content}>
          {children}
        </div>
      )}

      {renderFooter()}
      {closable &&
        !isNotice &&
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

  // 本地环境 Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of DraggableCore which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node
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
        crossFrame={false}
        disabled={!open}
        autoFocus={autoFocus}
        lockProps={{
          tabIndex: -1,
          onKeyDown: onEscExit,
        }}
      >
        {isFunction(modalRender) ? modalRender(element) : element}
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

  // mountOnEnter 只在第一次open=true之前生效。
  // 使用 modalRef.current 而不是 mountOnExit 是因为动画结束后，modalRef.current 会变成 null，此时再去销毁dom结点，避免动画问题
  const forceRender = beforeFirstOpen.current ? !mountOnEnter : !!modalRef.current;

  return open || forceRender ? (
    <Portal visible={open} getContainer={getPopupContainer}>
      <div ref={ref} className={classnames}>
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
          classNames={`${rootPrefixCls}-zoom`}
          unmountOnExit={unmountOnExit}
          mountOnEnter={mountOnEnter}
          onEnter={(e: HTMLDivElement) => {
            if (!e) return;
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
            setTransformOrigin(e);
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
  ) : null;
};

const ModalComponent = forwardRef<HTMLDivElement, ModalProps>(Component);

const Modal = ModalComponent as typeof ModalComponent &
  ModalHookReturnType & {
    config: (config: ModalConfigType) => void;
    destroyAll: () => void;
    useModal: typeof useModal;
  };

['info', 'success', 'warning', 'error'].forEach((type: keyof Omit<ModalHookReturnType, 'confirm'>) => {
  Modal[type] = (props: ConfirmProps) => {
    return confirm({
      isNotice: true,
      noticeType: type,
      ...props,
    });
  };
});

Modal.useModal = useModal;
Modal.confirm = (props: ConfirmProps): ModalReturnProps => confirm(props);
Modal.config = setModalConfig; // 目前没有具体的功能使用，本质是为了添加一些 Modal 的全局配置
Modal.destroyAll = () => {
  while (destroyList.length) {
    const close = destroyList.pop();
    if (close) {
      close();
    }
  }
};

if (process.env.NODE_ENV !== 'production') {
  Modal.displayName = 'Modal';
}

export default Modal;
