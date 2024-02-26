import React from 'react';
import type { AliasToken, BaseToken, ComponentsToken, SeedToken } from './interface';
import defaultDerivative from './themes/default';
import defaultSeedToken from './themes/seed';
import Theme from '@/_cssinjs/theme/Theme';
import createTheme from '@/_cssinjs/theme/createTheme';

export const defaultTheme = createTheme(defaultDerivative);

// ================================ Context =================================
// To ensure snapshot stable. We disable hashed in test env.
export const defaultConfig = {
  token: defaultSeedToken,
  override: { override: defaultSeedToken },
  hashed: true,
};

export interface EuiTokenProviderProps {
  token: Partial<AliasToken>;
  theme?: Theme<SeedToken, BaseToken>;
  components?: ComponentsToken;
  /** Just merge `token` & `override` at top to save perf */
  override: { override: Partial<AliasToken> } & ComponentsToken;
  hashed?: string | boolean;
  cssVar?: {
    prefix?: string;
    key?: string;
  };
}

export const EuiTokenContext = React.createContext<EuiTokenProviderProps>(defaultConfig);
