import React from 'react';
import { Button, Message } from '@emooa/ui';

function updateMessage() {
  const close = Message.loading({
    content: 'Will close after 2 seconds...',
    duration: 0,
  });
  setTimeout(() => {
    close?.();
  }, 2000);
}

const App: React.FC = () => {
  return (
    <Button onClick={updateMessage} type="primary">
      Close after 2s later
    </Button>
  );
};

export default App;
