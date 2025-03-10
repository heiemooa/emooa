import React from 'react';
import { Watermark } from '@emooa/ui';

const App: React.FC = () => {
  return (
    <Watermark
      content="Font color"
      font={{
        color: '#1677ff',
        fontSize: 20,
      }}
    >
      <div style={{ height: 300 }}></div>
    </Watermark>
  );
};

export default App;
