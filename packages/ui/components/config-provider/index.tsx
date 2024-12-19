import React, { useCallback, useEffect, useMemo } from 'react';
import { ConfigProviderProps } from './interface';
import omit from '@/_utils/omit';
import { ConfigContext, DefaultConfigProviderProps, setConfigProviderProps } from './context';
import { EuiTokenContext, defaultTheme } from '@/_theme/context';
import seedToken, { scheme as _scheme } from '@/_theme/themes/seed';
import { merge } from 'lodash';

function ConfigProvider(props: ConfigProviderProps) {
  const _props: ConfigProviderProps = Object.assign({}, DefaultConfigProviderProps, props);
  const { prefixCls, theme, children, scheme = _scheme, rtl, locale } = _props;

  const getPrefixCls: ConfigProviderProps['getPrefixCls'] = useCallback(
    (componentName: string) => {
      return componentName ? `${prefixCls}-${componentName}` : prefixCls;
    },
    [prefixCls],
  );

  const config: ConfigProviderProps = useMemo(
    () => ({
      ...omit(_props, ['children']),
      getPrefixCls: props.getPrefixCls || getPrefixCls,
    }),
    [_props],
  );

  useEffect(() => {
    /**
     * 作用于 Modal，Message，Notification 静态方法
     * 静态方法不能获取 context 的内容，故自定义 ConfigProviderProps 无法生效
     * 建议通过 useModal，useMessage，useNotification 的 hook 使用
     * */
    setConfigProviderProps({ scheme, rtl, prefixCls, locale });
  }, [scheme, rtl, prefixCls, locale]);

  // ================================ Dynamic theme ================================
  const memoTheme = useMemo(() => {
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
