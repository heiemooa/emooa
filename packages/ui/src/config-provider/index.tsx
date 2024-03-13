import React from 'react';
import { ConfigProviderProps } from './interface';
import omit from '@/_utils/omit';
import { ConfigContext, DefaultConfigProviderProps } from './context';
import { EuiTokenContext, defaultTheme } from '@/_theme/context';
import seedToken from '@/_theme/themes/seed';
import { EuiTokenProviderProps } from '@/_theme/interface';

function ConfigProvider(props: ConfigProviderProps) {
  const _props: ConfigProviderProps = Object.assign({}, DefaultConfigProviderProps, props);

  const { prefixCls, theme, children } = _props;

  function getPrefixCls(componentName: string) {
    return componentName ? `${prefixCls}-${componentName}` : prefixCls;
  }

  const config: ConfigProviderProps = {
    ...omit(_props, ['children']),
    getPrefixCls,
  };

  // ================================ Dynamic theme ================================
  const memoTheme = React.useMemo(() => {
    const { token, components, cssVar, hashed = true, ...rest } = theme || {};

    const parsedComponents: any = {};
    Object.entries(components || {}).forEach(([componentName, componentToken]) => {
      const parsedToken: typeof componentToken & { theme?: typeof defaultTheme } = {
        ...componentToken,
      };
      parsedComponents[componentName] = parsedToken;
    });

    const mergedToken = {
      ...seedToken,
      ...token,
    };

    return {
      ...rest,
      hashed,
      token: mergedToken,
      theme: defaultTheme,
      components: parsedComponents,
      override: {
        override: mergedToken,
        ...parsedComponents,
      },
      cssVar: cssVar as Exclude<EuiTokenProviderProps['cssVar'], boolean>,
    };
  }, [theme]);

  if (theme) {
    return (
      <ConfigContext.Provider value={config}>
        <EuiTokenContext.Provider value={memoTheme}>{children}</EuiTokenContext.Provider>
      </ConfigContext.Provider>
    );
  }
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
}

ConfigProvider.ConfigContext = ConfigContext;

export default ConfigProvider;

const ConfigConsumer = ConfigContext.Consumer;

export { ConfigContext, ConfigConsumer };
