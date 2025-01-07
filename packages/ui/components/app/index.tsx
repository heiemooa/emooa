import React, { Context, useContext, useMemo } from 'react';
import classNames from 'classnames';
import Modal from '@/modal';
import Message from '@/message';
import Notification from '@/notification';
import AppContext, { AppConfigContext } from './context';
import useStyle from './style';
import { ConfigProviderProps } from '@/config-provider/interface';
import { ConfigContext } from '@/config-provider';
import { AppConfig, AppProps, useAppProps } from './interface';

const Component: React.FC<AppProps> = props => {
  const { getPrefixCls, components }: ConfigProviderProps = useContext(ConfigContext);

  const {
    children,
    className,
    style,
    message,
    notification,
    component = 'div',
  }: AppProps = Object.assign({}, components?.App, props);

  const prefixCls = getPrefixCls('app');
  const [hashId] = useStyle(prefixCls);
  const customClassName = classNames(hashId, prefixCls, className);
  const appConfig = useContext<AppConfig>(AppConfigContext);

  const appConfigContextValue = useMemo<AppConfig>(
    () => ({
      message: { ...appConfig.message, ...message },
      notification: { ...appConfig.notification, ...notification },
    }),
    [message, appConfig.message, notification, appConfig.notification],
  );

  const [ModalApi, ModalContextHolder] = Modal.useModal();
  const [MessageApi, MessageContextHolder] = Message.useMessage(appConfigContextValue.message);
  const [NotificationApi, NotificationContextHolder] = Notification.useNotification(appConfigContextValue.notification);

  const memoizedContextValue = useMemo<useAppProps>(
    () => ({
      modal: ModalApi,
      message: MessageApi,
      notification: NotificationApi,
    }),
    [ModalApi, MessageApi, NotificationApi],
  );

  const Component = component === false ? React.Fragment : component;
  const rootProps: AppProps = {
    className: customClassName,
    style,
  };

  return (
    <AppContext.Provider value={memoizedContextValue}>
      <AppConfigContext.Provider value={appConfigContextValue}>
        <Component {...(component === false ? undefined : rootProps)}>
          {ModalContextHolder}
          {MessageContextHolder}
          {NotificationContextHolder}
          {children}
        </Component>
      </AppConfigContext.Provider>
    </AppContext.Provider>
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
