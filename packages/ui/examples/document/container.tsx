import React from 'react';
import { Document, Button } from '@emooa/ui';
import { IconLink } from '@emooa/icon';

Document.config({
  getPopupContainer: () => document.getElementById('root'),
  home: 'https://docs.emooa.com',
  patterns: [/^https?:\/\/docs\.emooa\.com(?:\/.*)?$/],
});
const App: React.FC = () => {
  return (
    <Button href="https://docs.emooa.com/ui/document" type="text" icon={<IconLink />}>
      Document 文档
    </Button>
  );
};

export default App;
