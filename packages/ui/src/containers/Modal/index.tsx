import React from 'react';
import { Modal, Button, Image } from '../../../components';
import Draggable from 'react-draggable';

function App() {
  const [visible, setVisible] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  return (
    <div>
      <Button onClick={() => setVisible(true)} type="primary">
        Open Draggable Modal
      </Button>
      <Modal
        center
        title={
          <div
            style={{ cursor: 'move' }}
            onMouseOver={() => {
              disabled && setDisabled(false);
            }}
            onMouseOut={() => {
              !disabled && setDisabled(true);
            }}
          >
            Draggable Title
          </div>
        }
        open={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        modalRender={modal => <Draggable disabled={disabled}>{modal}</Draggable>}
      >
        <p>
          You can customize modal body text by the current situation. This modal will be closed immediately once you
          press the OK button.
        </p>
        <Image height={200} src="https://api.emooa.com/aimg" />
      </Modal>
    </div>
  );
}

export default App;
