import React from 'react';
import { Space, Spin } from '@emooa/ui';

const App: React.FC = () => {
  return (
    <Space direction="vertical" size={24}>
      <Space>
        <Spin />
        <Spin color="green" />
        <Spin color="red" />
        <Spin color="orange" />
      </Space>
      <Space wrap size={24}>
        <Spin dot />
        <Spin dot color="green" />
        <Spin dot color="red" />
        <Spin dot color="orange" />
      </Space>
    </Space>
  );
};

export default App;
