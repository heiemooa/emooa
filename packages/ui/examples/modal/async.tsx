import React, { useState } from 'react';
import { Button, Modal, Space } from '@emooa/ui';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  return (
    <Space>
      <Button type="primary" onClick={() => setOpen(true)}>
        Async Modal by 'confirmLoading'
      </Button>
      <Modal
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
      </Modal>

      <Button type="primary" onClick={() => setOpen1(true)}>
        Async Modal by 'Promise'
      </Button>
      <Modal
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
      </Modal>
    </Space>
  );
};

export default App;
