import React, { useImperativeHandle } from 'react';
import { forwardRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps extends React.HTMLAttributes<HTMLDivElement> {
  getContainer?: () => Element;
}

export default forwardRef<boolean, PortalProps>(({ getContainer = () => document.body, children }, ref) => {
  const [container, setContainer] = useState<Element | null | undefined>(null);

  useImperativeHandle<boolean, boolean>(ref, () => !!children);

  useEffect(() => {
    const createContainer = () => {
      const newContainer = getContainer?.();
      setContainer(newContainer);
    };

    createContainer();

    const timer = setTimeout(() => {
      if (!container) {
        createContainer();
      }
    });

    return () => {
      clearTimeout(timer);
    };
  }, [getContainer, container]);

  if (!container) {
    return null;
  }

  return ReactDOM.createPortal(children, container);
});
