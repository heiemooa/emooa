import { Description, DescriptionProps, Divider, Space } from '../../../components';

import React from 'react';

function App() {
  const data: DescriptionProps['items'] = [
    {
      label: 'Name',
      value: 'Socrates',
      classNames: {
        label: 'a',
        value: 'b',
      },
    },
    {
      label: 'Mobile',
      value: '123-1234-1234',
    },
    {
      label: 'Residence',
      value: 'Beijing',
    },
    {
      label: 'Hometown',
      value: 'Beijing',
    },
    {
      label: 'Address',
      value: 'Yingdu Building, Zhichun Road, Beijing',
    },
  ];

  return (
    <>
      <Description
        layout="horizontal"
        title="horizontal mini"
        items={data}
        size="mini"
        bordered
        styles={{ label: { textAlign: 'right' } }}
      />
      <Divider />
      <Description layout="vertical" title="vertical small" items={data} size="small" bordered />
      <Divider />
      <Description layout="inline-horizontal" title="inline-horizontal medium" items={data} size="medium" bordered />
      <Divider />
      <Description layout="inline-vertical" title="inline-vertical large" items={data} size="large" bordered />
      <Description
        layout="horizontal"
        title="horizontal mini"
        items={data}
        size="mini"
        styles={{ label: { textAlign: 'right' } }}
      />
      <Divider />
      <Description layout="vertical" title="vertical small" items={data} size="small" />
      <Divider />
      <Description layout="inline-horizontal" title="inline-horizontal medium" items={data} size="medium" />
      <Divider />
      <Description layout="inline-vertical" title="inline-vertical large" items={data} size="large" />
    </>
  );
}

export default App;
