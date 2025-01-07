import React from 'react';
import { IconLink } from '@emooa/icon';
import { Alert, Button, Space } from '../../../components';
import { map } from 'lodash';

const App: React.FC = () => {
  return (
    <>
      <Alert type="info" title="Info" content="This is a info" style={{ marginTop: 10 }} closable />
      <Alert type="error" title="Error" content="This is a error" style={{ marginTop: 10 }}>
        Link
      </Alert>
      <Alert type="success" title="Success" content="This is a success" style={{ marginTop: 10 }}>
        Link
      </Alert>
      <Alert type="warning" title="Warning" content="This is a warning" style={{ marginTop: 10 }}>
        Disabled Link
      </Alert>

      <Alert type="info" content="Info" style={{ marginTop: 10 }} closable />
      <Alert type="error" content="Error" style={{ marginTop: 10 }}>
        Link
      </Alert>
      <Alert type="success" content="Success" style={{ marginTop: 10 }}>
        Link
      </Alert>
      <Alert type="warning" content="Warning" style={{ marginTop: 10 }}>
        Disabled Link
      </Alert>

      <Alert type="info" content="Info" style={{ marginTop: 10 }} closable closeIcon={<IconLink />} />
      <Alert type="error" content="Error" style={{ marginTop: 10 }} closable closeIcon="close">
        Link
      </Alert>
      <Alert type="success" content="Success" style={{ marginTop: 10 }} closable closeIcon={<span>span</span>}>
        Link
      </Alert>
      <Alert
        closable
        type="warning"
        content="Warning"
        style={{ marginTop: 10 }}
        closeIcon={
          <div>
            <div>div</div>
            <p>p</p>
          </div>
        }
      >
        Disabled Link
      </Alert>
      <Alert
        type="info"
        title="Info"
        content="This is a info"
        style={{ marginTop: 10 }}
        closable
        action={
          <Button size="mini" type="primary">
            Detail
          </Button>
        }
      />
      <Alert
        type="error"
        title="Error"
        content="This is a error"
        style={{ marginTop: 10 }}
        action={
          <Button size="mini" type="primary">
            Detail
          </Button>
        }
      >
        Link
      </Alert>
      <Alert
        type="success"
        title="Success"
        content="This is a success"
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
      >
        Link
      </Alert>
      <Alert
        type="warning"
        content="This is a warning"
        closable
        style={{ marginTop: 10 }}
        action={
          <Space direction="vertical">
            <Button size="mini" type="primary">
              Detail
            </Button>
          </Space>
        }
      >
        Disabled Link
      </Alert>
    </>
  );
};

export default App;
