import React from 'react';
import { Document, Space, Button } from '@emooa/ui';
import { IconLaunch, IconLink } from '@emooa/icon';

Document.config({
  home: 'https://docs.emooa.com',
  patterns: [/^https?:\/\/docs\.emooa\.com(?:\/.*)?$/, /^https?:\/\/cloud\.tencent\.com\/document(?:\/.*)?$/],
});
const App: React.FC = () => {
  return (
    <>
      <Space direction="vertical">
        <Space size={40} style={{ marginLeft: 16 }} wrap>
          A 标签：
          <a href="https://docs.emooa.com/ui/document" target="_blank">
            <IconLink style={{ marginRight: 8 }} />
            Document 文档
          </a>
          <a href="https://cloud.tencent.com/document" target="_blank">
            <IconLink style={{ marginRight: 8 }} />
            腾讯文档
          </a>
          <a href="https://docs.emooa.com/ui/document" target="_blank" aria-label="not-document">
            直接打开链接
            <IconLaunch style={{ marginLeft: 8 }} />
          </a>
        </Space>

        <Space wrap>
          Button 按钮：
          <Button href="https://docs.emooa.com/ui/document" type="text" icon={<IconLink />}>
            Document 文档
          </Button>
          <Button href="https://cloud.tencent.com/document" type="text" icon={<IconLink />}>
            腾讯文档
          </Button>
          <Button
            href="https://docs.emooa.com/ui/document"
            type="text"
            target="_blank"
            anchorProps={{
              'aria-label': 'not-document',
            }}
          >
            直接打开链接
            <IconLaunch />
          </Button>
        </Space>
      </Space>
    </>
  );
};

export default App;
