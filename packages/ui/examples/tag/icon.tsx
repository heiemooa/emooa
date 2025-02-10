import React from 'react';
import { Space, Tag } from '@emooa/ui';
import { IconFacebook, IconGithub, IconTwitter, IconYoutube } from '@emooa/icon';

const App: React.FC = () => {
  return (
    <Space direction="vertical">
      <Space>
        <Tag color="gray" icon={<IconGithub />} bordered={false}>
          Github
        </Tag>
        <Tag color="red" icon={<IconYoutube />} bordered={false}>
          Youtube
        </Tag>
        <Tag color="sky" icon={<IconTwitter />} bordered={false}>
          Twitter
        </Tag>
        <Tag color="blue" icon={<IconFacebook />} bordered={false}>
          Facebook
        </Tag>
      </Space>
      <Space>
        <Tag icon={<IconTwitter />} color="#333">
          Github
        </Tag>
        <Tag icon={<IconYoutube />} color="#cd201f">
          Youtube
        </Tag>
        <Tag icon={<IconTwitter />} color="#55acee">
          Twitter
        </Tag>
        <Tag icon={<IconFacebook />} color="#3b5999">
          Facebook
        </Tag>
      </Space>
    </Space>
  );
};

export default App;
