import React from 'react';
import { Button, Message, Space } from '@emooa/ui';
import { IconCloseCircleFill } from '@emooa/icon';

const App: React.FC = () => {
  return (
    <Space>
      <Button
        type="primary"
        onClick={() => {
          Message.info({
            content: 'This is an info message!',
            closable: true,
          });
        }}
      >
        Close Icon
      </Button>
      <Button
        type="primary"
        onClick={() => {
          Message.info({
            content: 'This is an info message!',
            closable: true,
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
