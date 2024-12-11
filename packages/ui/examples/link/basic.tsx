import React from 'react';
import { Space, Link } from '@emooa/ui';
import { IconLink } from '@emooa/icon';

const App: React.FC = () => {
  return (
    <Space direction="vertical">
      <Space>
        <Link href="https://github.com/heiemooa" target="_blank" icon={<IconLink />} />
        <Link href="https://github.com/heiemooa" target="_blank">
          Link
        </Link>
        <Link href="https://github.com/heiemooa" target="_blank" icon={<IconLink />}>
          Link
        </Link>
        <Link href="https://github.com/heiemooa" target="_blank" icon={<IconLink />} disabled>
          Disabled Link
        </Link>
      </Space>
      <Space>
        <Link status="danger" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />} />
        <Link status="danger" href="https://github.com/heiemooa" target="_blank">
          Link
        </Link>
        <Link status="danger" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />}>
          Link
        </Link>
        <Link status="danger" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />} disabled>
          Disabled Link
        </Link>
      </Space>
      <Space>
        <Link status="success" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />} />
        <Link status="success" href="https://github.com/heiemooa" target="_blank">
          Link
        </Link>
        <Link status="success" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />}>
          Link
        </Link>
        <Link status="success" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />} disabled>
          Disabled Link
        </Link>
      </Space>
      <Space>
        <Link status="warning" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />} />
        <Link status="warning" href="https://github.com/heiemooa" target="_blank">
          Link
        </Link>
        <Link status="warning" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />}>
          Link
        </Link>
        <Link status="warning" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />} disabled>
          Disabled Link
        </Link>
      </Space>
    </Space>
  );
};

export default App;
