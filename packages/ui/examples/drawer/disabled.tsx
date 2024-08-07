import React, { useState } from 'react';
import { Button, Drawer, Space } from '@emooa/ui';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Diabled during promise
      </Button>
      <Drawer
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
      </Drawer>
    </>
  );
};

export default App;
