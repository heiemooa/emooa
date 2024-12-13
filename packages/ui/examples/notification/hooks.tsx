import React, { createContext } from 'react';
import { Button, Notification, Space } from '@emooa/ui';

const App: React.FC = () => {
  const [notification, contextHolder] = Notification.useNotification();
  const ConfigContext = createContext({});

  const config = {
    title: 'Notification',
    content: <ConfigContext.Consumer>{name => `Current user: ${name}`}</ConfigContext.Consumer>,
  };

  return (
    <ConfigContext.Provider value="Emooa UI">
      <div className="demo-holder-wrapper">
        {/* notification 挂载在此容器内 */}
        {contextHolder}
      </div>
      <Space size="large">
        <Button onClick={() => notification.info?.(config)} type="primary">
          Info
        </Button>
        <Button onClick={() => notification.success?.(config)} type="primary" status="success">
          Success
        </Button>
        <Button onClick={() => notification.warning?.(config)} type="primary" status="warning">
          Warning
        </Button>
        <Button onClick={() => notification.error?.(config)} type="primary" status="danger">
          Error
        </Button>
      </Space>
    </ConfigContext.Provider>
  );
};

export default App;
