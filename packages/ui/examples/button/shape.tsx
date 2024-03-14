import React, { useState } from 'react';
import { Space, Button } from '@emooa/ui';
import { IconSearch } from '@emooa/icon';

const App: React.FC = () => {
  return (
    <Space direction="vertical">
      <Space>
        <Button type="primary" shape="circle" icon={<IconSearch />} />
        <Button type="text" shape="circle" icon={<IconSearch />} />
        <Button type="primary" icon={<IconSearch />} />
        <Button type="text" icon={<IconSearch />} />
      </Space>

      <Space>
        <Button type="primary" icon={<IconSearch />}>
          square
        </Button>
        <Button type="text" icon={<IconSearch />}>
          square
        </Button>
        <Button type="primary" shape="round" icon={<IconSearch />}>
          round
        </Button>
        <Button type="text" shape="round" icon={<IconSearch />}>
          round
        </Button>
      </Space>
    </Space>
  );
};

export default App;
