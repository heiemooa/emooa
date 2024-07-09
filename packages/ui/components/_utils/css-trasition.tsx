import React, { Component, ReactElement, cloneElement, createRef, useMemo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { supportRef } from './is';
import { isFunction } from 'lodash';
import ReactDOM from 'react-dom';

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

const findDOMNode = element => {
  if (!element) return null;
  // 类组件，非 forwardRef(function component) 都拿不到真实dom
  if (element instanceof Element) {
    return element;
  }

  if (element.current && element.current instanceof Element) {
    return element.current;
  }

  if (element instanceof Component) {
    return ReactDOM.findDOMNode(element);
  }

  if (isFunction(element.getRootDOMNode)) {
    return element.getRootDOMNode();
  }

  return null;
};

const EuiCSSTransition = (props: CSSTransition) => {
  const newNodeRef = useRef();
  const flagRef = useRef<boolean>();

  const { children, nodeRef, ...rest } = props;

  const dom = useMemo(() => {
    // 只处理 div， span 之类的 children 即可
    if (nodeRef === undefined && supportRef(children)) {
      flagRef.current = true;
      return cloneElement(children as ReactElement, {
        ref: node => {
          newNodeRef.current = findDOMNode(node);
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
    <CSSTransition {...rest} nodeRef={flagRef.current ? newNodeRef : undefined}>
      {dom}
    </CSSTransition>
  );
};

export default EuiCSSTransition;
