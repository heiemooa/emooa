import React from 'react';
import { Button, Space } from '@emooa/ui';
import http from './http';

const App: React.FC = () => {
  const fetchData500 = async () => {
    const data = await http.get('/api/500');
    console.log(data);
  };

  const fetchData401 = async () => {
    const data = await http.get('/api/401');
    console.log(data);
  };

  const fetchData403 = async () => {
    const data = await http.get('/api/403');
    console.log(data);
  };

  return (
    <Space>
      <Button type="primary" onClick={fetchData500}>
        Load 500
      </Button>
      <Button type="primary" onClick={fetchData401}>
        Load 401
      </Button>
      <Button type="primary" onClick={fetchData403}>
        Load 403
      </Button>
    </Space>
  );
};

export default App;
