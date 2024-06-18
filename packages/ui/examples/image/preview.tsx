import React, { useState } from 'react';
import { Image, Button } from '@emooa/ui';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setVisible(true);
        }}
        type="primary"
      >
        Click me to preview image
      </Button>
      <Image.Preview onVisibleChange={setVisible} visible={visible} src="https://api.emooa.com/aimg?idx=6" />
    </>
  );
};

export default App;
