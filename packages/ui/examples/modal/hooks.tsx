import { createContext } from 'react';
import { Modal, Button, Space } from '@emooa/ui';
import React from 'react';

const ConfigContext = createContext({});

const App: React.FC = () => {
  const [modal, contextHolder] = Modal.useModal();

  const config = {
    title: 'Hooks Modal',
    content: <ConfigContext.Consumer>{name => `Current user: ${name}`}</ConfigContext.Consumer>,
  };

  return (
    <ConfigContext.Provider value="Emooa useModal">
      {contextHolder}
      <Space wrap>
        <Button onClick={() => modal.confirm(config)} status="warning">
          Confirm
        </Button>
        <Button onClick={() => modal.info(config)} type="primary">
          Info
        </Button>
        <Button onClick={() => modal.success(config)} type="primary" status="success">
          Success
        </Button>
        <Button onClick={() => modal.warning(config)} type="primary" status="warning">
          Warning
        </Button>
        <Button onClick={() => modal.error(config)} type="primary" status="danger">
          Error
        </Button>
        <Button onClick={() => Modal.confirm(config)} status="danger">
          Can't get context
        </Button>
      </Space>
    </ConfigContext.Provider>
  );
};

export default App;
