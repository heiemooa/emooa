import React from 'react';
import { Button, Message } from '@emooa/ui';

const App: React.FC = () => {
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          Message.info('This is an info message!');
        }}
      >
        Message
      </Button>
    </>
  );
};

export default App;
