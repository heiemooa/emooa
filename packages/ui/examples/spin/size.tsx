import React from 'react';
import { Spin, Space } from '@emooa/ui';

const App: React.FC = () => {
  return (
    <Space size={40}>
      <Spin size="mini" />
      <Spin size="small" />
      <Spin size="medium" />
      <Spin size="large" />
    </Space>
  );
};

export default App;
