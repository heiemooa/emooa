import React from 'react';
import { Space, Button } from '@emooa/ui';

const App: React.FC = () => {
  return (
    <Space direction="vertical">
      <Space>
        <Button type="primary" size="mini">
          Mini
        </Button>
        <Button type="primary" size="small">
          Small
        </Button>
        <Button type="primary">Medium</Button>
        <Button type="primary" size="large">
          Large
        </Button>
      </Space>
    </Space>
  );
};

export default App;
