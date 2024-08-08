import { useState, useRef } from 'react';
import { Drawer, Button } from '@emooa/ui';
import React from 'react';

const wrapperStyle: React.CSSProperties = {
  width: '100%',
  height: 300,
  backgroundColor: '#efefef',
  position: 'relative',
  overflow: 'hidden',
  lineHeight: '300px',
  textAlign: 'center',
  border: '1px solid #eee',
};

function App() {
  const [visible, setVisible] = useState(false);
  const refWrapper = useRef<HTMLDivElement>(null);

  return (
    <div ref={refWrapper} style={wrapperStyle}>
      <Button type="primary" onClick={() => setVisible(true)}>
        Open
      </Button>
      <Drawer
        title="Basic"
        open={visible}
        getPopupContainer={() => refWrapper?.current}
        footer={null}
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <div style={{ textAlign: 'left' }}>Here is an example text.</div>
      </Drawer>
    </div>
  );
}

export default App;
