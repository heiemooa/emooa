import React, { useState } from 'react';
import { ConfigProvider, Space, Image, Button, Divider, Modal, Drawer } from '@emooa/ui';
import { IconDelete, IconLeft, IconMessage, IconRight, IconSettings, IconStar } from '@emooa/icon';

const ButtonGroup = Button.Group;

const App: React.FC = () => {
  const [rtl, setRtl] = useState(true);
  const [visible, setVisible] = React.useState(false);
  const [visible1, setVisible1] = React.useState(false);

  return (
    <>
      <Space style={{ width: '100%' }}>
        <h4>RTL: {rtl ? '已开启' : '已关闭'}</h4>
        <Button
          type="text"
          onClick={() => {
            setRtl(!rtl);
          }}
        >
          {rtl ? '关闭' : '开启'}
        </Button>
      </Space>
      <Divider />
      <ConfigProvider
        rtl={rtl}
        theme={{
          token: {
            colorPrimary: 'green',
          },
          components: {
            Button: {},
          },
        }}
        components={{
          Space: {
            size: 'medium',
          },
        }}
      >
        <Space style={{ width: '100%' }} wrap>
          <Image src="https://api.emooa.com/aimg?idx=1" height={100} />
          <Image src="https://api.emooa.com/aimg?idx=2" height={100} />
          <Image src="https://api.emooa.com/aimg?idx=3" height={100} />
        </Space>
        <Divider />
        <Space size="large" style={{ width: '100%' }} wrap>
          <ButtonGroup>
            <Button type="primary" icon={<IconLeft />} shape="round" style={{ padding: '0 8px' }}>
              Prev
            </Button>
            <Button type="primary" shape="round" style={{ padding: '0 8px' }}>
              Next
              <IconRight />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button type="primary" icon={<IconStar />} />
            <Button type="primary" icon={<IconMessage />} />
            <Button type="primary" icon={<IconSettings />} />
          </ButtonGroup>
          <ButtonGroup>
            <Button type="dashed" status="danger" icon={<IconDelete />}>
              Delete
            </Button>
            <Button type="primary" status="danger" icon={<IconDelete />}>
              Delete
            </Button>
          </ButtonGroup>

          <Button onClick={() => setVisible(true)} type="primary">
            Open Drawer
          </Button>
        </Space>

        <Drawer
          title={<div>Drawer Title</div>}
          open={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
        >
          <p>
            You can customize modal body text by the current situation. This modal will be closed immediately once you
            press the OK button.
          </p>
          <Button onClick={() => setVisible1(true)} type="primary">
            Open Modal
          </Button>
          <Modal
            center
            title="Modal Title"
            open={visible1}
            onOk={() => setVisible1(false)}
            onCancel={() => setVisible1(false)}
          >
            <p>
              You can customize modal body text by the current situation. This modal will be closed immediately once you
              press the OK button.
            </p>

            <Image height={200} src="https://api.emooa.com/aimg" />
          </Modal>
        </Drawer>
      </ConfigProvider>
    </>
  );
};

export default App;
