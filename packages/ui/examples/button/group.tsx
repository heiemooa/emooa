import React from 'react';
import { Button, Space } from '@emooa/ui';
import { IconLeft, IconRight, IconMore, IconStar, IconSettings, IconMessage, IconDown, IconDelete } from '@emooa/icon';

const ButtonGroup = Button.Group;

const App = () => {
  return (
    <Space size="large" direction="vertical">
      <Space size="large">
        <ButtonGroup>
          <Button type="primary">Primary</Button>
          <Button type="primary" icon={<IconDown />} />
        </ButtonGroup>
        <ButtonGroup>
          <Button>Secondary</Button>
          <Button icon={<IconDown />} />
        </ButtonGroup>
        <ButtonGroup>
          <Button type="dashed">Dashed</Button>
          <Button type="dashed" icon={<IconMore />} />
        </ButtonGroup>
        <ButtonGroup>
          <Button type="outline">Outline</Button>
          <Button type="outline" icon={<IconMore />} />
        </ButtonGroup>
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
    </Space>
  );
};

export default App;
