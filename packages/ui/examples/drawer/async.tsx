import React, { useState } from 'react';
import { Button, Drawer, Space } from '@emooa/ui';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  return (
    <Space wrap>
      <Button type="primary" onClick={() => setOpen(true)}>
        Async Drawer by 'confirmLoading'
      </Button>
      <Drawer
        title="Title"
        open={open}
        onOk={() => {
          setConfirmLoading(true);
          setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
          }, 2000);
        }}
        confirmLoading={confirmLoading}
        onCancel={() => setOpen(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>

      <Button type="primary" onClick={() => setOpen1(true)}>
        Async Drawer by 'Promise'
      </Button>
      <Drawer
        title="Title"
        open={open1}
        onOk={async () => {
          await new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve({ ok: true });
            }, 2000);
          });
          setOpen1(false);
        }}
        onCancel={() => setOpen1(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </Space>
  );
};

export default App;
