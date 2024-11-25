import Button from '@/button';
import Divider from '@/divider';
import Image from '@/image';
import Space from '@/space';
import Theme from '@/_theme';
import Spin from '@/spin';

import { IconDownload, IconEye, IconFileImage, IconInfoCircle, IconLoading } from '@emooa/icon';
import React, { useRef, useState } from 'react';

const token = Theme.getToken();
console.log(token);
const wrapperStyle: React.CSSProperties = {
  width: '100%',
  height: 400,
  paddingTop: 200,
  backgroundColor: '#eee',
  position: 'relative',
  overflow: 'hidden',
  textAlign: 'center',
};

function App() {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const items = [
    'https://api.emooa.com/aimg?idx=1',
    'https://api.emooa.com/aimg?idx=2',
    'https://api.emooa.com/aimg?idx=3',
    'https://api.emooa.com/aimg?idx=4',
  ];
  const [timestamp, setTimestamp] = React.useState(0);

  return (
    <>
      <Button type="primary" onClick={() => setTimestamp(Date.now())}>
        Reload
      </Button>
      <Space wrap>
        <Image
          motion
          src={`https://api.emooa.com/aimg?idx=3&timestamp=${timestamp}`}
          height={120}
          width={200}
          placeholder={true}
          description="默认占位符"
        />
        <Image
          motion
          content="a"
          src={`https://api.emooa.com/aimg?idx=3&timestamp=${timestamp}`}
          placeholder="https://api.emooa.com/aimg?idx=3"
          height={120}
          width={200}
          description="图片占位符"
        />
        <Image
          motion
          src={`https://api.emooa.com/aimg?idx=3&timestamp=${timestamp}`}
          placeholder={
            <div className="eui-image-loader-spin">
              <IconLoading />
              <p>加载中..</p>
            </div>
          }
          height={120}
          width={200}
          description="节点占位符"
        />

        <Image
          motion
          src={`https://api.emooa.com/aimg?idx=3&timestamp=${timestamp}`}
          placeholder={false}
          height={120}
          width={200}
          description="无占位符"
        />
      </Space>
      <Space>
        <Image
          // component="点击加载"
          src="error"
          width={300}
          height={200}
          alt="loading failed displays the image failure placeholder."
        />
        <Image
          src="error"
          width={300}
          height={200}
          component="点击加载"
          error={
            <>
              <div className="eui-image-error-icon">
                <IconFileImage />
              </div>
              <span>图片加载出错了</span>
            </>
          }
        />
      </Space>
      <Spin tip="loading">
        <Divider>Image</Divider>
        <Space direction="horizontal">
          <Image
            height={200}
            width={300}
            component="点击加载"
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
            component="点击加载"
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
        height={150}
        src="https://api.emooa.com/aimg?idx=1"
        motion
        component="点击加载"
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
              <Image component="点击加载" key={index} src={src} height={150} width={200} alt={`lamp${index + 1}`} />
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
          component="点击加载"
          width={200}
          height={150}
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
