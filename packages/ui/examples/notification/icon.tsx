import React from 'react';
import { Button, Notification } from '@emooa/ui';
import { IconInfoCircle } from '@emooa/icon';

const App: React.FC = () => {
  return (
    <Button
      onClick={() =>
        Notification.info({
          icon: <IconInfoCircle />,
          title: 'Notification',
          content: 'This is an info notification!',
        })
      }
      type="primary"
    >
      Custom Icon
    </Button>
  );
};

export default App;
