import React from 'react';
import { Space, Button, Theme } from '@emooa/ui';

const { useToken } = Theme;
const App: React.FC = () => {
  const token = useToken();
  console.log('token', token);
  return (
    <Space direction="vertical">
      <Space>
        <Button type="primary">Primary</Button>
        <Button>Secondary</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="outline">Outline</Button>
        <Button type="text">Text</Button>
      </Space>
      <Space>
        <Button type="primary" status="danger">
          Primary
        </Button>
        <Button status="danger">Secondary</Button>
        <Button type="dashed" status="danger">
          Dashed
        </Button>
        <Button type="outline" status="danger">
          Outline
        </Button>
        <Button type="text" status="danger">
          Text
        </Button>
      </Space>
      <Space>
        <Button type="primary" status="success">
          Primary
        </Button>
        <Button status="success">Secondary</Button>
        <Button type="dashed" status="success">
          Dashed
        </Button>
        <Button type="outline" status="success">
          Outline
        </Button>
        <Button type="text" status="success">
          Text
        </Button>
      </Space>
      <Space>
        <Button type="primary" status="warning">
          Primary
        </Button>
        <Button status="warning">Secondary</Button>
        <Button type="dashed" status="warning">
          Dashed
        </Button>
        <Button type="outline" status="warning">
          Outline
        </Button>
        <Button type="text" status="warning">
          Text
        </Button>
      </Space>
    </Space>
  );
};

export default App;
