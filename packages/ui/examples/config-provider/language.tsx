import React, { useState } from 'react';
import { ConfigProvider, Space, Image, Divider, Button, Modal } from '@emooa/ui';
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
        <Button
          type="primary"
          onClick={() => {
            Modal.info({
              title: 'Modal title',
            });
          }}
        >
          Modal
        </Button>
      </ConfigProvider>
    </>
  );
};

export default App;
