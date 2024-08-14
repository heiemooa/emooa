import React from 'react';
import { Button, Space } from '@emooa/ui';
import http from './http';

const App: React.FC = () => {
  const fetchData200 = async () => {
    const data = await http.get('/api/mapping/200');
    console.log(data);
  };

  const fetchData500 = async () => {
    const data = await http.get('/api/mapping/500');
    console.log(data);
  };

  return (
    <Space>
      <Button type="primary" onClick={fetchData200} status="success">
        Load 200
      </Button>
      <Button type="primary" onClick={fetchData500} status="danger">
        Load 500
      </Button>
    </Space>
  );
};

export default App;
