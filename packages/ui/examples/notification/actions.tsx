import { Button, Notification } from '@emooa/ui';
import React from 'react';

function updateNotification() {
  const id = `${Date.now()}`;
  Notification.info({
    id,
    title: 'Notification',
    content: 'This is a notification!',
    duration: 0,
    actions: [
      <Button type="secondary" size="small" onClick={() => Notification.remove(id)} style={{ margin: '0 12px' }}>
        Cancel
      </Button>,
      <Button type="primary" size="small" onClick={() => Notification.remove(id)}>
        OK
      </Button>,
    ],
  });
}

const App: React.FC = () => {
  return (
    <Button onClick={updateNotification} type="primary">
      Open Notification
    </Button>
  );
};

export default App;
