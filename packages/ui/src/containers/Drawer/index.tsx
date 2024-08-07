import React from 'react';
import { Drawer, Button, Image } from '../../../components';
import Modal from '../Modal';

function App() {
  const [visible, setVisible] = React.useState(false);
  const [placement, setPlacement] = React.useState<'right' | 'top' | 'left' | 'bottom'>('right');
  return (
    <div>
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
      <Drawer
        placement={placement}
        title={<div>Drawer Title</div>}
        open={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <p>
          You can customize modal body text by the current situation. This modal will be closed immediately once you
          press the OK button.
        </p>
        <Modal />
        <Image height={200} src="https://api.emooa.com/aimg" />
      </Drawer>
    </div>
  );
}

export default App;
