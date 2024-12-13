import React, { useContext } from 'react';
import { App, Button, Space } from '@emooa/ui';

const MyPage: React.FC = () => {
  const { notification } = App.useApp();

  const values = useContext(App.Context);

  return (
    <Space>
      <Button
        type="primary"
        onClick={() => {
          notification.info({
            content: `Current duration: ${values.notification.duration}`,
          });
        }}
      >
        useApp Notification
      </Button>
    </Space>
  );
};

export default () => (
  <App notification={{ duration: 1000, title: 'Notification' }}>
    <MyPage />
  </App>
);
