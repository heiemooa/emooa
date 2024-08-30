import React from 'react';
import { Button, Message, Space } from '@emooa/ui';

const App: React.FC = () => {
  return (
    <Space size="large">
      <Button
        onClick={() =>
          Message.info({
            position: 'top',
            content: 'This is an Top message!',
          })
        }
        type="primary"
      >
        Top
      </Button>
      <Button
        onClick={() =>
          Message.info({
            content: 'This is a Bottom message!',
            position: 'bottom',
          })
        }
        type="primary"
      >
        Bottom
      </Button>
    </Space>
  );
};

export default App;
