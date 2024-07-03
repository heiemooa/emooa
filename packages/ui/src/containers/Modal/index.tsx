import React from 'react';
import { Image, Button, Space, Theme, Modal } from '../../../components';

const token = Theme.getToken();
console.log(token);

function App() {
  const [visible, setVisible] = React.useState(false);
  const [visible1, setVisible1] = React.useState(false);
  return (
    <Space>
      <Button onClick={() => setVisible(true)} type="primary">
        Left align title
      </Button>
      <Modal
        title={<div>Modal Title</div>}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => {
          setVisible(false);
        }}
      >
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>

        <Button onClick={() => setVisible1(true)} type="primary">
          Left align title
        </Button>
      </Modal>
      <Modal
        title={<div>Modal Title</div>}
        visible={visible1}
        onCancel={() => {
          setVisible1(false);
        }}
        onOk={() => {
          setVisible1(false);
        }}
      >
        <Image src="https://api.emooa.com/aimg" height={200} />
      </Modal>
    </Space>
  );
}

export default App;
