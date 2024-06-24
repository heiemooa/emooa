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
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const ref = useRef();
  const items = [
    'https://api.emooa.com/aimg?idx=1',
    'https://api.emooa.com/aimg?idx=2',
    'https://api.emooa.com/aimg?idx=3',
    'https://api.emooa.com/aimg?idx=4',
  ];
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
                setVisible1(true);
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
            visible: visible1,
            onVisibleChange: e => {
              setVisible1(false);
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
          setVisible2(true);
        }}
      >
        Click me to preview image
      </Button>
      <Image.Preview onVisibleChange={setVisible2} visible={visible2} src="https://api.emooa.com/aimg?idx=1" />
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
            },
          ],
          actionsLayout: ['info', 'rotateRight', 'zoomIn', 'zoomOut', 'extra'],
        }}
        alt="lamp"
      />
      <Divider>Image Preview Group</Divider>
      <Space direction="vertical">
        <Image.PreviewGroup>
          <Space>
            {items.map((src, index) => (
              <Image key={index} src={src} width={200} alt={`lamp${index + 1}`} />
            ))}
          </Space>
        </Image.PreviewGroup>
        <Image.PreviewGroup items={items} visible={visible3} onVisibleChange={setVisible3}>
          <Button
            onClick={() => {
              setVisible3(true);
            }}
          >
            Click me to preview group image
          </Button>
        </Image.PreviewGroup>
      </Space>
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
