import React from 'react';
import { Watermark } from '@emooa/ui';

const App: React.FC = () => {
  return (
    <Watermark image="https://cdn.emooa.com/image/meme/QQ/doge.gif" height={20} width={20}>
      <div style={{ height: 300 }}></div>
    </Watermark>
  );
};

export default App;
