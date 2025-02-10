import React from 'react';
import { Divider, Space, Tag } from '@emooa/ui';

const COLORS = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
  'gray',
];

const App: React.FC = () => {
  return (
    <Space direction="vertical">
      <Space wrap>
        <Tag key={-1} bordered>
          Default
        </Tag>
        {COLORS.map((color, i) => (
          <Tag key={i} color={color} bordered>
            {color}
          </Tag>
        ))}
      </Space>
    </Space>
  );
};

export default App;
