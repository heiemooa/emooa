import React from 'react';
import { Space, Image } from '@emooa/ui';

const App: React.FC = () => (
  <Space direction="vertical">
    <Image src="https://api.emooa.com/aimg?idx=1" height={100} />
    <Image src="https://api.emooa.com/aimg?idx=2" height={100} />
    <Image src="https://api.emooa.com/aimg?idx=3" height={100} />
  </Space>
);

export default App;
