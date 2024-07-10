import React from 'react';
import { AppConfig, useAppProps } from './interface';

export const AppConfigContext = React.createContext<AppConfig>({});

const AppContext = React.createContext<useAppProps>({
  modal: {},
});

export default AppContext;
