import React, { useState } from 'react';
import { Image, Button, Space } from '@emooa/ui';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const srcList = [
    'https://api.emooa.com/aimg?idx=1',
    'https://api.emooa.com/aimg?idx=2',
    'https://api.emooa.com/aimg?idx=3',
    'https://api.emooa.com/aimg?idx=4',
  ];

  return (
    <Space direction="vertical">
      <Image.PreviewGroup>
        <Space>
          {srcList.map((src, index) => (
            <Image key={index} src={src} width={200} alt={`lamp${index + 1}`} />
          ))}
        </Space>
      </Image.PreviewGroup>
      <Image.PreviewGroup srcList={srcList} visible={visible} onVisibleChange={setVisible}>
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
          }}
        >
          Click me to preview group image
        </Button>
      </Image.PreviewGroup>
    </Space>
  );
};

export default App;
