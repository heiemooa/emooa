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
      <Image src="https://api.emooa.com/aimg?idx=1" lazy height={200} width={350} />
      <Image src="https://api.emooa.com/aimg?idx=2" lazy height={200} width={350} />
      <Image src="https://api.emooa.com/aimg?idx=3" lazy height={200} width={350} />
      <Image src="https://api.emooa.com/aimg?idx=4" lazy height={200} width={350} />
      <Image
        src="https://api.emooa.com/aimg?idx=5"
        lazy={{ rootMargin: '100px 0px 0px 0px' }}
        height={200}
        width={350}
      />
    </Space>
  );
};

export default App;
