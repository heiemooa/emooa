import { createContext } from 'react';

export interface ContextProps {
  prefixCls?: string;
  rootClassName?: string;
}

const Context = createContext<ContextProps>({
  prefixCls: 'eui',
});

export default Context;
