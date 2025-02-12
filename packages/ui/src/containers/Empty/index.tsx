import { IconExclamation } from '@emooa/icon';
import { Empty } from '../../../components';

import React from 'react';

function App() {
  return (
    <>
      <Empty icon="https://photokit.com/features/images/image-text.webp" />

      <Empty description="No data, please reload!" />
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
            }}
          >
            <IconExclamation />
          </div>
        }
        description="No data, please reload!"
      />
    </>
  );
}

export default App;
