import Button from '@/button';
import Divider from '@/divider';
import Image from '@/image';
import React, { useState } from 'react';

function App() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Divider>Image</Divider>
      <Image height={120} width={200} src="https://api.emooa.com/aimg?idx=1" />
      <Divider>Image.Priview</Divider>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        Click me to preview image
      </Button>
      <Image.Preview onVisibleChange={setVisible} visible={visible} src="https://api.emooa.com/aimg?idx=1" />
    </>
  );
}

export default App;
