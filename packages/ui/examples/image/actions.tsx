import { Image } from '@emooa/ui';
import { IconDownload, IconInfoCircle } from '@emooa/icon';
import React from 'react';

function App() {
  return (
    <Image
      height={200}
      src="https://api.emooa.com/aimg?idx=5"
      preview={{
        actions: [
          {
            key: 'download',
            content: <IconDownload />,
            name: 'Download',
          },
          {
            key: 'info',
            content: <IconInfoCircle />,
            name: 'Info',
          },
        ],
        actionsLayout: ['info', 'rotateRight', 'zoomIn', 'zoomOut', 'extra'],
      }}
      alt="lamp"
    />
  );
}

export default App;
