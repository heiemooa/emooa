import React from 'react';
import { Document } from '../../../components';

const App: React.FC = () => {
  return (
    <>
      <a href="https://docs.emooa.com">Go to AAA Page 1</a>
      <br />
      <a href="https://cloud.tencent.com/document/product/213/43703">Go to AAA Page 2</a>
      <br />
      <a href="https://cloud.tencent.com/document">Go to AAA Page 2</a>
      <Document
        home="https://cloud.tencent.com/document"
        patterns={[/^https?:\/\/docs\.emooa\.com(?:\/.*)?$/, /^https?:\/\/cloud\.tencent\.com\/document(?:\/.*)?$/]}
      ></Document>
    </>
  );
};

export default App;
