import React from 'react';
import { Document, Space, Button } from '@emooa/ui';
import { IconLink } from '@emooa/icon';

Document.config({
  home: 'https://docs.emooa.com',
  patterns: [/^https?:\/\/docs\.emooa\.com(?:\/.*)?$/, /^https?:\/\/cloud\.tencent\.com\/document(?:\/.*)?$/],
});

const App: React.FC = () => (
  <Space>
    <Document content={<div>文档内容一</div>}>文档一</Document>
    <Document title="文档二" content={<div>文档内容二</div>}>
      文档二
    </Document>
    <Button href="https://docs.emooa.com/ui/document" type="text" icon={<IconLink />}>
      Document 文档
    </Button>
    <Button href="https://cloud.tencent.com/document" type="text" icon={<IconLink />}>
      腾讯文档
    </Button>
  </Space>
);

export default App;
