import React from 'react';
import { Spin, Space } from '@emooa/ui';

const App: React.FC = () => {
  return (
    <Space size={40}>
      <Spin size={20} />
      <Spin size={30} />
      <Spin size={40} />
    </Space>
  );
};

export default App;
