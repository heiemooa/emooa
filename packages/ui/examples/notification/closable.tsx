import React from 'react';
import { Button, Notification, Space } from '@emooa/ui';
import { IconCloseCircleFill } from '@emooa/icon';

const App: React.FC = () => {
  return (
    <Space>
      <Button
        type="primary"
        onClick={() => {
          Notification.info({
            title: 'Notification',
            content: 'This is an info notification!',
            closable: false,
          });
        }}
      >
        Close Icon
      </Button>
      <Button
        type="primary"
        onClick={() => {
          Notification.info({
            title: 'Notification',
            content: 'This is an info notification!',
            closeIcon: <IconCloseCircleFill />,
          });
        }}
      >
        Custom Close Icon
      </Button>
    </Space>
  );
};

export default App;
