import React from 'react';
import { Image, Space } from '@emooa/ui';

const App: React.FC = () => {
  return (
    <Space
      direction="vertical"
      style={{
        height: 400,
        width: '100%',
        overflowY: 'auto',
        background: '#f5f5f5',
      }}
    >
      <Image src="https://api.emooa.com/aimg?idx=1" lazy height={150} width={250} />
      <Image src="https://api.emooa.com/aimg?idx=2" lazy height={150} width={250} />
      <Image src="https://api.emooa.com/aimg?idx=3" lazy height={150} width={250} />
      <Image src="https://api.emooa.com/aimg?idx=4" lazy height={150} width={250} />
      <Image
        src="https://api.emooa.com/aimg?idx=5"
        lazy={{ rootMargin: '100px 0px 0px 0px' }}
        height={150}
        width={250}
      />
    </Space>
  );
};

export default App;
