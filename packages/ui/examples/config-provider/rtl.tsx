import React, { useState } from 'react';
import { ConfigProvider, Space, Image, Button } from '@emooa/ui';
import { IconSettings } from '@emooa/icon';

const ButtonGroup = Button.Group;

const App: React.FC = () => {
  const [rtl, setRtl] = useState(true);

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
      <ConfigProvider rtl={rtl}>
        <Space style={{ width: '100%' }}>
          <Image src="https://api.emooa.com/aimg?idx=1" height={100} />
          <Image src="https://api.emooa.com/aimg?idx=2" height={100} />
          <Image src="https://api.emooa.com/aimg?idx=3" height={100} />
        </Space>
        <Space size="large">
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
        </Space>
        <Space style={{ width: '100%' }}>
          <Button icon={<IconSettings />}>设置</Button>
        </Space>
      </ConfigProvider>
    </>
  );
};

export default App;
