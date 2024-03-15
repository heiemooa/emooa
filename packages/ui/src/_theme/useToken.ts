import React from 'react';
import Theme from '@/_cssinjs/theme/Theme';
import { AliasToken, GlobalToken, BaseToken, SeedToken, EuiTokenProviderProps } from './interface';
import { EuiTokenContext } from './context';
import useCacheToken from '@/_cssinjs/hooks/useCacheToken';
import defaultSeedToken from './themes/seed';
import formatToken from './util/alias';

export const unitless: {
  [key in keyof AliasToken]?: boolean;
} = {
  lineHeight: true,
  lineHeightSM: true,
  lineHeightLG: true,
  lineHeightHeading1: true,
  lineHeightHeading2: true,
  lineHeightHeading3: true,
  lineHeightHeading4: true,
  lineHeightHeading5: true,
  fontWeightStrong: true,
  zIndexPopupBase: true,
  zIndexBase: true,
};

export const ignore: {
  [key in keyof AliasToken]?: boolean;
} = {
  size: true,
  sizeSM: true,
  sizeLG: true,
  sizeXS: true,
  sizeXXS: true,
  sizeXL: true,
  sizeXXL: true,
  sizeUnit: true,
  sizeStep: true,
  motionBase: true,
  motionUnit: true,
};

const preserve: {
  [key in keyof AliasToken]?: boolean;
} = {
  screenXS: true,
  screenXSMin: true,
  screenXSMax: true,
  screenSM: true,
  screenSMMin: true,
  screenSMMax: true,
  screenMD: true,
  screenMDMin: true,
  screenMDMax: true,
  screenLG: true,
  screenLGMin: true,
  screenLGMax: true,
  screenXL: true,
  screenXLMin: true,
  screenXLMax: true,
  screenXXL: true,
  screenXXLMin: true,
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
      const { theme: componentTheme, ...componentTokens } = value;
      let mergedComponentToken = componentTokens;
      if (componentTheme) {
        mergedComponentToken = getComputedToken(
          {
            ...mergedDerivativeToken,
            ...componentTokens,
          },
          {
            override: componentTokens,
          },
          componentTheme,
        );
      }
      mergedDerivativeToken[key] = mergedComponentToken;
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
  cssVar?: EuiTokenProviderProps['cssVar'],
] {
  const { token: rootToken, hashed, theme, override, cssVar } = React.useContext(EuiTokenContext);

  const salt = `version-${hashed || ''}`;

  const [token, hashId, realToken] = useCacheToken<GlobalToken, SeedToken>(theme, [defaultSeedToken, rootToken], {
    salt,
    override,
    getComputedToken,
    formatToken,
    cssVar: cssVar && {
      prefix: cssVar.prefix,
      key: cssVar.key,
      unitless,
      ignore,
      preserve,
    },
  });

  return [theme, realToken, hashed ? hashId : '', token, cssVar];
}
