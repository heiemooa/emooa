import React, {
  useContext,
  forwardRef,
  useRef,
  useCallback,
  useEffect,
  useState,
  useImperativeHandle,
  useReducer,
} from 'react';
import { ConfigContext } from '../config-provider';
import { DocumentProps } from './interface';
import classNames from 'classnames';
import useStyle from './style';
import { ConfigProviderProps } from '../config-provider/interface';
import Button from '@/button';
import Portal from '@/portal';
import EuiCSSTransition from '@/_utils/css-trasition';
import { IconFullscreen, IconClose, IconFullscreenExit, IconExpand, IconShrink } from '@emooa/icon';
import Draggable from 'react-draggable';
import { render } from '@/_utils/react-dom';
import { find, isEmpty } from 'lodash';

const defaultProps: DocumentProps = {
  patterns: [],
  getPopupContainer: () => document.body,
};

let documentSingleton: any = null; // 全局存储组件实例
let documentSingletonLintner: any = false; // 全局存储监听实例

function reducer(
  state: {
    type: 'default' | 'full' | 'left';
    style: {
      width: number;
      height: number;
    };
    position: {
      x: number;
      y: number;
    };
  },
  action,
) {
  switch (action.type) {
    case 'full': {
      if (state.type === 'full') {
        return {
          type: 'default',
          style: {
            width: 400,
            height: 600,
          },
          position: { x: 0, y: 0 },
        };
      } else {
        return {
          type: 'full',
          style: {
            width: window.innerWidth - 400,
            height: window.innerHeight - 200,
          },
          position: { x: -128, y: -52 },
        };
      }
    }
    case 'left': {
      if (state.type === 'left') {
        return {
          type: 'default',
          style: {
            width: 400,
            height: 600,
          },
          position: { x: 0, y: 0 },
        };
      } else {
        return {
          type: 'left',
          style: {
            width: 400,
            height: window.innerHeight,
          },
          position: { x: 48, y: 48 },
        };
      }
    }
    case 'position': {
      return {
        ...state,
        position: action.position,
      };
    }
  }
  throw Error('Unknown action.');
}

const Component = forwardRef<HTMLDivElement, DocumentProps>((props: DocumentProps, ref) => {
  const { getPrefixCls, components, locale, rtl }: ConfigProviderProps = useContext(ConfigContext);
  const [open, setOpen] = useState<boolean>(false);
  const [iframe, setIframe] = useState<{ src?: string }>({});
  const [placement, dispatch] = useReducer(reducer, {
    type: 'default',
    style: {
      width: 400,
      height: 600,
    },
    position: {
      x: 0,
      y: 0,
    },
  });

  const {
    className,
    classNames: modalClassNames,
    style,
    styles,
    title,
    unmountOnExit,
    afterClose,
    afterOpen,
    getPopupContainer,
    patterns,
    home,
    ...rest
  }: DocumentProps = Object.assign({}, defaultProps, components?.Document, props);

  const prefixCls = getPrefixCls('document');
  const rootPrefixCls = getPrefixCls();

  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const classnames = classNames(
    hashId,
    `${prefixCls}-root`,
    `${prefixCls}-right`,
    {
      [`${prefixCls}-root-hide`]: !open,
      [`${prefixCls}-rtl`]: rtl,
    },
    className,
    cssVarCls,
  );

  const modalRef = useRef<HTMLDivElement>(null);
  const documentRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (documentSingletonLintner === false) {
      documentSingletonLintner = true;
      document.addEventListener('click', handleLinkClick);
    }

    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  const handleLinkClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    // 判断是否是符合条件的链接
    if (target.tagName === 'A') {
      const href = target.getAttribute('href');
      const bool = target.getAttribute('aria-label') === 'not-document';
      if (!href || bool) return;
      event.preventDefault(); // 阻止默认跳转
      const found = find(patterns, pattern => pattern.test(href));
      if (found) {
        setIframe({
          src: href,
        });
        setOpen(true);
      }
    }
  };

  const getContainer = useCallback(() => {
    return getPopupContainer?.() || document.body;
  }, [getPopupContainer]);

  const handlerCancel = () => {
    setOpen(false);
  };

  const element = (
    <div
      className={classNames(`${prefixCls}-wrapper`, modalClassNames?.wrapper)}
      style={Object.assign({}, styles?.wrapper, placement.style)}
    >
      <div className={classNames(`${prefixCls}-header`, modalClassNames?.header)} style={styles?.header}>
        <div className={`${prefixCls}-title`} style={{ cursor: 'move' }}>
          {title || (
            <>
              <Button
                className={`${prefixCls}-title-text`}
                anchorProps={{
                  'aria-label': 'not-document',
                }}
                type="text"
                target="_blank"
                href={home || iframe?.src?.match?.(/^https?:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i)?.[0]}
              >
                {locale.Document.title}
              </Button>
            </>
          )}
        </div>
      </div>
      <div className={classNames(`${prefixCls}-content`, modalClassNames?.content)} style={styles?.content}>
        {!isEmpty(iframe) && (
          <iframe
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: 600,
              border: 'none',
            }}
            src={iframe.src}
          />
        )}
      </div>
      <div className={classNames(`${prefixCls}-footer`, modalClassNames?.footer)} style={styles?.footer}>
        <Button
          type="primary"
          full
          size="large"
          href={iframe?.src}
          target="_blank"
          anchorProps={{
            'aria-label': 'not-document',
          }}
        >
          {locale.Document.open}
        </Button>
      </div>
      <Button.Group className={`${prefixCls}-remark-icon`}>
        <Button
          tabIndex={-1}
          type="text"
          onClick={() =>
            dispatch({
              type: 'full',
            })
          }
          icon={placement.type === 'full' ? <IconFullscreenExit /> : <IconFullscreen />}
        />
        <Button
          tabIndex={-1}
          type="text"
          onClick={() =>
            dispatch({
              type: 'left',
            })
          }
          icon={
            placement.type === 'left' ? (
              <IconShrink className={`${prefixCls}-remark-icon-left`} />
            ) : (
              <IconExpand className={`${prefixCls}-remark-icon-left expand`} />
            )
          }
        />
        <Button tabIndex={-1} type="text" onClick={handlerCancel} icon={<IconClose />} />
      </Button.Group>
    </div>
  );

  return open || !!modalRef.current
    ? wrapCSSVar(
        <Portal visible={open} getContainer={getPopupContainer}>
          <div
            ref={documentRef}
            className={classnames}
            style={getContainer() === document.body ? undefined : { position: 'absolute' }}
          >
            <EuiCSSTransition
              in={open}
              timeout={400}
              appear
              classNames={`${rootPrefixCls}-fade-left`}
              unmountOnExit={unmountOnExit}
              mountOnEnter={true}
              onEnter={e => {
                if (!e) return;
                modalRef.current = e;
                e.parentNode.style.display = 'block';
              }}
              onEntered={(e: HTMLDivElement) => {
                if (!e) return;
                afterOpen?.();
              }}
              onExit={() => {}}
              onExited={e => {
                if (!e) return;
                afterClose?.();
                if (unmountOnExit) {
                  modalRef.current = null;
                }
                e.parentNode.style.display = '';
              }}
            >
              <div className={classNames(prefixCls, className)} style={style} ref={modalRef} {...rest}>
                <Draggable
                  handle={`.${prefixCls}-title`}
                  position={placement.position}
                  onStop={(e, data) => {
                    const { x, y } = data;
                    const position = { x, y };
                    if (x > 48) position.x = 48;
                    if (y > 48) position.y = 48;

                    const bound = data.node.getBoundingClientRect();

                    if (bound.top < 0) {
                      position.y = -(window.innerHeight - bound.height - 48);
                    }
                    if (bound.left < 0) {
                      position.x = -(window.innerWidth - bound.width - 48);
                    }

                    dispatch({
                      type: 'position',
                      position,
                    });
                  }}
                >
                  {element}
                </Draggable>
              </div>
            </EuiCSSTransition>
          </div>
        </Portal>,
      )
    : null;
});

const DocumentComponent = (props: DocumentProps) => {
  const ref = useRef();
  const contextValue: ConfigProviderProps = useContext(ConfigContext);

  // 初始化全局实例
  useEffect(() => {
    if (documentSingleton === null) {
      const div = document.createElement('div');
      render(
        <ConfigContext.Provider value={contextValue}>
          <Component {...props} ref={ref} />
        </ConfigContext.Provider>,
        div,
      );
      documentSingleton = ref.current;
    }

    return () => {
      documentSingleton = null;
    };
  }, []);

  return null; // 阻止多余渲染
};

if (process.env.NODE_ENV !== 'production') {
  DocumentComponent.displayName = 'Document';
}

const Document = DocumentComponent as typeof DocumentComponent & {
  config: (options: DocumentProps) => void;
};

Document.config = function config(props: DocumentProps) {
  const ref = React.createRef();

  if (documentSingleton === null) {
    const div = document.createElement('div');

    render(<Document {...props} />, div);

    documentSingleton = ref.current;
  }

  return documentSingleton;
};

export default Document;
