import Copy from '@/copy';

import React, { useState } from 'react';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <>
      <Copy hover>bbb</Copy>
      <Copy>aaa</Copy>
      <Copy hover>
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
