import React from 'react';
import { Button, Space } from '@emooa/ui';
import http from './http';

const App: React.FC = () => {
  const fetchData404 = async () => {
    const data = await http.get('/api/404');
    console.log(data);
  };

  return (
    <Space>
      <Button type="primary" onClick={fetchData404} status="danger">
        Load 404
      </Button>
    </Space>
  );
};

export default App;
