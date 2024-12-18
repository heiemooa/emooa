import React from 'react';
import { ConfigProviderProps } from './interface';
import omit from '@/_utils/omit';
import { ConfigContext, DefaultConfigProviderProps } from './context';
import { EuiTokenContext, defaultTheme } from '@/_theme/context';
import seedToken, { scheme as _scheme } from '@/_theme/themes/seed';
import { merge } from 'lodash';

function ConfigProvider(props: ConfigProviderProps) {
  const _props: ConfigProviderProps = Object.assign({}, DefaultConfigProviderProps, props);
  const { prefixCls, theme, children, scheme = _scheme } = _props;

  function getPrefixCls(componentName: string) {
    return componentName ? `${prefixCls}-${componentName}` : prefixCls;
  }

  const config: ConfigProviderProps = {
    ...omit(_props, ['children']),
    getPrefixCls: props.getPrefixCls || getPrefixCls,
  };

  // ================================ Dynamic theme ================================
  const memoTheme = React.useMemo(() => {
    const { token, components, hashed = true, ...rest } = theme || {};

    const parsedComponents: any = {};
    Object.entries(components || {}).forEach(([componentName, componentToken]) => {
      const parsedToken: typeof componentToken = {
        ...componentToken,
      };
      parsedComponents[componentName] = parsedToken;
    });

    const mergedToken = merge({}, seedToken, token);

    return {
      ...rest,
      hashed,
      token: mergedToken,
      theme: defaultTheme(scheme),
      components: components,
      override: {
        override: mergedToken,
        ...components,
      },
      scheme,
    };
  }, [theme, scheme]);

  if (theme || scheme) {
    return (
      <ConfigContext.Provider value={config}>
        <EuiTokenContext.Provider value={memoTheme}>{children}</EuiTokenContext.Provider>
      </ConfigContext.Provider>
    );
  }
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
}

ConfigProvider.ConfigContext = ConfigContext;

if (process.env.NODE_ENV !== 'production') {
  ConfigProvider.displayName = 'ConfigProvider';
}

export default ConfigProvider;

const ConfigConsumer = ConfigContext.Consumer;

export { ConfigContext, ConfigConsumer };
