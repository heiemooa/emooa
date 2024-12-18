import React from 'react';
import { Divider, ConfigProvider } from '../../../components';

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <span>
        Split text paragraphs in different chapters. The default is a horizontal dividing line, and text can be added in
        the middle.
      </span>
      <Divider />
      {/* <span>
        Split text paragraphs in different chapters. The default is a horizontal dividing line, and text can be added in
        the middle.
      </span>
      <Divider />
      <span>
        Split text paragraphs in different chapters. The default is a horizontal dividing line, and text can be added in
        the middle.
      </span>
      <Divider dashed />
      <span>
        Dashed Line: Split text paragraphs in different chapters. The default is a horizontal dividing line, and text
        can be added in the middle.
      </span> */}
    </ConfigProvider>
  );
};

export default App;
