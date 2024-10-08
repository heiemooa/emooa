import React, { Context, useContext, useMemo } from 'react';
import classNames from 'classnames';
import Modal from '@/modal';
import Message from '@/message';
import AppContext, { AppConfigContext } from './context';
import useStyle from './style';
import { ConfigProviderProps } from '@/config-provider/interface';
import { ConfigContext } from '@/config-provider';
import { AppConfig, AppProps, useAppProps } from './interface';

const Component: React.FC<AppProps> = props => {
  const { children, className, style, message, component = 'div' } = props;
  const { getPrefixCls }: ConfigProviderProps = useContext(ConfigContext);
  const prefixCls = getPrefixCls('app');
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);
  const customClassName = classNames(hashId, prefixCls, className, cssVarCls);
  const appConfig = useContext<AppConfig>(AppConfigContext);

  const appConfigContextValue = useMemo<AppConfig>(
    () => ({
      message: { ...appConfig.message, ...message },
    }),
    [message, appConfig.message],
  );

  const [ModalApi, ModalContextHolder] = Modal.useModal();
  const [MessageApi, MessageContextHolder] = Message.useMessage(appConfigContextValue.message);

  const memoizedContextValue = useMemo<useAppProps>(
    () => ({
      modal: ModalApi,
      message: MessageApi,
    }),
    [ModalApi, MessageApi],
  );

  const Component = component === false ? React.Fragment : component;
  const rootProps: AppProps = {
    className: customClassName,
    style,
  };

  return wrapCSSVar(
    <AppContext.Provider value={memoizedContextValue}>
      <AppConfigContext.Provider value={appConfigContextValue}>
        <Component {...(component === false ? undefined : rootProps)}>
          {ModalContextHolder}
          {MessageContextHolder}
          {children}
        </Component>
      </AppConfigContext.Provider>
    </AppContext.Provider>,
  );
};

const App = Component as typeof Component & {
  useApp: () => useAppProps;
  Context: Context<AppConfig>;
};

App.useApp = () => React.useContext<useAppProps>(AppContext);
App.Context = AppConfigContext;

if (process.env.NODE_ENV !== 'production') {
  Component.displayName = 'App';
}

export default App;
