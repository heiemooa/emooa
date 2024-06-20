import React from 'react';
import { Watermark } from '@emooa/ui';

const App: React.FC = () => {
  return (
    <Watermark content="Eui Watermark">
      <div style={{ height: 300 }}></div>
    </Watermark>
  );
};

export default App;
