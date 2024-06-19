import React from 'react';
import { Image } from '@emooa/ui';

const wrapperStyle: React.CSSProperties = {
  width: '100%',
  height: 400,
  backgroundColor: '#eee',
  position: 'relative',
  overflow: 'hidden',
  lineHeight: '400px',
  textAlign: 'center',
};

const App: React.FC = () => {
  const ref = React.useRef(null);
  return (
    <div style={wrapperStyle} ref={ref}>
      <Image
        width={200}
        preview={{
          getPopupContainer: () => ref.current,
        }}
        src="https://api.emooa.com/aimg?idx=7"
        alt="lamp"
      />
    </div>
  );
};

export default App;
