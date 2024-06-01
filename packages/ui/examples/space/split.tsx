import React from 'react';
import { Divider, Space } from '@emooa/ui';
import { IconDelete, IconEdit, IconAttachment } from '@emooa/icon';

const App: React.FC = () => (
  <Space split={<Divider type="vertical" />}>
    <IconEdit />
    <IconAttachment />
    <IconDelete color="red" />
  </Space>
);

export default App;
