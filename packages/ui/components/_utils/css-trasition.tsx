import React, { ReactElement, cloneElement, useMemo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { isFunction, supportRef } from './is';

const callbackOriginRef = (children: CSSTransition, node) => {
  if (children && children.ref) {
    if (isFunction(children.ref)) {
      children?.ref(node);
    }
    if ('current' in children.ref) {
      children.ref.current = node;
    }
  }
};

const EuiCSSTransition = (props: CSSTransition) => {
  const newNodeRef = useRef();
  const flagRef = useRef<boolean>();

  const { children, nodeRef, ...rest } = props;

  const dom = useMemo(() => {
    // 只处理 div， span 之类的 children 即可
    if (props.nodeRef === undefined && supportRef(children)) {
      flagRef.current = true;
      return cloneElement(children as ReactElement, {
        ref: node => {
          newNodeRef.current = node;
          callbackOriginRef(children, node);
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
    <CSSTransition nodeRef={flagRef.current ? newNodeRef : undefined} {...rest}>
      {dom}
    </CSSTransition>
  );
};

export default EuiCSSTransition;
