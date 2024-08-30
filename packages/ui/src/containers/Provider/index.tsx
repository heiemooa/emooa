import React, { useState } from 'react';
import { Button, ConfigProvider, Message, Modal } from '../../../components';

Message.config({
  duration: 10000,
  maxCount: 3,
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
      }}
    >
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
