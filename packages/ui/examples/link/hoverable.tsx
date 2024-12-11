import React from 'react';
import { Space, Link } from '@emooa/ui';
import { IconLink } from '@emooa/icon';

const App: React.FC = () => {
  return (
    <Space>
      <Link href="https://github.com/heiemooa" target="_blank" hoverable={false}>
        Link
      </Link>
      <Link status="danger" href="https://github.com/heiemooa" target="_blank" hoverable={false}>
        Link
      </Link>
      <Link status="success" href="https://github.com/heiemooa" target="_blank" hoverable={false}>
        Link
      </Link>
      <Link status="warning" href="https://github.com/heiemooa" target="_blank" hoverable={false}>
        Link
      </Link>
    </Space>
  );
};

export default App;
