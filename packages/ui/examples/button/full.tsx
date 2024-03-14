import React from 'react';
import { Space, Button } from '@emooa/ui';

const App: React.FC = () => {
  return (
    <Space direction="vertical" style={{ width: '400px' }}>
      <Button type="primary" full>
        Primary
      </Button>
      <Button full>Secondary</Button>
      <Button type="dashed" full>
        Dashed
      </Button>
      <Button type="outline" full>
        Outline
      </Button>
      <Button type="text" full>
        Text
      </Button>
    </Space>
  );
};

export default App;
