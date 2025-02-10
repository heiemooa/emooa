import React from 'react';
import { Space, Tag } from '@emooa/ui';
import { IconCheckCircleFill } from '@emooa/icon';

const App: React.FC = () => {
  return (
    <Space>
      <Tag checkable>Awesome</Tag>
      <Tag checkable color="red" defaultChecked>
        Red
      </Tag>
      <Tag checkable color="#165dff" defaultChecked>
        #1F5DFF
      </Tag>
    </Space>
  );
};

export default App;
