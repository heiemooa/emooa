import React from 'react';
import { createFromIconfontCN, Space } from '@emooa/ui';

const IconFont = createFromIconfontCN({
  url: [
    '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js', // icon-javascript, icon-java, icon-shoppingcart (overridden)
    '//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js', // icon-shoppingcart, icon-python
  ],
});

const App: React.FC = () => (
  <Space>
    <IconFont icon="icon-javascript" />
    <IconFont icon="icon-java" />
    <IconFont icon="icon-shoppingcart" />
    <IconFont icon="icon-python" />
  </Space>
);

export default App;
