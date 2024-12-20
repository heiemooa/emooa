import React from 'react';
import { Space, Copy } from '@emooa/ui';

const App: React.FC = () => {
  return (
    <Space direction="vertical">
      <Copy>This is a copyable text.</Copy>
      <Copy>
        <span>TThese texts are wrapped in dom nodes .</span>
      </Copy>
      <Copy hover>This is a copyable text with hover.</Copy>
    </Space>
  );
};

export default App;
