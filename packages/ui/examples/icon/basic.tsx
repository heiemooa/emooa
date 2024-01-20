import React from 'react';
import { Icon, Space } from '@emooa/ui';

export default () => (
  <>
    <Space>
      <Icon icon="icon-image-fill" />
      <Icon icon="icon-image-fill" color="red" className="m-4" />
      <Icon icon="icon-image-fill" color="green" className="m-4" />
    </Space>
    <Space>
      <Icon icon="icon-image-fill" width={40} height={40} />
    </Space>
  </>
);
