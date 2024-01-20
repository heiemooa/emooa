import React from 'react';
import { Icon, ConfigProvider } from '@emooa/ui';

export default () => (
  <ConfigProvider prefixCls="e">
    <Icon icon="icon-image-fill" className="m-4" />
    <Icon icon="icon-image-fill" color="red" className="m-4" />
    <Icon icon="icon-image-fill" color="green" className="m-4" />
  </ConfigProvider>
);
