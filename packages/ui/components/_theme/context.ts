import React from 'react';
import type { EuiTokenProviderProps } from './interface';
import defaultDerivative from './themes/default';
import darkDerivative from './themes/dark';
import seedToken, { scheme } from './themes/seed';
import createTheme from '@/_cssinjs/theme/createTheme';

export const defaultTheme = scheme => {
  return createTheme(scheme === 'dark' ? darkDerivative : defaultDerivative);
};

// ================================ Context =================================
// To ensure snapshot stable. We disable hashed in test env.
export const DefaultConfigThemeProvider: EuiTokenProviderProps = {
  token: seedToken,
  theme: defaultTheme(scheme),
  override: { override: seedToken },
  hashed: true,
  scheme,
};

export const EuiTokenContext = React.createContext<EuiTokenProviderProps>(DefaultConfigThemeProvider);
