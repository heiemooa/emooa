import React, { useState } from 'react';
import { Button, Drawer } from '@emooa/ui';

const App: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerOpen1, setIsDrawerOpen1] = useState(false);
  const [isDrawerOpen2, setIsDrawerOpen2] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setIsDrawerOpen(true)}>
        Drawer
      </Button>
      <Drawer
        title="Title 1"
        open={isDrawerOpen}
        onOk={() => setIsDrawerOpen(false)}
        onCancel={() => setIsDrawerOpen(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <Button type="primary" onClick={() => setIsDrawerOpen1(true)}>
          Drawer
        </Button>
        <Drawer
          title="Title 2"
          open={isDrawerOpen1}
          onOk={() => setIsDrawerOpen1(false)}
          onCancel={() => setIsDrawerOpen1(false)}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <Button type="primary" onClick={() => setIsDrawerOpen2(true)}>
            Drawer
          </Button>
          <Drawer
            title="Title 3"
            open={isDrawerOpen2}
            onOk={() => setIsDrawerOpen2(false)}
            onCancel={() => setIsDrawerOpen2(false)}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
        </Drawer>
      </Drawer>
    </>
  );
};

export default App;
