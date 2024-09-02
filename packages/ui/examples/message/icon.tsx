import React from 'react';
import { Button, Message } from '@emooa/ui';
import { IconInfoCircle } from '@emooa/icon';

const App: React.FC = () => {
  return (
    <Button
      onClick={() =>
        Message.info({
          icon: <IconInfoCircle />,
          content: 'This is an info message!',
        })
      }
      type="primary"
    >
      Custom Icon
    </Button>
  );
};

export default App;
