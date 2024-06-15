import { createTheme, getComputedToken } from '@/_cssinjs';
import type { AliasToken, EuiTokenProviderProps } from './interface';
import defaultDerivative from './themes/default';
import seedToken from './themes/seed';
import formatToken from './util/alias';

const getDesignToken = (config?: Partial<EuiTokenProviderProps>): AliasToken => {
  const theme = createTheme(defaultDerivative);
  const mergedToken = {
    ...seedToken,
    ...config?.token,
  };
  return getComputedToken(mergedToken, { override: config?.token }, theme, formatToken);
};

export default getDesignToken;
