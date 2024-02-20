import React from 'react';
import { Space } from '@emooa/ui';
import { IconApps, IconCheckCircle, IconWoman, IconCloseCircle, IconMan } from '@emooa/icon';

const App: React.FC = () => {
  return (
    <Space>
      <IconApps />
      <IconCheckCircle color="green" />
      <IconCloseCircle color="red" />
      <IconWoman color="lightsalmon" />
      <IconMan color="lightskyblue" />
    </Space>
  );
};

export default App;
