import React from 'react';
import { Space, Tag } from '@emooa/ui';

const App: React.FC = () => {
  return (
    <Space size="large">
      <Tag size="large" closable>
        Large
      </Tag>
      <Tag size="medium" closable>
        Medium
      </Tag>
      <Tag size="small" closable>
        Small
      </Tag>
      <Tag size="mini" closable>
        Mini
      </Tag>
    </Space>
  );
};

export default App;
