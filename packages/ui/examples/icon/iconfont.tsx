import React from 'react';
import { Space, Icon } from '@emooa/ui';

const IconFont = Icon.createFromIconfontCN({
  url: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const App: React.FC = () => {
  return (
    <Space>
      <IconFont type="icon-tuichu" />
      <IconFont type="icon-facebook" />
      <IconFont type="icon-twitter" />
    </Space>
  );
};

export default App;
