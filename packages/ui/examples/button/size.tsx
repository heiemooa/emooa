import React from 'react';
import { Space, Button, Theme } from '@emooa/ui';

const { useToken } = Theme;
const App: React.FC = () => {
  const token = useToken();
  console.log('token', token);
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
