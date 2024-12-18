import React from 'react';
import Theme from '@/_cssinjs/theme/Theme';
import { AliasToken, GlobalToken, BaseToken, SeedToken, EuiTokenProviderProps } from './interface';
import { EuiTokenContext } from './context';
import useCacheToken from '@/_cssinjs/hooks/useCacheToken';
import defaultSeedToken from './themes/seed';
import formatToken from './util/alias';

export const colorPreserve: {
  [key in keyof AliasToken]?: boolean;
} = {
  colorPrimary: true,
  colorError: true,
  colorInfo: true,
  colorWarning: true,
  colorSuccess: true,
  colorLink: true,
};

const getComputedToken = (
  originToken: SeedToken,
  overrideToken: EuiTokenProviderProps['components'] & {
    override?: Partial<AliasToken>;
  },
  theme: Theme<any, any>,
) => {
  const derivativeToken = theme.getDerivativeToken(originToken);

  const { override, ...components } = overrideToken;

  // Merge with override
  let mergedDerivativeToken = {
    ...derivativeToken,
    override,
  };

  // Format if needed
  mergedDerivativeToken = formatToken(mergedDerivativeToken);

  if (components) {
    Object.entries(components).forEach(([key, value]) => {
      mergedDerivativeToken[key] = value;
    });
  }

  return mergedDerivativeToken;
};

// ================================== Hook ==================================
export default function useToken(): [
  theme: Theme<SeedToken, BaseToken>,
  token: GlobalToken,
  hashId: string,
  realToken: GlobalToken,
  scheme: EuiTokenProviderProps['scheme'],
] {
  const { token: rootToken, hashed, theme, override, scheme } = React.useContext(EuiTokenContext);

  const salt = `version-${hashed || ''}`;

  const [token, hashId, realToken] = useCacheToken<GlobalToken, SeedToken>(theme, [defaultSeedToken, rootToken], {
    salt,
    override,
    getComputedToken,
    formatToken,
  });

  return [theme, realToken, hashed ? hashId : '', token, scheme];
}
