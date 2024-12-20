import Copy from '@/copy';
import { IconAlignCenter } from '@emooa/icon';

import React, { useState } from 'react';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <>
      <Copy
        hover
        icon={[<IconAlignCenter />]}
        text={() =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve('aaaaaa');
            }, 3000);
          })
        }
      >
        bbb
      </Copy>
      <Copy hover>bbb</Copy>
      <Copy>aaa</Copy>
      <Copy hover icon={[, <IconAlignCenter />]}>
        <div>ccc div</div>
      </Copy>
      <Copy>
        <div>
          <p>ddd div</p>
          <p>ddd div</p>
          <p>ddd div</p>
        </div>
      </Copy>
      <Copy hover>
        <div>
          <p>ddd div</p>
          <p>ddd div</p>
          <p>ddd div</p>
        </div>
      </Copy>
    </>
  );
}

export default App;
