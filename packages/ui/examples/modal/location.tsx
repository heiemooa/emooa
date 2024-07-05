import React, { useState } from 'react';
import { Button, Modal, Space } from '@emooa/ui';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <Space>
      <Button type="primary" onClick={() => setOpen(true)}>
        Style Top
      </Button>
      <Modal title="Title" open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} style={{ top: 50 }}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Button type="primary" onClick={() => setOpen1(true)}>
        Style Width
      </Button>
      <Modal
        title="Title"
        open={open1}
        onOk={() => setOpen1(false)}
        onCancel={() => setOpen1(false)}
        style={{ width: 800 }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Button type="primary" onClick={() => setOpen2(true)}>
        Center
      </Button>
      <Modal title="Title" open={open2} center onOk={() => setOpen2(false)} onCancel={() => setOpen2(false)}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </Space>
  );
};

export default App;
