import { createContext } from 'react';
import { ConfigProviderProps } from './interface';
import locale from '../_locale';

export const DefaultConfigProviderProps: ConfigProviderProps = {
  locale,
  prefixCls: 'eui',
  size: 'medium',
  getPrefixCls: (componentName: string) => `eui-${componentName}`,
};

export const ConfigContext = createContext<ConfigProviderProps>(DefaultConfigProviderProps);
