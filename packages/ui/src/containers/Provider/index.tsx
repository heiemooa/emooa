import React, { useEffect } from 'react';
import { Button, ConfigProvider, Document, Message, Modal } from '../../../components';

Message.config({
  duration: 10000,
  maxCount: 3,
});
Document.config({
  home: 'https://cloud.tencent.com/document',
  patterns: [/^https?:\/\/docs\.emooa\.com(?:\/.*)?$/, /^https?:\/\/cloud\.tencent\.com\/document(?:\/.*)?$/],
});

const App: React.FC = () => {
  return (
    <ConfigProvider
      rtl={false}
      prefixCls="aaa"
      theme={{
        token: {
          colorPrimary: 'green',
        },
        components: {
          Button: {},
        },
      }}
      components={{
        Space: {
          size: 'medium',
        },
        Button: {
          type: 'primary',
        },
        Document: {
          home: 'https://cloud.tencent.com/document',
          patterns: [/^https?:\/\/docs\.emooa\.com(?:\/.*)?$/, /^https?:\/\/cloud\.tencent\.com\/document(?:\/.*)?$/],
        },
      }}
    >
      <a href="https://docs.emooa.com">Go to AAA Page 1</a>
      <br />
      <a href="https://cloud.tencent.com/document/product/213/43703">Go to AAA Page 2</a>
      <br />
      <a href="https://cloud.tencent.com/document">Go to AAA Page 2</a>
      <Document
        home="https://cloud.tencent.com/document"
        // patterns={[
        //   /^https?:\/\/docs\.emooa\.com(?:\/.*)?$/,
        //   /^https?:\/\/cloud\.tencent\.com\/document(?:\/.*)?$/,
        // ]}
      ></Document>

      <Button
        type="primary"
        onClick={() => {
          Message.info('aaaaaa');
        }}
      >
        Drawer
      </Button>
      <Button
        type="primary"
        onClick={() => {
          Message.error({
            className: 'aaa',
            content: 'bbb',
            position: 'bottom',
          });
        }}
      >
        Drawer
      </Button>
    </ConfigProvider>
  );
};

export default App;
