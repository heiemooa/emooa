import React from 'react';
import { Space } from '@emooa/ui';
import { IconDelete, IconEdit, IconAttachment } from '@emooa/icon';

const App: React.FC = () => (
  <Space split="|">
    <IconEdit />
    <IconAttachment />
    <IconDelete color="red" />
  </Space>
);

export default App;
