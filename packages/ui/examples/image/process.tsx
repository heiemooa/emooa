import React from 'react';
import { Image } from '@emooa/ui';

const App: React.FC = () => (
  <Image src="https://api.emooa.com/aimg?idx=4" options={{ rootMargin: '100px 0px 0px 0px' }} height={150} />
);

export default App;
