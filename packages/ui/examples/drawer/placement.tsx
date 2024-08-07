import React from 'react';
import { Button, Drawer, Modal, Image, Space } from '@emooa/ui';

const App: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [placement, setPlacement] = React.useState<'right' | 'top' | 'left' | 'bottom'>('right');
  return (
    <div>
      <Space>
        <Button
          onClick={() => {
            setPlacement('right');
            setVisible(true);
          }}
          type="primary"
        >
          Right
        </Button>
        <Button
          onClick={() => {
            setPlacement('left');
            setVisible(true);
          }}
          type="primary"
        >
          left
        </Button>
        <Button
          onClick={() => {
            setPlacement('top');
            setVisible(true);
          }}
          type="primary"
        >
          Top
        </Button>
        <Button
          onClick={() => {
            setPlacement('bottom');
            setVisible(true);
          }}
          type="primary"
        >
          Bottom
        </Button>
      </Space>
      <Drawer
        placement={placement}
        title="Drawer Title"
        open={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <p>
          Customize the position, click the trigger button to slide the drawer out from the corresponding position, and
          click the mask area to close it.
        </p>
        <Image height={200} width={300} src="https://api.emooa.com/aimg?idx=1" />
      </Drawer>
    </div>
  );
};

export default App;
