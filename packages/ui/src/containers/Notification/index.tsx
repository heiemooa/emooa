import React, { useContext } from 'react';
import { App, Button, Space, Notification } from '../../../components';

const MyPage: React.FC = () => {
  const { notification } = App.useApp();

  const values = useContext(App.Context);

  return (
    <Space>
      <Button
        type="primary"
        onClick={() => {
          notification.info({
            closable: false,
            title: 'Notification',
            content: `Current component: ${values.notification.duration}`,
          });
        }}
      >
        useApp Message
      </Button>
      <Button
        type="primary"
        onClick={() => {
          notification.info({
            duration: 1000,
            position: 'topLeft',
            content: `Current component: ${values.notification.duration}`,
          });
        }}
      >
        useApp Message
      </Button>
      <Button
        type="primary"
        onClick={() => {
          notification.info({
            position: 'bottomRight',
            content: `Current component: ${values.notification.duration}`,
          });
        }}
      >
        useApp Message
      </Button>
      <Button
        type="primary"
        onClick={() => {
          notification.info({
            position: 'bottomLeft',
            content: `Current component: ${values.notification.duration}`,
          });
        }}
      >
        useApp Message
      </Button>
    </Space>
  );
};

export default () => (
  <>
    <App notification={{ duration: 3000 }}>
      <MyPage />
    </App>
    <Space size="large">
      <Button
        onClick={() => {
          Notification.info({
            closable: false,
            title: 'Notification',
            content: 'This is an info notification!',
          });
        }}
        type="primary"
      >
        Info
      </Button>
      <Button onClick={() => Notification.success('This is a success notification!')} type="primary" status="success">
        Success
      </Button>
      <Button onClick={() => Notification.warning('This is a warning notification!')} type="primary" status="warning">
        Warning
      </Button>
      <Button onClick={() => Notification.error('This is an error notification!')} type="primary" status="danger">
        Error
      </Button>
    </Space>
  </>
);
