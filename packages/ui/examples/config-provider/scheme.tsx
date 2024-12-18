import React, { useState } from 'react';
import {
  ConfigProvider,
  Space,
  Button,
  Divider,
  Image,
  Notification,
  Message,
  App as A,
  Modal,
  Drawer,
} from '@emooa/ui';
import { IconLoading } from '@emooa/icon';

const App: React.FC = () => {
  const [scheme, setScheme] = useState<'light' | 'dark'>('light');
  const [timestamp, setTimestamp] = React.useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <ConfigProvider scheme={scheme}>
        <Button.Group>
          <Button onClick={() => setScheme('dark')} type={scheme === 'dark' ? 'primary' : 'secondary'}>
            Dark
          </Button>
          <Button onClick={() => setScheme('light')} type={scheme === 'light' ? 'primary' : 'secondary'}>
            Light
          </Button>
        </Button.Group>
        <Divider>Button</Divider>
        <Space direction="vertical">
          <Space>
            <Button type="primary">Primary</Button>
            <Button>Secondary</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="outline">Outline</Button>
            <Button type="text">Text</Button>
          </Space>
          <Space>
            <Button type="primary" status="danger">
              Primary
            </Button>
            <Button status="danger">Secondary</Button>
            <Button type="dashed" status="danger">
              Dashed
            </Button>
            <Button type="outline" status="danger">
              Outline
            </Button>
            <Button type="text" status="danger">
              Text
            </Button>
          </Space>
          <Space>
            <Button type="primary" status="success">
              Primary
            </Button>
            <Button status="success">Secondary</Button>
            <Button type="dashed" status="success">
              Dashed
            </Button>
            <Button type="outline" status="success">
              Outline
            </Button>
            <Button type="text" status="success">
              Text
            </Button>
          </Space>
          <Space>
            <Button type="primary" status="warning">
              Primary
            </Button>
            <Button status="warning">Secondary</Button>
            <Button type="dashed" status="warning">
              Dashed
            </Button>
            <Button type="outline" status="warning">
              Outline
            </Button>
            <Button type="text" status="warning">
              Text
            </Button>
          </Space>
        </Space>
        <Divider>Image</Divider>
        <Space direction="vertical">
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
          </Space>
        </Space>
        <Divider>Drawer</Divider>
        <Button type="primary" onClick={() => setIsDrawerOpen(true)}>
          Drawer
        </Button>
        <Drawer
          title="Title"
          open={isDrawerOpen}
          onOk={() => setIsDrawerOpen(false)}
          onCancel={() => setIsDrawerOpen(false)}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
        <A>
          <MyPage />
        </A>
      </ConfigProvider>
    </>
  );
};

const MyPage: React.FC = () => {
  const { modal, message, notification } = A.useApp();

  return (
    <>
      <Divider>Modal & Notification & Message</Divider>
      <Space direction="vertical">
        <Space>
          <Button
            type="primary"
            onClick={() =>
              Modal.info({
                title: 'Modal',
                content: 'This is a modal',
              })
            }
          >
            Modal
          </Button>
          <Button
            type="primary"
            onClick={() =>
              Notification.info({
                title: 'Notification',
                content: 'This is a notification',
              })
            }
          >
            Notification
          </Button>
          <Button type="primary" onClick={() => Message.info('This is a message')}>
            Message
          </Button>
        </Space>
        <Space>
          <Button
            type="primary"
            onClick={() =>
              modal.info({
                title: 'Modal',
                content: 'This is a modal',
              })
            }
          >
            Modal Hook
          </Button>
          <Button
            type="primary"
            onClick={() =>
              notification.info({
                title: 'Notification',
                content: 'This is a notification',
              })
            }
          >
            Notification Hook
          </Button>
          <Button type="primary" onClick={() => message.info('This is a message')}>
            Message Hook
          </Button>
        </Space>
      </Space>
    </>
  );
};

export default App;
