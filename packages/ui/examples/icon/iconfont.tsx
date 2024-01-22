import React from 'react';
import { createFromIconfontCN, Space } from '@emooa/ui';

const IconFont = createFromIconfontCN({
  url: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const App: React.FC = () => (
  <Space>
    <IconFont type="icon-tuichu" />
    <IconFont type="icon-facebook" />
    <IconFont type="icon-twitter" />
  </Space>
);

export default App;
