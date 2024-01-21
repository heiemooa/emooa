import React from 'react';
import { Icon, Space } from '@emooa/ui';

const App: React.FC = () => (
  <Space>
    <Icon icon="icon-image-fill" width={40} height={40} />
    <Icon icon="icon-image-fill" style={{ fontSize: 40 }} />
  </Space>
);

export default App;
