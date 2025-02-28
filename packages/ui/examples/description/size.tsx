import React, { useState } from 'react';
import { Button, Description, Divider } from '@emooa/ui';

const items = [
  {
    label: 'Name',
    value: 'Emooa',
  },
  {
    label: 'Mobile',
    value: '123-1234-1234',
  },
  {
    label: 'Residence',
    value: 'Hangzhou',
  },
  {
    label: 'Hometown',
    value: 'Hangzhou',
  },
  {
    label: 'Address',
    value: 'Qianjiang Road, Shangcheng, Hangzhou',
  },
];

const App: React.FC = () => {
  const [size, setSize] = useState<'mini' | 'small' | 'medium' | 'large'>('mini');
  return (
    <>
      <Button.Group>
        <Button onClick={() => setSize('mini')} type={size === 'mini' ? 'primary' : 'secondary'}>
          Mini
        </Button>
        <Button onClick={() => setSize('small')} type={size === 'small' ? 'primary' : 'secondary'}>
          Small
        </Button>
        <Button onClick={() => setSize('medium')} type={size === 'medium' ? 'primary' : 'secondary'}>
          Medium
        </Button>
        <Button onClick={() => setSize('large')} type={size === 'large' ? 'primary' : 'secondary'}>
          Large
        </Button>
      </Button.Group>
      <Divider />
      <Description size={size} title="User Info" items={items} column={2} />
      <Divider />
      <Description size={size} title="User Info" items={items} column={2} bordered />
    </>
  );
};

export default App;
