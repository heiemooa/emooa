import React, { useState } from 'react';
import { Image, Button } from '@emooa/ui';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const srcList = [
    'https://api.emooa.com/aimg?idx=1',
    'https://api.emooa.com/aimg?idx=2',
    'https://api.emooa.com/aimg?idx=3',
    'https://api.emooa.com/aimg?idx=4',
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Click me to preview group image
      </Button>
      <Image.PreviewGroup srcList={srcList} visible={visible} onVisibleChange={setVisible} />
    </>
  );
};

export default App;
