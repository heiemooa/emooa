import React, { useEffect } from 'react';
import { lighten } from './util';
import { ConfigProviderProps } from './interface';
import omit from '../_utils/omit';
import { ConfigContext, DefaultConfigProviderProps } from './context';
import { isObject } from '../_utils/is';

const colorList = {
  primaryColor: {
    default: '--arcoblue-6',
    hover: '--arcoblue-5',
    active: '--arcoblue-7',
  },
  successColor: {
    default: '--green-6',
    hover: '--green-5',
    active: '--green-7',
  },
  infoColor: {
    default: '--arcoblue-6',
    hover: '--arcoblue-5',
    active: '--arcoblue-7',
  },
  warningColor: {
    default: '--orangered-6',
    hover: '--orangered-5',
    active: '--orangered-7',
  },
  dangerColor: {
    default: '--red-6',
    hover: '--red-5',
    active: '--red-7',
  },
};

function setTheme(theme: ConfigProviderProps['theme']) {
  if (theme && isObject(theme)) {
    const root = document.body;
    Object.keys(colorList).forEach(color => {
      if (theme[color]) {
        root.style.setProperty(colorList[color].default, lighten(theme[color], 0));

        if (!theme[`${color}Hover`]) {
          root.style.setProperty(colorList[color].hover, lighten(theme[color], 10));
        }

        if (!theme[`${color}Active`]) {
          root.style.setProperty(colorList[color].active, lighten(theme[color], -10));
        }
      }
    });
  }
}

function ConfigProvider(props: ConfigProviderProps) {
  const _props: ConfigProviderProps = Object.assign({}, DefaultConfigProviderProps, props);

  const { theme, prefixCls, children } = _props;

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  function getPrefixCls(componentName: string) {
    return `${prefixCls}-${componentName}`;
  }

  const config: ConfigProviderProps = {
    ...omit(_props, ['children']),
    getPrefixCls,
  };

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
}

ConfigProvider.ConfigContext = ConfigContext;

export default ConfigProvider;

const ConfigConsumer = ConfigContext.Consumer;

export { ConfigContext, ConfigConsumer };
