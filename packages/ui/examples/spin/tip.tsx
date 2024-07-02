import React, { useState } from 'react';
import { Divider, Spin, Image, Button, Space } from '@emooa/ui';
import { IconEye, IconDownload } from '@emooa/icon';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <>
      <Space direction="horizontal">
        <Spin loading={loading}>
          <div style={{ border: '1px solid #eee', padding: 10, borderRadius: 4, background: '#fefefe' }}>
            <h4>Tip Loading Title</h4>
            <span>Customize the loading copy through the tip field.</span>
          </div>
        </Spin>
        <Spin loading={loading} tip="Loading">
          <div style={{ border: '1px solid #eee', padding: 10, borderRadius: 4, background: '#fefefe' }}>
            <h4>Tip Loading Title</h4>
            <span>Customize the loading copy through the tip field.</span>
          </div>
        </Spin>
      </Space>
    </>
  );
};

export default App;
