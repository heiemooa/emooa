import React from 'react';
import { Modal, Button, Space } from '@emooa/ui';

const App: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  return (
    <Space wrap>
      <Button onClick={() => setOpen(true)} type="primary">
        Customized button props
      </Button>
      <Modal
        title="Customized button props"
        open={open}
        okButtonProps={{
          disabled: true,
        }}
        cancelButtonProps={{
          disabled: true,
        }}
        onCancel={() => {
          setOpen(false);
        }}
        onOk={() => {
          setOpen(false);
        }}
      >
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
      </Modal>

      <Button
        onClick={() => {
          setOpen1(true);
        }}
        type="primary"
      >
        Customized footer
      </Button>
      <Modal
        title="Customized footer"
        open={open1}
        footer={
          <>
            <Button
              onClick={() => {
                setOpen1(false);
              }}
            >
              Return
            </Button>
            <Button
              loading={loading}
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  setOpen1(false);
                }, 1500);
              }}
              type="primary"
            >
              Submit
            </Button>
          </>
        }
        onCancel={() => {
          setOpen1(false);
        }}
      >
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
      </Modal>
      <Button
        onClick={() => {
          setOpen3(true);
        }}
        type="primary"
      >
        Customized footer function
      </Button>
      <Modal
        title="Customized footer function"
        open={open3}
        footer={(cancelButtonNode, okButtonNode) => (
          <>
            {cancelButtonNode}
            <Button status="danger">自定义按钮</Button>
            {okButtonNode}
          </>
        )}
        onCancel={() => {
          setOpen3(false);
        }}
        okButtonProps={{
          loading: loading,
        }}
        onOk={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setOpen3(false);
          }, 1500);
        }}
      >
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
      </Modal>

      <Button
        onClick={() => {
          setOpen2(true);
        }}
        type="primary"
      >
        Without footer
      </Button>
      <Modal
        title="Without footer"
        open={open2}
        footer={null}
        onCancel={() => {
          setOpen2(false);
        }}
      >
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
      </Modal>
    </Space>
  );
};

export default App;
