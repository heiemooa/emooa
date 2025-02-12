import React from 'react';
import { Empty } from '@emooa/ui';
import { IconExclamation } from '@emooa/icon';

const App: React.FC = () => {
  return (
    <Empty
      icon={
        <div
          style={{
            background: '#f2994b',
            display: 'inline-flex',
            borderRadius: '50%',
            alignItems: 'center',
            color: 'white',
            justifyContent: 'center',
            fontSize: 56,
          }}
        >
          <IconExclamation />
        </div>
      }
      description="No data"
    />
  );
};

export default App;
