import React from 'react';
import { Space, Copy } from '@emooa/ui';
import { IconThumbUpFill, IconCheckCircleFill } from '@emooa/icon';

const App: React.FC = () => {
  return (
    <Space direction="vertical">
      <Copy icon={[<IconThumbUpFill />, <IconCheckCircleFill />]}>Customize icons via Icon.</Copy>
      <Copy icon={[<IconThumbUpFill />]}>Customize icons via Icon.</Copy>
      <Copy icon={[, <IconCheckCircleFill />]}>Customize icons via Icon.</Copy>
    </Space>
  );
};

export default App;
