import React from 'react';
import { Button, Divider, Image } from '@emooa/ui';

const App: React.FC = () => {
  const [timestamp, setTimestamp] = React.useState(0);

  return (
    <>
      <Button type="primary" onClick={() => setTimestamp(Date.now())}>
        Reload
      </Button>
      <Divider />
      <Image src={`https://api.emooa.com/aimg?idx=2&timestamp=${timestamp}`} delay={300} height={150} />
    </>
  );
};

export default App;
