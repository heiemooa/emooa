import React from 'react';
import { Message, Button } from '../../../components';

function updateMessage() {
  Message.loading({
    content: 'Will update after 2 seconds...',
    duration: 0,
  });
  Message.loading({
    content: 'Will update after 2 seconds...',
    duration: 0,
  });
  Message.loading({
    content: 'Will update after 2 seconds...',
    duration: 0,
  });

  setTimeout(() => {
    Message.clear();
  }, 2000);
}

const App = () => {
  return (
    <Button onClick={updateMessage} type="primary">
      Update message
    </Button>
  );
};

export default App;
