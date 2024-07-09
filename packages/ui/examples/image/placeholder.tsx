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
      <Space wrap>
        <Image
          src={`https://api.emooa.com/aimg?idx=3&timestamp=${timestamp}`}
          height={120}
          width={200}
          placeholder={true}
          description="默认占位符"
        />
        <Image
          src={`https://api.emooa.com/aimg?idx=3&timestamp=${timestamp}`}
          placeholder="https://api.emooa.com/aimg?idx=3"
          height={120}
          width={200}
          description="图片占位符"
        />
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
          description="节点占位符"
        />

        <Image
          src={`https://api.emooa.com/aimg?idx=3&timestamp=${timestamp}`}
          placeholder={false}
          height={120}
          width={200}
          description="无占位符"
        />
      </Space>
    </>
  );
};

export default App;
