import { createContext } from 'react';
import { ConfigProviderProps } from './interface';
import * as locales from '@/_locale';
import { scheme } from '@/_theme/themes/seed';

const { zhCN } = locales;

export const DefaultConfigProviderProps: ConfigProviderProps = {
  locale: zhCN,
  prefixCls: 'eui',
  size: 'medium',
  getPrefixCls: (componentName: string) =>
    componentName ? `${DefaultConfigProviderProps.prefixCls}-${componentName}` : DefaultConfigProviderProps.prefixCls,
  scheme,
};

export const ConfigContext = createContext<ConfigProviderProps>(DefaultConfigProviderProps);

let configProvider: Pick<ConfigProviderProps, 'rtl' | 'scheme' | 'prefixCls' | 'locale'> = {};

export function setConfigProviderProps(
  configProviderProps: Pick<ConfigProviderProps, 'rtl' | 'scheme' | 'prefixCls' | 'locale'>,
) {
  configProvider = { ...configProviderProps };
}

export function getConfigProviderProps() {
  return configProvider;
}
