import React, { useState } from 'react';
import { Button, Modal, Space } from '@emooa/ui';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Space>
      <Button type="primary" onClick={showModal}>
        Class Text
      </Button>
      <Modal
        title="Modal Title"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="保存"
        cancelText="关闭"
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Button
        type="primary"
        onClick={() => {
          Modal.confirm({
            title: 'Modal Title',
            content: 'You can customize button text.',
            okText: '保存',
            cancelText: '关闭',
          });
        }}
      >
        Function Text
      </Button>
    </Space>
  );
};

export default App;
