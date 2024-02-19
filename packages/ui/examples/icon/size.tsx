import React from 'react';
import { Space } from '@emooa/ui';
import { IconApps, IconCheckCircle, IconWoman, IconCloseCircle, IconMan } from '@emooa/icon';

const App: React.FC = () => {
  return (
    <Space style={{ color: '#333' }}>
      <IconApps />
      <IconCheckCircle fontSize="20px" />
      <IconCloseCircle fontSize="30px" />
      <IconWoman fontSize="40px" />
      <IconMan style={{ fontSize: 60 }} />
    </Space>
  );
};

export default App;
