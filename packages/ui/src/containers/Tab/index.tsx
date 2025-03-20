import { IconEdit } from '@emooa/icon';
import { Button, Divider, Tab, TabProps } from '../../../components';

import React, { useState } from 'react';

function App() {
  const [size, setSize] = useState<'mini' | 'small' | 'medium' | 'large'>('mini');
  const [type, setType] = useState<'line' | 'card' | 'card-gutter' | 'capsule'>('line');

  const defaultItems: TabProps['items'] = [
    {
      key: '1',
      label: 'Tab 1',
      icon: <IconEdit />,
      content: 'Content of Tab Pane 1',
      classNames: {
        label: 'label',
        content: 'contentaa',
      },
      styles: {
        content: {
          padding: 10,
        },
      },
    },
    {
      key: '2',
      label: 'Tab 2',
      disabled: true,
      icon: <IconEdit />,
      content: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Tab 3',
      content: 'Content of Tab Pane 3',
    },
  ];

  const [items, setItems] = useState(defaultItems);

  return (
    <>
      <Button.Group>
        <Button onClick={() => setSize('mini')} type={size === 'mini' ? 'primary' : 'secondary'}>
          Mini
        </Button>
        <Button onClick={() => setSize('small')} type={size === 'small' ? 'primary' : 'secondary'}>
          Small
        </Button>
        <Button onClick={() => setSize('medium')} type={size === 'medium' ? 'primary' : 'secondary'}>
          Medium
        </Button>
        <Button onClick={() => setSize('large')} type={size === 'large' ? 'primary' : 'secondary'}>
          Large
        </Button>
      </Button.Group>
      <Divider />
      <Button.Group>
        <Button onClick={() => setType('line')} type={type === 'line' ? 'primary' : 'secondary'}>
          Line
        </Button>
        <Button onClick={() => setType('card')} type={type === 'card' ? 'primary' : 'secondary'}>
          Card
        </Button>
        <Button onClick={() => setType('card-gutter')} type={type === 'card-gutter' ? 'primary' : 'secondary'}>
          Card Gutter
        </Button>
        <Button onClick={() => setType('capsule')} type={type === 'capsule' ? 'primary' : 'secondary'}>
          Capsule
        </Button>
      </Button.Group>
      <Divider />

      <Tab
        type={type}
        editable
        size={size}
        defaultActiveKey="1"
        items={items}
        onDeleteTab={key => setItems(pre => pre.filter(item => item.key !== key))}
        onAddTab={() =>
          setItems(pre => [
            ...pre,
            {
              key: items.length + 1,
              label: `Tab ${items.length + 1}`,
              content: `Content of Tab Pane ${items.length + 1}`,
            },
          ])
        }
        extra={
          <Button size="small" type="secondary">
            Action
          </Button>
        }
      />
    </>
  );
}

export default App;
