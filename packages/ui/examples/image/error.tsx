import React from 'react';
import { Image, Space } from '@emooa/ui';
import { IconFileImage } from '@emooa/icon';

const App: React.FC = () => (
  <Space wrap>
    <Image src="xx" width={300} height={200} alt="loading failed displays the image failure placeholder." />
    <Image
      src="xx"
      width={300}
      height={200}
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
);

export default App;
