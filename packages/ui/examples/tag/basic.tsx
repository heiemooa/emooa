import React from 'react';
import { Space, Tag } from '@emooa/ui';
import { IconCheckCircleFill, IconCloseCircleFill } from '@emooa/icon';

const App: React.FC = () => {
  return (
    <Space>
      <Tag>Default</Tag>
      <Tag closable>Closable</Tag>
      <Tag closable closeIcon={<IconCloseCircleFill />}>
        Close Icon
      </Tag>
      <Tag icon={<IconCheckCircleFill />}>Complete</Tag>
    </Space>
  );
};

export default App;
