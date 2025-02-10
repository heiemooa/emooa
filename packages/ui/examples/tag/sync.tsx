import React from 'react';
import { Tag, Message, Space } from '@emooa/ui';

const App: React.FC = () => {
  return (
    <Tag
      closable
      onClose={() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (Math.random() >= 0.5) {
              resolve({});
            } else {
              Message.error('Close failed');
              reject();
            }
          }, 3000);
        });
      }}
    >
      Sync Close
    </Tag>
  );
};

export default App;
