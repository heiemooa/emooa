import React from 'react';
import { Icon, ConfigProvider, Space, Image } from '@emooa/ui';
import en from '@emooa/ui/esm/_locale/en-US';

console.log(1, en);
export default () => (
  <ConfigProvider
    locale={en}
    prefixCls="eui"
    componentConfig={{
      Space: {
        className: 'space',
        size: 'large',
        align: 'start',
      },
      Image: {
        className: 'image',
        src: '',
      },
      Icon: {
        className: 'icon',
        icon: '',
      },
    }}
  >
    <Space>
      <Icon icon="icon-image-fill" />
      <Icon icon="icon-image-fill" color="red" />
      <Icon icon="icon-image-fill" color="green" />
    </Space>
    <Space>
      <Image src="https://api.emooa.com/aimg?idx=1" height={100} />
      <Image src="https://api.emooa.com/aimg?idx=2" height={80} />
      <Image src="https://api.emooa.com/aimg?idx=3" height={60} />
    </Space>
  </ConfigProvider>
);
