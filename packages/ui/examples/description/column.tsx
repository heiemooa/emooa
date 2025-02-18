import React from 'react';
import { Description, Divider } from '@emooa/ui';

const data = [
  {
    label: 'Name',
    value: 'Emooa',
  },
  {
    label: 'Mobile',
    value: '123-1234-1234',
  },
  {
    label: 'Residence',
    value: 'Hangzhou',
  },
  {
    label: 'Hometown',
    value: 'Hangzhou',
  },
  {
    label: 'Address',
    value: 'Qianjiang Road, Shangcheng, Hangzhou',
  },
];

const App: React.FC = () => {
  return (
    <>
      <Description title="User Info" items={data} column={1} />
      <Divider />
      <Description
        title="User Info"
        items={data}
        column={2}
        layout="horizontal"
        colon
        styles={{ label: { textAlign: 'right' } }}
      />
    </>
  );
};

export default App;
