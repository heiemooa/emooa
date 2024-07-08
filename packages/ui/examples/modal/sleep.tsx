import React from 'react';
import { Modal, Button } from '@emooa/ui';

const App: React.FC = () => {
  const handleClick = () => {
    let seconds = 5;

    const instance = Modal.success({
      title: 'This is a notification message',
      content: `This modal will be destroyed after ${seconds} second.`,
    });

    const timer = setInterval(() => {
      seconds -= 1;
      instance.update({
        content: `This modal will be destroyed after ${seconds} second.`,
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      instance.close();
    }, seconds * 1000);
  };

  return (
    <div>
      <Button type="primary" onClick={handleClick}>
        Sleep Instance
      </Button>
    </div>
  );
};

export default App;
