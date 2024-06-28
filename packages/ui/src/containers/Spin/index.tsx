import Button from '@/button';
import Image from '@/image';
import Space from '@/space';
import Theme from '@/_theme';
import Spin from '@/spin';

import { IconDownload, IconEye } from '@emooa/icon';
import React, { useState } from 'react';

const token = Theme.getToken();
console.log(token);

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <>
      <Button onClick={() => setLoading(!loading)} style={{ marginBottom: 10 }}>
        Loading: {`${loading}`}
      </Button>
      <Spin tip="loading" loading={loading}>
        <Space direction="horizontal">
          <Image
            height={200}
            width={300}
            src="https://api.emooa.com/aimg?idx=1"
            title="A user’s avatar"
            description="Click me to preview image"
            actions={[
              <Button
                key="1"
                size="small"
                className="image-demo-action-item"
                onClick={e => {
                  console.log('visible');
                }}
                type="text"
                style={{ color: '#fff' }}
                icon={<IconEye />}
              />,
              <Button
                key="2"
                size="small"
                className="image-demo-action-item"
                onClick={e => {
                  console.log('download');
                }}
                style={{ color: '#fff' }}
                type="text"
                icon={<IconDownload />}
              />,
            ]}
          />
          <Image
            height={200}
            width={300}
            src="https://api.emooa.com/aimg?idx=1"
            preview={false}
            title="A user’s avatar"
            actions={[
              <Button
                key="2"
                size="small"
                className="image-demo-action-item"
                onClick={e => {
                  console.log('download');
                }}
                style={{ color: '#fff' }}
                type="text"
                icon={<IconDownload />}
              />,
            ]}
          />
        </Space>
      </Spin>
    </>
  );
}

export default App;
