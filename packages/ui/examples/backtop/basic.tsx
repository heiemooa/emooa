import React, { useRef } from 'react';
import { Backtop } from '@emooa/ui';

const App: React.FC = () => {
  const ref = useRef(null);

  const getRender = () => {
    const elements: JSX.Element[] = [];
    for (let i = 1; i < 50; i++) {
      elements.push(<p key={i}>This is Backtop Content</p>);
    }
    return elements;
  };

  return (
    <div style={{ position: 'relative' }}>
      <Backtop style={{ position: 'absolute' }} target={() => ref.current} />

      <div
        ref={ref}
        style={{
          height: 300,
          overflow: 'auto',
          padding: '8px 12px',
          border: '1px solid #efefef',
          filter: 'revert(100%)',
        }}
      >
        {getRender()}
      </div>
    </div>
  );
};

export default App;
