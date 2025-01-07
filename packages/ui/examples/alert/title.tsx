import React from 'react';
import { Alert } from '@emooa/ui';

const App: React.FC = () => {
  return (
    <>
      <Alert type="info" title="Info" content="This is a info" style={{ marginTop: 10 }} />
      <Alert type="error" title="Error" content="This is a error" style={{ marginTop: 10 }} />
      <Alert type="success" title="Success" content="This is a success" style={{ marginTop: 10 }} />
      <Alert type="warning" title="Warning" content="This is a warning" style={{ marginTop: 10 }} />
    </>
  );
};

export default App;
