import React from 'react';
import { Divider } from '@emooa/ui';

const App: React.FC = () => {
  return (
    <>
      <span>
        Split text paragraphs in different chapters. The default is a horizontal dividing line, and text can be added in
        the middle.
      </span>
      <Divider orientation="left">Text Left</Divider>
      <span>
        Split text paragraphs in different chapters. The default is a horizontal dividing line, and text can be added in
        the middle.
      </span>
      <Divider>Text Center</Divider>
      <span>
        Split text paragraphs in different chapters. The default is a horizontal dividing line, and text can be added in
        the middle.
      </span>
      <Divider orientation="right">Text Right</Divider>
    </>
  );
};

export default App;
