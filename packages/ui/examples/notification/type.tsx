import React from 'react';
import { Button, Notification, Space } from '@emooa/ui';

const App: React.FC = () => {
  return (
    <Space size="large">
      <Button
        onClick={() => Notification.info({ title: 'Notification', content: 'This is an info notification!' })}
        type="primary"
      >
        Info
      </Button>
      <Button
        onClick={() => Notification.success({ title: 'Notification', content: 'This is a success notification!' })}
        type="primary"
        status="success"
      >
        Success
      </Button>
      <Button
        onClick={() => Notification.warning({ title: 'Notification', content: 'This is a warning notification!' })}
        type="primary"
        status="warning"
      >
        Warning
      </Button>
      <Button
        onClick={() => Notification.error({ title: 'Notification', content: 'This is an error notification!' })}
        type="primary"
        status="danger"
      >
        Error
      </Button>
    </Space>
  );
};

export default App;
