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

const COLORS_CUSTOM = [
  '#f53f3f',
  '#7816ff',
  '#00b42a',
  '#165dff',
  '#ff7d00',
  '#eb0aa4',
  '#7bc616',
  '#86909c',
  '#b71de8',
  '#0fc6c2',
  '#ffb400',
  '#168cff',
  '#ff5722',
];

const App: React.FC = () => {
  return (
    <Space direction="vertical">
      <Divider orientation="left">Preset Color</Divider>
      <Space wrap>
        {COLORS.map((color, i) => (
          <Tag key={i} color={color}>
            {color}
          </Tag>
        ))}
      </Space>
      <Divider orientation="left">Custom Color</Divider>
      <Space wrap>
        {COLORS_CUSTOM.map((color, i) => (
          <Tag key={i} color={color} closable>
            {color}
          </Tag>
        ))}
      </Space>
    </Space>
  );
};

export default App;
