import React from 'react';
import { Space, Copy } from '@emooa/ui';

const App: React.FC = () => {
  return (
    <Space direction="vertical">
      <Copy text="Hi, Emooa UI!">This is a custom text.</Copy>
      <Copy
        text={() =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve('This is a loading text.');
            }, 1000);
          })
        }
      >
        This is a loading text.
      </Copy>
    </Space>
  );
};

export default App;
