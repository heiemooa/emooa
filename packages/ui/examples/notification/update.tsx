import React from 'react';
import { Button, Notification } from '@emooa/ui';

function updateMessage() {
  Notification.warning({
    id: 'eui_message',
    title: 'Notification',
    content: 'Will update after 2 seconds...',
    duration: 3000,
  });
  setTimeout(() => {
    Notification.success({
      id: 'eui_message',
      title: 'Notification',
      content: 'Update success!',
      duration: 3000,
    });
  }, 2000);
}

const App: React.FC = () => {
  return (
    <Button onClick={updateMessage} type="primary">
      Update notification
    </Button>
  );
};

export default App;
