import React, { useState } from 'react';
import { Space, SpaceSize, Image } from '@emooa/ui';

const App: React.FC = () => {
  const [size, setSize] = useState<SpaceSize | SpaceSize[]>('small');
  return (
    <Space direction="vertical" size={24}>
      <Space>
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
        <button onClick={() => setSize(12)} style={{ color: size === 12 ? 'red' : undefined }}>
          12
        </button>
        <button onClick={() => setSize(24)} style={{ color: size === 24 ? 'red' : undefined }}>
          [24, 24]
        </button>
      </Space>
      <Space size={size}>
        <Image src="https://api.emooa.com/aimg?idx=1" height={100} />
        <Image src="https://api.emooa.com/aimg?idx=2" height={100} />
        <Image src="https://api.emooa.com/aimg?idx=3" height={100} />
      </Space>
    </Space>
  );
};

export default App;
