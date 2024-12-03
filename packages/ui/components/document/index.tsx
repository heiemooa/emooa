import React, { useContext, forwardRef, useRef, useEffect, useState, useReducer, useCallback, Ref } from 'react';
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
import { defaultSize, reducer } from './reducer';

const defaultProps: DocumentProps = {
  patterns: [],
  getPopupContainer: () => document.body,
};

let documentSingleton: any = null; // 全局存储组件实例
let documentSingletonLintner: any = false; // 全局存储监听实例

const Component = forwardRef<HTMLDivElement, DocumentProps>((props: DocumentProps, ref) => {
  const { getPrefixCls, components, locale, rtl }: ConfigProviderProps = useContext(ConfigContext);
  const [open, setOpen] = useState<boolean>(false);
  const [iframe, setIframe] = useState<{ src?: string; ref? }>({
    ref: useRef(),
  });
  const [placement, dispatch] = useReducer(reducer, {
    type: 'default',
    style: {
      width: defaultSize.width,
      height: defaultSize.height,
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

  const [hashId] = useStyle(prefixCls);

  const classnames = classNames(
    hashId,
    `${prefixCls}-root`,
    {
      [`${prefixCls}-root-hide`]: !open,
      [`${prefixCls}-rtl`]: rtl,
    },
    className,
  );

  const documentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>();

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
    let target = event.target as HTMLElement;
    let depth = 0;

    while (target && target.tagName !== 'A' && depth < 3) {
      target = target.parentElement as HTMLElement;
      depth++;
    }

    if (!target) return;

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
          ref: iframe.ref,
        });
        setOpen(true);
      }
    }
  };

  const handlerCancel = () => {
    setOpen(false);
  };

  const handleMouseDown = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      direction: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
      defaultPlacement,
    ) => {
      e.preventDefault();
      e.stopPropagation();

      const onMouseMove = (event: MouseEvent) => {
        /**
         * 由于通过iframe嵌套文档的方式，无法保证同源策略，故当鼠标移动到 iframe 中时，自动结束移动监听
         */
        if (iframe.ref.current === event.target) {
          onMouseUp(event);
          return;
        }

        const { movementX, movementY } = event;

        dispatch({
          type: 'moving',
          data: {
            direction,
            movementX,
            movementY,
            min: {
              x: Math.min(260, defaultSize.width) - defaultPlacement.style.width + defaultPlacement.position.x,
              y: Math.min(400, defaultSize.height) - defaultPlacement.style.height + defaultPlacement.position.y,
            },
            max: {
              x: window.innerWidth - defaultPlacement.style.width + defaultPlacement.position.x,
              y: window.innerHeight - defaultPlacement.style.height + defaultPlacement.position.y,
            },
          },
        });
      };

      const onMouseUp = e => {
        const { clientX, clientY } = e;

        const isMouseInsideWindow =
          clientX >= 0 && clientX <= window.innerWidth && clientY >= 0 && clientY <= window.innerHeight;

        if (!isMouseInsideWindow) {
          const bound = wrapperRef.current?.getBoundingClientRect?.();
          if (bound) {
            dispatch({
              type: 'moved',
              data: bound,
            });
          }
        }

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    [],
  );

  const element = (
    <div
      className={classNames(`${prefixCls}-wrapper`, modalClassNames?.wrapper)}
      style={Object.assign({}, styles?.wrapper, placement.style)}
      ref={wrapperRef}
    >
      <div className={classNames(`${prefixCls}-header`, modalClassNames?.header)} style={styles?.header}>
        <div className={`${prefixCls}-title`}>
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
              height: '100%',
              border: 'none',
            }}
            ref={iframe.ref}
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
      <div>
        <div
          style={{ height: 20, width: 20, position: 'absolute', top: -10, left: -10, cursor: 'nw-resize' }}
          onMouseDown={e => handleMouseDown(e, 'top-left', placement)}
        ></div>
        <div
          style={{ height: 20, width: 20, position: 'absolute', top: -10, right: -10, cursor: 'ne-resize' }}
          onMouseDown={e => handleMouseDown(e, 'top-right', placement)}
        ></div>
        <div
          style={{ height: 20, width: 20, position: 'absolute', bottom: -10, right: -10, cursor: 'se-resize' }}
          onMouseDown={e => handleMouseDown(e, 'bottom-right', placement)}
        ></div>
        <div
          style={{ height: 20, width: 20, position: 'absolute', bottom: -10, left: -10, cursor: 'sw-resize' }}
          onMouseDown={e => handleMouseDown(e, 'bottom-left', placement)}
        ></div>
      </div>
    </div>
  );

  return open || !!documentRef.current ? (
    <Portal visible={open} getContainer={getPopupContainer}>
      <div className={classnames}>
        <EuiCSSTransition
          in={open}
          timeout={400}
          appear
          classNames={`${rootPrefixCls}-fade-mini-left`}
          unmountOnExit={unmountOnExit}
          mountOnEnter={true}
          onEnter={e => {
            if (!e) return;
            documentRef.current = e;
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
              documentRef.current = null;
            }
            e.parentNode.style.display = '';
          }}
        >
          <div className={classNames(prefixCls, className)} style={style} ref={documentRef} {...rest}>
            <Draggable
              handle={`.${prefixCls}-title`}
              position={placement.position}
              onStart={() => {
                dispatch({
                  type: 'position',
                  data: placement.position,
                });
              }}
              onStop={(e, data) => {
                const position = {
                  x: Math.min(48, data.x),
                  y: Math.min(48, data.y),
                };

                const bound = data.node.getBoundingClientRect();

                if (bound.top < 0) {
                  position.y = -(window.innerHeight - bound.height - 48);
                }
                if (bound.left < 0) {
                  position.x = -(window.innerWidth - bound.width - 48);
                }

                dispatch({
                  type: 'position',
                  data: position,
                });
              }}
            >
              {element}
            </Draggable>
          </div>
        </EuiCSSTransition>
      </div>
    </Portal>
  ) : null;
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
