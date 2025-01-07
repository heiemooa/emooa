import React from 'react';
import { Alert } from '@emooa/ui';
import { IconAppAdd } from '@emooa/icon';

const App: React.FC = () => {
  return (
    <>
      <Alert content="This is a info" style={{ marginBottom: 10 }} icon={<IconAppAdd />} />
      <Alert title="Info" content="This is a info" style={{ marginBottom: 10 }} icon={<IconAppAdd />} />
      <Alert content="This is a info" style={{ marginBottom: 10 }} showIcon={false} />
      <Alert title="Info" content="This is a info" style={{ marginBottom: 10 }} showIcon={false} />
    </>
  );
};

export default App;
