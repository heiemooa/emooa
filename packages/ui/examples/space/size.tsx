import React, { useState } from 'react';
import { Space, SpaceSize, Image, Button, Divider } from '@emooa/ui';

const App: React.FC = () => {
  const [size, setSize] = useState<SpaceSize | SpaceSize[]>('small');
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
        <Button onClick={() => setSize(12)} type={size === 12 ? 'primary' : 'secondary'}>
          12
        </Button>
        <Button onClick={() => setSize(24)} type={size === 24 ? 'primary' : 'secondary'}>
          [24, 24]
        </Button>
      </Button.Group>
      <Divider />
      <Space size={size}>
        <Image src="https://api.emooa.com/aimg?idx=1" height={100} />
        <Image src="https://api.emooa.com/aimg?idx=2" height={100} />
        <Image src="https://api.emooa.com/aimg?idx=3" height={100} />
      </Space>
    </>
  );
};

export default App;
