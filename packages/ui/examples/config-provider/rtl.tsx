import React, { useState } from 'react';
import { ConfigProvider, Space, Image } from '@emooa/ui';
import zhCN from '@emooa/ui/esm/_locale/zh-cn';

const App: React.FC = () => {
  return (
    <>
      <ConfigProvider locale={zhCN} rtl={true}>
        <Space>
          <Image src="https://api.emooa.com/aimg?idx=1" height={100} />
          <Image src="https://api.emooa.com/aimg?idx=2" height={100} />
          <Image src="https://api.emooa.com/aimg?idx=3" height={100} />
        </Space>
      </ConfigProvider>
    </>
  );
};

export default App;
