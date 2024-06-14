import React, { useRef } from 'react';
import { Image } from '@emooa/ui';

const App: React.FC = () => {
  const ref = useRef();
  return (
    <>
      <Image
        src="https://api.emooa.com/aimg?idx=1"
        height={120}
        preview={
          {
            // getPopupContainer: () => ref.current,
          }
        }
      />
      <div ref={ref} />
    </>
  );
};

export default App;
