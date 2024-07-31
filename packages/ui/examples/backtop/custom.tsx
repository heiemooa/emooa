import React, { useRef } from 'react';
import { Backtop, Button } from '@emooa/ui';

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
      <Backtop style={{ position: 'absolute' }} target={() => ref.current}>
        <Button type="primary" style={{ paddingInline: 8 }}>
          UP
        </Button>
      </Backtop>

      <div
        ref={ref}
        style={{ height: 300, overflow: 'auto', padding: '8px 12px', background: '#efefef', color: '#555' }}
      >
        {getRender()}
      </div>
    </div>
  );
};

export default App;
