import Image from '@/image';
import Space from '@/space';
import Watermark from '@/watermark';
import React from 'react';

const App = () => {
  return (
    <Space direction="vertical">
      <Watermark content={['Arco Design', 'aaa']}>
        <div style={{ height: 300 }}></div>
      </Watermark>
    </Space>
  );
};

export default App;
