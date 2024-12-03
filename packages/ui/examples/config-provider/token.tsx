import React from 'react';
import { ConfigProvider, Theme } from '@emooa/ui';

const { useToken, getToken } = Theme;
const theme = {
  token: {
    colorPrimary: '#123456',
  },
};

console.log('getToken', getToken(theme));
const App = () => {
  const { token } = useToken();
  console.log('useToken', token);
  return null;
};

const Demo: React.FC = () => {
  return (
    <>
      <ConfigProvider theme={theme}>
        <App />
      </ConfigProvider>
    </>
  );
};

export default Demo;
