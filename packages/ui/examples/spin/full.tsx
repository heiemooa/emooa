import React, { useState } from 'react';
import { Spin, Button } from '@emooa/ui';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const showFullScreen = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Button onClick={showFullScreen}> Full Screen</Button>

      <Spin full loading={loading}></Spin>
    </>
  );
};

export default App;
