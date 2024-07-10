import React, { useContext } from 'react';
import { App, Button, Space } from '../../../components';

const MyPage = () => {
  const { modal } = App.useApp();

  const values = useContext(App.Context);

  const showModal = () => {
    modal.warning({
      title: 'This is a message',
      content: `Current component: ${values.name}`,
    });
  };

  return (
    <Space wrap>
      <Button type="primary" onClick={showModal}>
        Open modal
      </Button>
    </Space>
  );
};

export default () => (
  <App values={{ name: 'Emooa App' }}>
    <MyPage />
  </App>
);
