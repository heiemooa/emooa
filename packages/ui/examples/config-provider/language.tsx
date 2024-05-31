import React, { useState } from 'react';
import { ConfigProvider, Space, Image } from '@emooa/ui';
import zhCN from '@emooa/ui/esm/_locale/zh-cn';
import en from '@emooa/ui/esm/_locale/en';

const App: React.FC = () => {
  const [i18n, setI18n] = useState(zhCN);
  return (
    <>
      <Space style={{ marginBottom: 10 }}>
        <button onClick={() => setI18n(zhCN)}>zh-CN</button>
        <button onClick={() => setI18n(en)}>en</button>
      </Space>
      <br />
      <ConfigProvider locale={i18n}>
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
