import React from 'react';
import { Drawer, Button, Space } from '@emooa/ui';

const App: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  return (
    <Space wrap>
      <Button onClick={() => setOpen(true)} type="primary">
        Customized button props
      </Button>
      <Drawer
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
      </Drawer>

      <Button
        onClick={() => {
          setOpen1(true);
        }}
        type="primary"
      >
        Customized footer
      </Button>
      <Drawer
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
      </Drawer>
      <Button
        onClick={() => {
          setOpen3(true);
        }}
        type="primary"
      >
        Customized footer function
      </Button>
      <Drawer
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
        onOk={() =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve({});
              setOpen3(false);
            }, 1500);
          })
        }
      >
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
      </Drawer>

      <Button
        onClick={() => {
          setOpen2(true);
        }}
        type="primary"
      >
        Without footer
      </Button>
      <Drawer
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
      </Drawer>
      <Button
        onClick={() => {
          setOpen4(true);
        }}
        type="primary"
      >
        Without header
      </Button>
      <Drawer
        open={open4}
        onCancel={() => {
          setOpen4(false);
        }}
      >
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
      </Drawer>
    </Space>
  );
};

export default App;
