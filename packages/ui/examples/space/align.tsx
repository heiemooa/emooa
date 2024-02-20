import React, { useState } from 'react';
import { Space, SpaceAlign, Image, Icon } from '@emooa/ui';

const App: React.FC = () => {
  const [align, setAlign] = useState<SpaceAlign>();
  return (
    <Space direction="vertical" size={24}>
      <Space>
        <button onClick={() => setAlign('start')} style={{ color: align === 'start' ? 'red' : undefined }}>
          start
        </button>
        <button onClick={() => setAlign('end')} style={{ color: align === 'end' ? 'red' : undefined }}>
          end
        </button>
        <button onClick={() => setAlign('center')} style={{ color: align === 'center' ? 'red' : undefined }}>
          center
        </button>
        <button onClick={() => setAlign('baseline')} style={{ color: align === 'baseline' ? 'red' : undefined }}>
          baseline
        </button>
      </Space>
      <Space align={align}>
        <Image src="https://api.emooa.com/aimg?idx=1" height={100} />
        <Image src="https://api.emooa.com/aimg?idx=2" height={80} />
        <Image src="https://api.emooa.com/aimg?idx=3" height={60} />
      </Space>
      <Space align={align} direction="vertical">
        <Image src="https://api.emooa.com/aimg?idx=1" height={100} />
        <Image src="https://api.emooa.com/aimg?idx=2" height={80} />
        <Image src="https://api.emooa.com/aimg?idx=3" height={60} />
      </Space>
    </Space>
  );
};

export default App;
