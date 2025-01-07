import React from 'react';
import { Alert } from '@emooa/ui';

const App: React.FC = () => {
  return (
    <>
      <Alert content="This is a info" style={{ marginBottom: 10, marginTop: 4 }} banner />
      <Alert content="This is a info" style={{ marginBottom: 10 }} banner closable />
      <Alert title="Info" content="This is a info" style={{ marginBottom: 10 }} banner />
      <Alert type="success" content="This is a success" style={{ marginBottom: 10 }} banner />
    </>
  );
};

export default App;
