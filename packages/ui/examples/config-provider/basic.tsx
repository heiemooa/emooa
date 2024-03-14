import React, { useState } from 'react';
import { ConfigProvider, Space, Image } from '@emooa/ui';

const App: React.FC = () => {
  const [size, setSize] = useState<'small' | 'mini' | 'medium' | 'large'>('small');
  return (
    <>
      <Space style={{ marginBottom: 10 }}>
        <button onClick={() => setSize('mini')} style={{ color: size === 'mini' ? 'red' : undefined }}>
          mini
        </button>
        <button onClick={() => setSize('small')} style={{ color: size === 'small' ? 'red' : undefined }}>
          small
        </button>
        <button onClick={() => setSize('medium')} style={{ color: size === 'medium' ? 'red' : undefined }}>
          medium
        </button>
        <button onClick={() => setSize('large')} style={{ color: size === 'large' ? 'red' : undefined }}>
          large
        </button>
      </Space>
      <br />
      <ConfigProvider
        size={size}
        components={{
          Image: {
            className: 'image',
          },
        }}
      >
        <Space>
          <Image src="https://api.emooa.com/aimg?idx=1" height={100} />
          <Image src="https://api.emooa.com/aimg?idx=2" height={100} />
          <Image src="https://api.emooa.com/aimg?idx=3" height={100} />
        </Space>
      </ConfigProvider>
    </>
  );
};

export default App;
