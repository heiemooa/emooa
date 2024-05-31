import React from 'react';
import { Space, Button } from '@emooa/ui';

const App: React.FC = () => {
  return (
    <Space direction="vertical">
      <Space>
        <Button type="primary" disabled>
          Primary
        </Button>
        <Button disabled>Secondary</Button>
        <Button type="dashed" disabled>
          Dashed
        </Button>
        <Button type="outline" disabled>
          Outline
        </Button>
        <Button type="text" disabled>
          Text
        </Button>
      </Space>
      <Space>
        <Button type="primary" status="danger" disabled>
          Primary
        </Button>
        <Button status="danger" disabled>
          Secondary
        </Button>
        <Button type="dashed" status="danger" disabled>
          Dashed
        </Button>
        <Button type="outline" status="danger" disabled>
          Outline
        </Button>
        <Button type="text" status="danger" disabled>
          Text
        </Button>
      </Space>
      <Space>
        <Button type="primary" status="success" disabled>
          Primary
        </Button>
        <Button status="success" disabled>
          Secondary
        </Button>
        <Button type="dashed" status="success" disabled>
          Dashed
        </Button>
        <Button type="outline" status="success" disabled>
          Outline
        </Button>
        <Button type="text" status="success" disabled>
          Text
        </Button>
      </Space>
      <Space>
        <Button type="primary" status="warning" disabled>
          Primary
        </Button>
        <Button status="warning" disabled>
          Secondary
        </Button>
        <Button type="dashed" status="warning" disabled>
          Dashed
        </Button>
        <Button type="outline" status="warning" disabled>
          Outline
        </Button>
        <Button type="text" status="warning" disabled>
          Text
        </Button>
      </Space>
    </Space>
  );
};

export default App;
