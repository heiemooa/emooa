import React from 'react';
import { Button, Notification, Space } from '@emooa/ui';

const App: React.FC = () => {
  return (
    <Space direction="vertical">
      <Space size="large">
        <Button
          onClick={() =>
            Notification.info({
              title: 'Notification',
              content: 'This is a topLeft notification!',
              position: 'topLeft',
            })
          }
          type="primary"
        >
          Top Left
        </Button>
        <Button
          onClick={() =>
            Notification.info({
              title: 'Notification',
              content: 'This is an topRight notification!',
            })
          }
          type="primary"
        >
          Top Right
        </Button>
      </Space>
      <Space size="large">
        <Button
          onClick={() =>
            Notification.info({
              title: 'Notification',
              content: 'This is a bottomRight notification!',
              position: 'bottomRight',
            })
          }
          type="primary"
        >
          Botom right
        </Button>
        <Button
          onClick={() =>
            Notification.info({
              title: 'Notification',
              content: 'This is an bottomLeft notification!',
              position: 'bottomLeft',
            })
          }
          type="primary"
        >
          Bottom Left
        </Button>
      </Space>
    </Space>
  );
};

export default App;
