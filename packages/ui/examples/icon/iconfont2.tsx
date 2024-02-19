import React from 'react';
import { Icon, Space } from '@emooa/ui';

const IconFont = Icon.createFromIconfontCN({
  url: [
    '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js', // icon-javascript, icon-java, icon-shoppingcart (overridden)
    '//sf1-cdn-tos.toutiaostatic.com/obj/iconfont/index_8132353a46ca4ac1314b8903202269af.js', // icon-person, icon-flag
  ],
});

const App: React.FC = () => (
  <Space>
    <IconFont type="icon-javascript" />
    <IconFont type="icon-java" />
    <IconFont type="icon-person" />
    <IconFont type="icon-flag" />
  </Space>
);

export default App;
