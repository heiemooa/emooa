import React, { createContext } from 'react';
import { Button, Message, Space } from '@emooa/ui';

const App: React.FC = () => {
  const [message, contextHolder] = Message.useMessage();
  const ConfigContext = createContext({});

  const config = {
    content: <ConfigContext.Consumer>{name => `Current user: ${name}`}</ConfigContext.Consumer>,
  };

  return (
    <ConfigContext.Provider value="Emooa UI">
      <div className="demo-holder-wrapper">
        {/* message 挂载在此容器内 */}
        {contextHolder}
      </div>
      <Space size="large">
        <Button onClick={() => message.info?.(config)} type="primary">
          Info
        </Button>
        <Button onClick={() => message.success?.(config)} type="primary" status="success">
          Success
        </Button>
        <Button onClick={() => message.warning?.(config)} type="primary" status="warning">
          Warning
        </Button>
        <Button onClick={() => message.error?.(config)} type="primary" status="danger">
          Error
        </Button>
      </Space>
    </ConfigContext.Provider>
  );
};

export default App;
