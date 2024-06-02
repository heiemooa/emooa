import React, { useState } from 'react';
import { ConfigProvider, Space, Image, Button, Divider } from '@emooa/ui';

const App: React.FC = () => {
  const [size, setSize] = useState<'small' | 'mini' | 'medium' | 'large'>('small');
  return (
    <>
      <Button.Group>
        <Button onClick={() => setSize('mini')} type={size === 'mini' ? 'primary' : 'secondary'}>
          mini
        </Button>
        <Button onClick={() => setSize('small')} type={size === 'small' ? 'primary' : 'secondary'}>
          small
        </Button>
        <Button onClick={() => setSize('medium')} type={size === 'medium' ? 'primary' : 'secondary'}>
          medium
        </Button>
        <Button onClick={() => setSize('large')} type={size === 'large' ? 'primary' : 'secondary'}>
          large
        </Button>
      </Button.Group>
      <Divider />
      <ConfigProvider
        components={{
          Image: {
            className: 'image',
          },
          Space: {
            size: 'large',
          },
        }}
      >
        <Space size={size}>
          <Image src="https://api.emooa.com/aimg?idx=1" height={100} />
          <Image src="https://api.emooa.com/aimg?idx=2" height={100} />
          <Image src="https://api.emooa.com/aimg?idx=3" height={100} />
        </Space>
      </ConfigProvider>
    </>
  );
};

export default App;
