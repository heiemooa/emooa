import { Modal, Button, Space } from '@emooa/ui';
import React from 'react';

function info() {
  Modal.info({
    title: 'Info Notification',
    content: 'This is an info description which directly indicates a neutral informative change or action.',
    onOk: () =>
      new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(e => {
        throw e;
      }),
  });
}

function success() {
  Modal.success({
    title: 'This is a success notification',
  });
}

function warning() {
  Modal.warning({
    title: 'Warning Notification',
    content: 'This is a warning description which directly indicates a warning that might need attention.',
  });
}

function error() {
  Modal.error({
    title: 'Error Notification',
    content: 'This is an error description which directly indicates a dangerous or potentially negative action.',
  });
}

const App: React.FC = () => {
  return (
    <Space size="large">
      <Button type="primary" onClick={info}>
        Info
      </Button>
      <Button type="primary" status="success" onClick={success}>
        Success
      </Button>
      <Button type="primary" status="warning" onClick={warning}>
        Warning
      </Button>
      <Button type="primary" status="danger" onClick={error}>
        Error
      </Button>
    </Space>
  );
};

export default App;
