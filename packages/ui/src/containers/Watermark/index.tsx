import Image from '@/image';
import Space from '@/space';
import Watermark from '@/watermark';
import React from 'react';

const App = () => {
  return (
    <Watermark content={['Arco Design', 'aaa']}>
      <div style={{ height: 300 }}></div>
    </Watermark>
  );
};

export default App;
