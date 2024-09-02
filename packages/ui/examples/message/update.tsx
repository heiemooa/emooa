import React from 'react';
import { Button, Message } from '@emooa/ui';

function updateMessage() {
  Message.loading({
    id: 'eui_message',
    content: 'Will update after 2 seconds...',
    duration: 3000,
  });
  setTimeout(() => {
    Message.success({
      id: 'eui_message',
      content: 'Update success!',
      duration: 3000,
    });
  }, 2000);
}

const App: React.FC = () => {
  return (
    <Button onClick={updateMessage} type="primary">
      Update message
    </Button>
  );
};

export default App;
