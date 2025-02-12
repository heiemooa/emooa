import React, { useState } from 'react';
import { Spin, Button, Space } from '@emooa/ui';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <>
      <Button onClick={() => setLoading(!loading)} style={{ marginBottom: 10 }}>
        Loading: {`${loading}`}
      </Button>
      <br />
      <Space direction="horizontal">
        <Spin loading={loading} delay={300} tip="delay 300">
          <div style={{ border: '1px solid #eee', padding: 10, borderRadius: 4 }}>
            <h4>Delay Loading Title</h4>
            <span>
              Delayed display of loading through delay, anti-shake processing of state switching, effectively avoiding
              rapid state switching The screen flashes.
            </span>
          </div>
        </Spin>
        <Spin loading={loading} tip="no delay">
          <div style={{ border: '1px solid #eee', padding: 10, borderRadius: 4 }}>
            <h4>Delay Loading Title</h4>
            <span>
              Delayed display of loading through delay, anti-shake processing of state switching, effectively avoiding
              rapid state switching The screen flashes.
            </span>
          </div>
        </Spin>
      </Space>
    </>
  );
};

export default App;
