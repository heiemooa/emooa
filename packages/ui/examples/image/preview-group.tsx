import React from 'react';
import { Image, Space } from '@emooa/ui';

const App: React.FC = () => {
  const items = [
    'https://api.emooa.com/aimg?idx=1',
    'https://api.emooa.com/aimg?idx=2',
    'https://api.emooa.com/aimg?idx=3',
    'https://api.emooa.com/aimg?idx=4',
  ];

  return (
    <Image.PreviewGroup>
      <Space wrap>
        {items.map((src, index) => (
          <Image key={index} src={src} width={200} alt={`lamp${index + 1}`} />
        ))}
      </Space>
    </Image.PreviewGroup>
  );
};

export default App;
