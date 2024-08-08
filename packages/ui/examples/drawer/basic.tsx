import React, { useState } from 'react';
import { Button, Drawer } from '@emooa/ui';

const App: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleOk = () => {
    setIsDrawerOpen(false);
  };

  const handleCancel = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Drawer
      </Button>
      <Drawer title="Title" open={isDrawerOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default App;
