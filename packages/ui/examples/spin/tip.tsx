import React, { useState } from 'react';
import { Divider, Spin, Image, Button, Space } from '@emooa/ui';
import { IconEye, IconDownload } from '@emooa/icon';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <>
      <Space direction="horizontal">
        <Spin loading={loading}>
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
        </Spin>
        <Spin loading={loading} tip="loading">
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
        </Spin>
      </Space>
    </>
  );
};

export default App;
