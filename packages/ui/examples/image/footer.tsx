import { IconDownload, IconEye } from '@emooa/icon';
import React, { useState } from 'react';
import { Space, Image, Button } from '@emooa/ui';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Space direction="horizontal">
      <Image
        height={200}
        src="https://api.emooa.com/aimg?idx=4"
        title="A user’s avatar"
        description="Click me to preview image"
        actions={[
          <Button
            key="1"
            size="small"
            className="image-demo-action-item"
            onClick={e => {
              setVisible(true);
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
        preview={{
          visible,
          onVisibleChange: e => {
            setVisible(false);
          },
        }}
      />
      <Image
        height={200}
        src="https://api.emooa.com/aimg?idx=4"
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
  );
};

export default App;
