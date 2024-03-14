import React from 'react';
import { Space, Button } from '@emooa/ui';
import { IconLink } from '@emooa/icon';

const App: React.FC = () => {
  return (
    <Space direction="vertical">
      <Space>
        <Button type="primary" href="https://github.com/heiemooa" target="_blank">
          Link
        </Button>
        <Button type="primary" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />}>
          Link
        </Button>
        <Button type="primary" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />} />
        <Button type="primary" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />} disabled />
      </Space>
      <Space>
        <Button type="primary" status="danger" href="https://github.com/heiemooa" target="_blank">
          Link
        </Button>
        <Button type="primary" status="danger" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />}>
          Link
        </Button>
        <Button type="primary" status="danger" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />} />
        <Button
          type="primary"
          status="danger"
          href="https://github.com/heiemooa"
          target="_blank"
          icon={<IconLink />}
          disabled
        />
      </Space>
      <Space>
        <Button type="text" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />} />
        <Button type="text" href="https://github.com/heiemooa" target="_blank">
          Link
        </Button>
        <Button type="text" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />}>
          Link
        </Button>
        <Button type="text" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />} disabled>
          Disabled Link
        </Button>
      </Space>
      <Space>
        <Button type="text" status="danger" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />} />
        <Button type="text" status="danger" href="https://github.com/heiemooa" target="_blank">
          Link
        </Button>
        <Button type="text" status="danger" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />}>
          Link
        </Button>
        <Button
          type="text"
          status="danger"
          href="https://github.com/heiemooa"
          target="_blank"
          icon={<IconLink />}
          disabled
        >
          Disabled Link
        </Button>
      </Space>
    </Space>
  );
};

export default App;
