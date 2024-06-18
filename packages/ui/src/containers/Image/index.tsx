import Button from '@/button';
import Divider from '@/divider';
import Image from '@/image';
import Space from '@/space';
import Theme from '@/_theme';
import { IconDownload, IconEye, IconInfoCircle } from '@emooa/icon';
import React, { useRef, useState } from 'react';

const token = Theme.getToken();
console.log(token);
const wrapperStyle: React.CSSProperties = {
  width: '100%',
  height: 400,
  backgroundColor: '#eee',
  position: 'relative',
  overflow: 'hidden',
  lineHeight: '400px',
  textAlign: 'center',
};

function App() {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

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
          preview={{
            visible,
            onVisibleChange: e => {
              setVisible(false);
            },
          }}
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
      <Divider>Actions</Divider>
      <Image
        width={200}
        src="https://api.emooa.com/aimg?idx=1"
        preview={{
          actions: [
            {
              key: 'download',
              content: <IconDownload />,
              name: 'Download',
            },
            {
              key: 'info',
              content: <IconInfoCircle />,
              name: 'Info',
              getContainer: action => {
                return action;
              },
            },
          ],
          actionsLayout: ['info', 'rotateRight', 'zoomIn', 'zoomOut', 'extra'],
        }}
        alt="lamp"
      />
      <Divider>Popup Container</Divider>
      <div style={wrapperStyle} ref={ref}>
        <Image
          width={200}
          preview={{
            getPopupContainer: () => ref.current,
          }}
          src="https://api.emooa.com/aimg?idx=1"
          alt="lamp"
        />
      </div>
    </>
  );
}

export default App;
