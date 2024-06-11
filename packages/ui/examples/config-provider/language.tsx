import React, { useState } from 'react';
import { ConfigProvider, Space, Image, Divider, Button } from '@emooa/ui';
import zhCN from '@emooa/ui/esm/_locale/zh-cn';
import en from '@emooa/ui/esm/_locale/en';

const App: React.FC = () => {
  const [lang, setLang] = useState('zh-cn');

  const langs = {
    'zh-cn': zhCN,
    en,
  };
  return (
    <>
      <Space style={{ marginBottom: 10 }}></Space>
      <Button.Group>
        <Button onClick={() => setLang('zh-cn')} type={lang === 'zh-cn' ? 'primary' : 'secondary'}>
          zh-CN
        </Button>
        <Button onClick={() => setLang('en')} type={lang === 'en' ? 'primary' : 'secondary'}>
          en
        </Button>
      </Button.Group>
      <Divider />
      <ConfigProvider locale={langs[lang]}>
        <Space>
          <Image src={`https://api.emooa.com/aimg?idx=1&lang=${lang}`} height={100} placeholder={true} />
          <Image src={`https://api.emooa.com/aimg?idx=2&lang=${lang}`} height={100} placeholder={true} />
        </Space>
      </ConfigProvider>
    </>
  );
};

export default App;
