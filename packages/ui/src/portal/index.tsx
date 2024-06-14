import { useEffect, useRef } from 'react';
import PortalDom from './Portal';
import React from 'react';

interface PortalProps extends React.HTMLAttributes<HTMLDivElement> {
  getContainer?: () => Element;
  visible?: boolean;
}

const Portal: React.FC<PortalProps> = props => {
  const { visible } = props;

  const instanceRef = useRef(null);

  useEffect(() => {
    return () => {
      instanceRef.current = null;
    };
  }, []);

  return visible || instanceRef.current ? <PortalDom ref={instanceRef} {...props} /> : null;
};

if (process.env.NODE_ENV !== 'production') {
  Portal.displayName = 'Portal';
}

export default Portal;
