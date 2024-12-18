import { getComputedToken } from '@/_cssinjs';
import type { AliasToken, EuiTokenProviderProps } from './interface';
import seedToken from './themes/seed';
import formatToken from './util/alias';
import { defaultTheme } from './context';

const getDesignToken = (config?: Partial<EuiTokenProviderProps>): AliasToken => {
  const mergedToken = {
    ...seedToken,
    ...config?.token,
  };
  return getComputedToken(mergedToken, { override: config?.token }, defaultTheme(config?.scheme), formatToken);
};

export default getDesignToken;
