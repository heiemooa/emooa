import React from 'react';
import { Alert, Button, Space } from '@emooa/ui';
import { IconCheck } from '@emooa/icon';

const App: React.FC = () => {
  return (
    <>
      <Alert
        type="success"
        content="This is a success"
        style={{ marginTop: 10 }}
        closable
        action={
          <>
            <Button size="mini" type="primary">
              Detail
            </Button>
          </>
        }
      />
      <Alert
        type="error"
        content="This is a error"
        title="Error"
        style={{ marginTop: 10 }}
        closable
        action={
          <Space direction="vertical">
            <Button size="mini" type="primary">
              Detail
            </Button>
            <Button size="mini" type="primary" status="danger">
              Close
            </Button>
          </Space>
        }
      />
    </>
  );
};

export default App;
