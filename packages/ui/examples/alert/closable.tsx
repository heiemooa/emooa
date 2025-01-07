import React from 'react';
import { Alert } from '@emooa/ui';
import { IconCheck } from '@emooa/icon';

const App: React.FC = () => {
  return (
    <>
      <Alert type="info" content="This is a info" style={{ marginTop: 10 }} closable />
      <Alert type="error" content="This is a error" style={{ marginTop: 10 }} closable />
      <Alert type="success" content="This is a success" style={{ marginTop: 10 }} closable closeIcon={<IconCheck />} />
      <Alert type="warning" content="This is a warning" style={{ marginTop: 10 }} closable closeIcon="close" />
    </>
  );
};

export default App;
