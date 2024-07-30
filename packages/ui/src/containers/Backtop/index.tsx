import React, { useRef } from 'react';
import Backtop from '../../../components/backtop';

const App = () => {
  const ref = useRef(null);

  const getRender = () => {
    const elements: JSX.Element[] = [];
    for (let i = 1; i < 50; i++) {
      elements.push(<p key={i}>This is Backtop Content</p>);
    }
    return elements;
  };

  return (
    <div style={{ position: 'relative', padding: '8px 12px', background: '#eee', color: '#555' }}>
      <Backtop style={{ position: 'absolute' }} target={() => ref.current} />

      <div ref={ref} style={{ height: 300, overflow: 'auto' }}>
        {getRender()}
      </div>
    </div>
  );
};

export default App;
