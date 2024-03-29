import { createContext } from 'react';
import { ConfigProviderProps } from './interface';
import * as locales from '@/_locale';

const { zhCN } = locales;

export const DefaultConfigProviderProps: ConfigProviderProps = {
  locale: zhCN,
  prefixCls: 'eui',
  size: 'medium',
  getPrefixCls: (componentName: string) =>
    componentName ? `${DefaultConfigProviderProps.prefixCls}-${componentName}` : DefaultConfigProviderProps.prefixCls,
};

export const ConfigContext = createContext<ConfigProviderProps>(DefaultConfigProviderProps);
