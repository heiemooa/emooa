import React, { createContext } from 'react';
import { Message, Button, Space, ConfigProvider, MessageProps } from '../../../components';

function updateMessage() {
  const a = Message.loading({
    id: 'need_update',
    content: 'Will update after 2 seconds...',
  });
  setTimeout(() => {
    a();
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
