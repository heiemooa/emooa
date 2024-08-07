import React, { useState } from 'react';
import { Button, Drawer } from '@emooa/ui';

const App: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerOpen1, setIsDrawerOpen1] = useState(false);

  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleOk = () => {
    setIsDrawerOpen(false);
  };

  const handleCancel = () => {
    setIsDrawerOpen(false);
  };

  const showDrawer1 = () => {
    setIsDrawerOpen1(true);
  };

  const handleOk1 = () => {
    setIsDrawerOpen1(false);
  };

  const handleCancel1 = () => {
    setIsDrawerOpen1(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Drawer
      </Button>
      <Drawer title="Title 1" open={isDrawerOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <Button type="primary" onClick={showDrawer1}>
          Drawer
        </Button>
      </Drawer>

      <Drawer title="Title 2" open={isDrawerOpen1} onOk={handleOk1} onCancel={handleCancel1}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default App;
