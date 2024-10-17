import React from 'react';
import { Button, Space, App } from '@emooa/ui';
import http from './http';

const Demo: React.FC = () => {
  const { message } = App.useApp();

  const fetchData0 = async () => {
    const data = await http.get('/api/0');
    console.log(data);
    message.info({
      content: 'Http load success.',
    });
  };
  const fetchData404 = async () => {
    const data = await http.get('/api/404');
    console.log(data);
  };

  return (
    <Space>
      <Button type="primary" onClick={fetchData0}>
        Load Success
      </Button>
      <Button type="primary" onClick={fetchData404} status="danger">
        Load 404
      </Button>
    </Space>
  );
};

export default () => (
  <App>
    <Demo />
  </App>
);
