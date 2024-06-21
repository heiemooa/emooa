import Image from '@/image';
import Space from '@/space';
import Watermark from '@/watermark';
import React from 'react';

const App = () => {
  return (
    <Space direction="vertical">
      <Watermark content={['Arco Design', 'aaa']}>
        <Image src="//api.emooa.com/aimg?idx=1" width={600} />
      </Watermark>
    </Space>
  );
};

export default App;
