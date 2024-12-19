import React, { useContext } from 'react';
import { App, Button, Space } from '@emooa/ui';

const MyPage: React.FC = () => {
  const { modal, message, notification } = App.useApp();

  const values = useContext(App.Context);

  return (
    <Space>
      <Button
        type="primary"
        onClick={() => {
          modal.info({
            title: 'Modal',
            content: 'This is a Modal',
          });
        }}
      >
        Modal
      </Button>
      <Button
        type="primary"
        onClick={() => {
          message.info({
            content: `Current duration: ${values.message.duration}`,
          });
        }}
      >
        Message
      </Button>
      <Button
        type="primary"
        onClick={() => {
          notification.info({
            title: 'Notification',
            content: `Current duration: ${values.notification.duration}`,
          });
        }}
      >
        Notification
      </Button>
    </Space>
  );
};

export default () => (
  <App message={{ duration: 1000 }} notification={{ duration: 2000 }}>
    <MyPage />
  </App>
);
