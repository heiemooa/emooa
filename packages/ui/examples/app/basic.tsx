import React from 'react';
import { App, Button, Space } from '@emooa/ui';

const MyPage: React.FC = () => {
  const { modal } = App.useApp();

  const showModal = () => {
    modal.info({
      title: 'This is a message',
      content: `Some messages...`,
    });
  };

  return (
    <Button type="primary" onClick={showModal}>
      Hooks Modal
    </Button>
  );
};

export default () => (
  <App>
    <MyPage />
  </App>
);
