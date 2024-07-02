import React, { useState } from 'react';
import { Spin, Button, Space } from '@emooa/ui';

const App: React.FC = () => {
  const [loading1, setLoading1] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);

  const showFullScreen1 = () => {
    setLoading1(true);

    setTimeout(() => {
      setLoading1(false);
    }, 1000);
  };

  const showFullScreen2 = () => {
    setLoading2(true);

    setTimeout(() => {
      setLoading2(false);
    }, 2000);
  };

  return (
    <>
      <Space>
        <div>
          <Button onClick={showFullScreen1}> Full Screen</Button>
          <Spin full loading={loading1}></Spin>
        </div>
        <Button onClick={showFullScreen2}> Full Dot Screen</Button>
        <Spin full loading={loading2} dot></Spin>
      </Space>
    </>
  );
};

export default App;
