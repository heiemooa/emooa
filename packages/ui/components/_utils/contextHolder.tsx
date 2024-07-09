import { ConfigContext } from '@/config-provider';
import { ConfigProviderProps } from '@/config-provider/interface';
import React, { useState, useImperativeHandle, forwardRef, ReactElement, useContext } from 'react';

export type HolderRef = {
  add?: (ins: ReactElement) => void;
  remove?: (ins: ReactElement) => void;
  getContextConfig?: () => ConfigProviderProps;
};

const ContextHolderElement = forwardRef<HolderRef>((_props, ref) => {
  const configContext = useContext(ConfigContext);
  const [instances, setInstances] = useState([]);

  function add(ins) {
    setInstances(originInstances => [...originInstances, ins]);
  }

  function remove(ins) {
    setInstances(originInstances => originInstances.filter(originIns => ins !== originIns));
  }

  function getContextConfig() {
    return configContext;
  }

  useImperativeHandle(ref, () => ({
    add,
    remove,
    getContextConfig,
  }));

  return <>{React.Children.map(instances, (child, index) => React.cloneElement(child, { key: index }))}</>;
});

export default ContextHolderElement;
