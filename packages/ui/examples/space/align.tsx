import React, { useState } from 'react';
import { Space, SpaceAlign, Image, Button } from '@emooa/ui';

const App: React.FC = () => {
  const [align, setAlign] = useState<SpaceAlign>('start');
  return (
    <Space direction="vertical" size={24}>
      <Button.Group>
        <Button onClick={() => setAlign('start')} type={align === 'start' ? 'primary' : 'secondary'}>
          start
        </Button>
        <Button onClick={() => setAlign('end')} type={align === 'end' ? 'primary' : 'secondary'}>
          end
        </Button>
        <Button onClick={() => setAlign('center')} type={align === 'center' ? 'primary' : 'secondary'}>
          center
        </Button>
        <Button onClick={() => setAlign('baseline')} type={align === 'baseline' ? 'primary' : 'secondary'}>
          baseline
        </Button>
      </Button.Group>
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
