import React from 'react';
import { Alert } from '@emooa/ui';

const App: React.FC = () => {
  return (
    <>
      <Alert type="info" content="This is a info" style={{ marginTop: 10 }} />
      <Alert type="error" content="This is a error" style={{ marginTop: 10 }} />
      <Alert type="success" content="This is a success" style={{ marginTop: 10 }} />
      <Alert type="warning" content="This is a warning" style={{ marginTop: 10 }} />
    </>
  );
};

export default App;
