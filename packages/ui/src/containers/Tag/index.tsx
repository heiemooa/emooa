import { Tag, Space } from '../../../components';

import { IconAlignCenter, IconCheckCircleFill } from '@emooa/icon';

import React from 'react';

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

function App() {
  return (
    <Space direction="vertical">
      <Space size="large">
        <Tag>Default</Tag>
        <Tag>Tag 1</Tag>
        <Tag>Tag 2</Tag>
        <Tag icon={<IconCheckCircleFill />}>Complete</Tag>
      </Space>
      <Space size="large">
        <Tag
          size="large"
          closable
          onClose={() => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                if (Math.random() >= 0.5) {
                  resolve('');
                } else {
                  reject();
                }
              }, 3000);
            });
          }}
        >
          Large
        </Tag>
        <Tag size="medium" closable>
          Medium
        </Tag>
        <Tag size="small" closable>
          small
        </Tag>
        <Tag size="mini" closable>
          mini
        </Tag>
      </Space>
      <Space wrap>
        {COLORS.map((color, i) => (
          <Tag key={i} color={color} bordered closable icon={<IconCheckCircleFill />}>
            {color}
          </Tag>
        ))}
      </Space>
      <Space>
        {COLORS.map((color, i) => (
          <Tag key={i} color={color} bordered={false} closable icon={<IconCheckCircleFill />}>
            {color}
          </Tag>
        ))}
      </Space>
      <Space>
        {COLORS_CUSTOM.map((color, i) => (
          <Tag
            key={i}
            closable
            color={color}
            onClose={() => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (Math.random() >= 0.5) {
                    resolve('');
                  } else {
                    reject();
                  }
                }, 30000);
              });
            }}
          >
            {color}
          </Tag>
        ))}
      </Space>
      <Space>
        {COLORS.map((color, i) => (
          <Tag
            key={i}
            checkable
            color={color}
            bordered={false}
            closable
            icon={<IconCheckCircleFill />}
            onClose={() => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (Math.random() >= 0.5) {
                    resolve('');
                  } else {
                    reject();
                  }
                }, 3000);
              });
            }}
          >
            {color}
          </Tag>
        ))}
      </Space>
      <Space>
        {COLORS_CUSTOM.map((color, i) => (
          <Tag
            key={i}
            checkable
            closable
            color={color}
            closeIcon={<IconAlignCenter />}
            onClose={() => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (Math.random() >= 0.5) {
                    resolve('');
                  } else {
                    reject();
                  }
                }, 3000);
              });
            }}
          >
            {color}
          </Tag>
        ))}
      </Space>
      <Space size="large">
        <Tag checkable>Awesome</Tag>
        <Tag checkable color="red" defaultChecked>
          Toutiao
        </Tag>
        <Tag checkable color="green">
          Lark
        </Tag>
        <Tag checkable color="#123456">
          Lark
        </Tag>
      </Space>
    </Space>
  );
}

export default App;
