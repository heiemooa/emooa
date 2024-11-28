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
        <Image
          src={`https://api.emooa.com/aimg?idx=2&timestamp=${timestamp}`}
          delay={300}
          height={150}
          placeholder={true}
        />
        <Image
          src={`https://api.emooa.com/aimg?idx=2&timestamp=${timestamp}`}
          delay={300}
          height={150}
          motion
          placeholder={true}
        />
        <Image
          motion
          src={`https://api.emooa.com/aimg?idx=2&timestamp=${timestamp}`}
          content="点击加载"
          placeholder={`https://api.emooa.com/aimg?idx=2&timestamp=${timestamp}`}
          height={150}
          style={{ aspectRatio: 16 / 9 }}
        />
      </Space>
    </>
  );
};

export default App;
