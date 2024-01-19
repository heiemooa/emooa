import { createContext } from 'react';
import { ConfigProviderProps } from './interface';
import locale from '../_locale';

function renderEmpty(componentName?: string) {
  switch (componentName) {
    default:
      return '404 Empty';
  }
}

export const DefaultConfigProviderProps: ConfigProviderProps = {
  locale,
  prefixCls: 'eui',
  size: 'default',
  renderEmpty,
  getPrefixCls: (componentName: string) => `eui-${componentName}`,
};

export const ConfigContext = createContext<ConfigProviderProps>(
  DefaultConfigProviderProps,
);
