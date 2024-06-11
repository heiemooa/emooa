import React from 'react';
import { Button, Divider, Image, Space } from '@emooa/ui';
import { IconFileImage } from '@emooa/icon';

const App: React.FC = () => {
  const [timestamp, setTimestamp] = React.useState(0);

  return (
    <>
      <Button type="primary" onClick={() => setTimestamp(Date.now())}>
        Reload
      </Button>
      <Divider />
      <Space>
        <div style={{ textAlign: 'center' }}>
          <Image
            src={`https://api.emooa.com/aimg?idx=3&timestamp=${timestamp}`}
            height={120}
            width={200}
            placeholder={true}
          />
          <p>默认占位符</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Image
            src={`https://api.emooa.com/aimg?idx=3&timestamp=${timestamp}`}
            placeholder="https://api.emooa.com/aimg?idx=3"
            height={120}
            width={200}
          />
          <p>图片占位符</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Image
            src={`https://api.emooa.com/aimg?idx=3&timestamp=${timestamp}`}
            placeholder={
              <div className="eui-image-loader-spin">
                <IconFileImage />
                <p>加载</p>
              </div>
            }
            height={120}
            width={200}
          />
          <p>节点占位符</p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Image
            src={`https://api.emooa.com/aimg?idx=3&timestamp=${timestamp}`}
            placeholder={false}
            height={120}
            width={200}
          />
          <p>无占位符</p>
        </div>
      </Space>
    </>
  );
};

export default App;
