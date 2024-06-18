import React from 'react';
import { Button, Divider, Image, Space } from '@emooa/ui';

const App: React.FC = () => {
  const [timestamp, setTimestamp] = React.useState(0);

  return (
    <>
      <Button type="primary" onClick={() => setTimestamp(Date.now())}>
        Delay Load
      </Button>
      <Divider />
      <Space>
        <Image src={`https://api.emooa.com/aimg?idx=2&timestamp=${timestamp}`} delay={300} height={200} />
        <Image src={`https://api.emooa.com/aimg?idx=2&timestamp=${timestamp}`} delay={300} height={200} motion />
      </Space>
    </>
  );
};

export default App;
