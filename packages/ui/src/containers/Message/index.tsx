import React, { useContext } from 'react';
import { App, Button, Space } from '../../../components';

const MyPage: React.FC = () => {
  const { message } = App.useApp();

  const values = useContext(App.Context);

  return (
    <Space>
      <Button
        type="primary"
        onClick={() => {
          message.info({
            content: `Current component: ${values.message.duration}`,
          });
        }}
      >
        useApp Message
      </Button>
    </Space>
  );
};

export default () => (
  <App message={{ duration: 1000 }}>
    <MyPage />
  </App>
);
