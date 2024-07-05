import React, { useState } from 'react';
import { Button, Modal, Space } from '@emooa/ui';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Space>
      <Button type="primary" onClick={() => setOpen(true)}>
        Diabled during OK promise
      </Button>
      <Modal
        title="Title"
        disabledOnPromise
        open={open}
        onOk={async () => {
          await new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve({ ok: true });
            }, 3000);
          });
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </Space>
  );
};

export default App;
