import React from 'react';
import { Button, Notification } from '@emooa/ui';

const App: React.FC = () => {
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          Notification.info({
            title: 'Notification',
            content: 'This is an info notification!',
          });
        }}
      >
        Notification
      </Button>
    </>
  );
};

export default App;
