import React, { useContext } from 'react';
import { App, Button, Space } from '@emooa/ui';

const MyPage: React.FC = () => {
  const { modal } = App.useApp();

  const values = useContext(App.Context);

  const showModal = () => {
    modal.info({
      title: 'This is a message',
      content: `Current component: ${values.name}`,
    });
  };

  return (
    <Button type="primary" onClick={showModal}>
      Context Modal
    </Button>
  );
};

export default () => (
  <App values={{ name: 'Emooa App' }}>
    <MyPage />
  </App>
);
