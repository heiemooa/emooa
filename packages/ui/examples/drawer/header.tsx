import React, { useState } from 'react';
import { Button, Drawer, Space } from '@emooa/ui';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [closePlacement, setClosePlacement] = useState<'start' | 'end'>('start');

  const handleOpenAtStart = () => {
    setClosePlacement('start');
    setOpen(true);
  };

  const handleOpenAtEnd = () => {
    setClosePlacement('end');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        <Button type="primary" onClick={handleOpenAtStart}>
          Close at start
        </Button>
        <Button type="primary" onClick={handleOpenAtEnd}>
          Close at end
        </Button>
      </Space>
      <Drawer
        title="Drawer title"
        open={open}
        closable={{ placement: closePlacement }}
        extra={
          <Space>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="primary" onClick={handleClose}>
              Save
            </Button>
          </Space>
        }
        onCancel={handleClose}
      >
        <p>Drawer content</p>
      </Drawer>
    </>
  );
};

export default App;
