import React from 'react';
import { Divider, Theme } from '@emooa/ui';

const App: React.FC = () => {
  return (
    <>
      <span>
        Split text paragraphs in different chapters. The default is a horizontal dividing line, and text can be added in
        the middle.
      </span>
      <Divider color="green">Green</Divider>
      <span>
        Split text paragraphs in different chapters. The default is a horizontal dividing line, and text can be added in
        the middle.
      </span>
      <Divider color="orange">Orange</Divider>
      <span>
        Split text paragraphs in different chapters. The default is a horizontal dividing line, and text can be added in
        the middle.
      </span>
      <Divider dashed color="red">
        Red
      </Divider>
      <span>
        Dashed Line: Split text paragraphs in different chapters. The default is a horizontal dividing line, and text
        can be added in the middle.
      </span>
    </>
  );
};

export default App;
