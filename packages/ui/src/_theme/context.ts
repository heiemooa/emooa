import React from 'react';
import type { EuiTokenProviderProps } from './interface';
import defaultDerivative from './themes/default';
import seedToken from './themes/seed';
import createTheme from '@/_cssinjs/theme/createTheme';

export const defaultTheme = createTheme(defaultDerivative);

// ================================ Context =================================
// To ensure snapshot stable. We disable hashed in test env.
export const DefaultConfigThemeProvider: EuiTokenProviderProps = {
  token: seedToken,
  theme: defaultTheme,
  override: { override: seedToken },
  hashed: true,
};

export const EuiTokenContext = React.createContext<EuiTokenProviderProps>(DefaultConfigThemeProvider);
