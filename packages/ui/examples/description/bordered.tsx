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
      <Description layout="horizontal" title="Horizontal" data={data} bordered />
      <Divider />
      <Description layout="vertical" title="Vertical" data={data} bordered />
      <Divider />
      <Description layout="inline-horizontal" title="Inline Horizontal" data={data} bordered />
      <Divider />
      <Description layout="inline-vertical" title="Inline Vertical" data={data} bordered />
    </>
  );
};

export default App;
