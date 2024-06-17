import Button from '@/button';
import Divider from '@/divider';
import Image from '@/image';
import Space from '@/space';
import { IconDownload, IconEye, IconMore } from '@emooa/icon';
import React, { useState } from 'react';

function App() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Divider>Image</Divider>
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
      <Divider>Image.Priview</Divider>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        Click me to preview image
      </Button>
      <Image.Preview onVisibleChange={setVisible} visible={visible} src="https://api.emooa.com/aimg?idx=1" />
    </>
  );
}

export default App;
