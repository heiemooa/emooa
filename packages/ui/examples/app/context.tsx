import React, { useContext } from 'react';
import { App, Button, Space } from '@emooa/ui';

const MyPage: React.FC = () => {
  const { modal, message } = App.useApp();

  const values = useContext(App.Context);

  return (
    <Space>
      <Button
        type="primary"
        onClick={() => {
          modal.info({
            title: 'This is a modal',
            content: `Current duration: ${values.message.duration}`,
          });
        }}
      >
        Context Modal
      </Button>
      <Button
        type="primary"
        onClick={() => {
          message.info({
            content: `Current duration: ${values.message.duration}`,
          });
        }}
      >
        Context Message
      </Button>
    </Space>
  );
};

export default () => (
  <App message={{ duration: 1000 }}>
    <MyPage />
  </App>
);
