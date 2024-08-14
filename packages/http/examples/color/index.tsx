import React from 'react';
import { Button, Space } from '@emooa/ui';
import http from './http';

const App: React.FC = () => {
  const fetchData = async () => {
    const data = await http.get('/api/403');
    console.log(data);
  };

  return (
    <Space>
      <Button type="primary" onClick={fetchData}>
        Load
      </Button>
    </Space>
  );
};

export default App;
