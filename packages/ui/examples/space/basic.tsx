import React from 'react';
import { Space, Image } from '@emooa/ui';

const App: React.FC = () => {
  return (
    <Space>
      <Image src="https://api.emooa.com/aimg?idx=1" height={100} />
      <Image src="https://api.emooa.com/aimg?idx=2" height={100} />
      <Image src="https://api.emooa.com/aimg?idx=3" height={100} />
    </Space>
  );
};

export default App;
