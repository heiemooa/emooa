import React, { ReactElement, cloneElement, useMemo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { isDOMElement } from './is';

const callbackOriginRef = (children: ReactElement<any>, node: Element | null) => {
  const originRef = children.props.ref;
  if (typeof originRef === 'function') {
    return originRef(node);
  } else if (originRef && typeof originRef === 'object') {
    originRef.current = node;
  }
};

const supportsDOMRef = (element: React.ReactNode) => {
  if (isDOMElement(element)) return true;
  return (
    React.isValidElement(element) &&
    (element.type as any)?.$$typeof === Symbol.for('react.forward_ref')
  );
};

const getDOMNode = (instance: any): Element | null => {
  if (typeof Element !== 'undefined' && instance instanceof Element) {
    return instance;
  }

  const node = instance?.getRootDOMNode?.() || instance?.current;
  return typeof Element !== 'undefined' && node instanceof Element ? node : null;
};

const EuiCSSTransition = (props: CSSTransition) => {
  const newNodeRef = useRef<Element | null>(null);
  const flagRef = useRef(false);

  const { children, nodeRef, ...rest } = props;

  const dom = useMemo(() => {
    // 只处理 div， span 之类的 children 即可
    if (nodeRef === undefined && supportsDOMRef(children)) {
      flagRef.current = true;
      return cloneElement(children as ReactElement<any>, {
        ref: node => {
          newNodeRef.current = getDOMNode(node);
          const originRefCleanup = callbackOriginRef(children, node);
          if (typeof originRefCleanup === 'function') {
            return () => {
              newNodeRef.current = null;
              originRefCleanup();
            };
          }
          return () => {
            newNodeRef.current = null;
            callbackOriginRef(children, null);
          };
        },
      });
    }
    flagRef.current = false;

    return children;
  }, [children, nodeRef]);

  if (flagRef.current) {
    ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'].forEach(key => {
      if (props[key]) {
        rest[key] = (_maybeNode, ...args) => {
          props[key](newNodeRef.current, ...args);
        };
      }
    });
  }

  return (
    <CSSTransition {...rest} nodeRef={flagRef.current ? newNodeRef : undefined}>
      {dom}
    </CSSTransition>
  );
};

export default EuiCSSTransition;
