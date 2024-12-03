import hash from '@emotion/hash';
import { ATTR_TOKEN, CSS_IN_JS_INSTANCE } from '../StyleContext';
import type Theme from '../theme/Theme';
import { flattenToken, memoResult, token2key } from '../util';
import useGlobalCache from './useGlobalCache';
import { merge } from 'lodash';

const EMPTY_OVERRIDE = {};

// Generate different prefix to make user selector break in production env.
// This helps developer not to do style override directly on the hash id.
const hashPrefix = process.env.NODE_ENV !== 'production' ? 'css-dev-only-do-not-override' : 'css';

export interface Option<DerivativeToken, EuiToken> {
  /**
   * Generate token with salt.
   * This is used to generate different hashId even same derivative token for different version.
   */
  salt?: string;
  override?: object;
  /**
   * Format token as you need. Such as:
   *
   * - rename token
   * - merge token
   * - delete token
   *
   * This should always be the same since it's one time process.
   * It's ok to useMemo outside but this has better cache strategy.
   */
  formatToken?: (mergedToken: any) => DerivativeToken;
  /**
   * Get final token with origin token, override token and theme.
   * The parameters do not contain formatToken since it's passed by user.
   * @param origin The original token.
   * @param override Extra tokens to override.
   * @param theme Theme instance. Could get derivative token by `theme.getDerivativeToken`
   */
  getComputedToken?: (origin: EuiToken, override: object, theme: Theme<any, any>) => DerivativeToken;
}

const tokenKeys = new Map<string, number>();
function recordCleanToken(tokenKey: string) {
  tokenKeys.set(tokenKey, (tokenKeys.get(tokenKey) || 0) + 1);
}

function removeStyleTags(key: string, instanceId: string) {
  if (typeof document !== 'undefined') {
    const styles = document.querySelectorAll(`style[${ATTR_TOKEN}="${key}"]`);

    styles.forEach(style => {
      if ((style as any)[CSS_IN_JS_INSTANCE] === instanceId) {
        style.parentNode?.removeChild(style);
      }
    });
  }
}

export const getComputedToken = <DerivativeToken = object, EuiToken = DerivativeToken>(
  originToken: EuiToken,
  overrideToken: object,
  theme: Theme<any, any>,
  format?: (token: EuiToken) => DerivativeToken,
) => {
  const derivativeToken = theme.getDerivativeToken(originToken);

  // Merge with override
  let mergedDerivativeToken = {
    ...derivativeToken,
    ...overrideToken,
  };

  // Format if needed
  if (format) {
    mergedDerivativeToken = format(mergedDerivativeToken);
  }

  return mergedDerivativeToken;
};

export const TOKEN_PREFIX = 'token';

type TokenCacheValue<DerivativeToken> = [
  token: DerivativeToken & { _tokenKey: string; _themeKey: string },
  hashId: string,
  realToken: DerivativeToken & { _tokenKey: string },
];

/**
 * Cache theme derivative token as global shared one
 * @param theme Theme entity
 * @param tokens List of tokens, used for cache. Please do not dynamic generate object directly
 * @param option Additional config
 * @returns Call Theme.getDerivativeToken(tokenObject) to get token
 */
export default function useCacheToken<DerivativeToken = object, EuiToken = DerivativeToken>(
  theme: Theme<any, any>,
  tokens: Partial<EuiToken>[],
  option: Option<DerivativeToken, EuiToken> = {},
): TokenCacheValue<DerivativeToken> {
  const { salt = '', override = EMPTY_OVERRIDE, formatToken, getComputedToken: compute } = option;

  // Basic - We do basic cache here
  const mergedToken = memoResult(() => merge({}, ...tokens), tokens);

  const tokenStr = flattenToken(mergedToken);
  const overrideTokenStr = flattenToken(override);

  const cachedToken = useGlobalCache<TokenCacheValue<DerivativeToken>>(
    TOKEN_PREFIX,
    [salt, theme.id, tokenStr, overrideTokenStr],
    () => {
      let mergedDerivativeToken = compute
        ? compute(mergedToken, override, theme)
        : getComputedToken(mergedToken, override, theme, formatToken);

      // Replace token value with css variables
      const actualToken = { ...mergedDerivativeToken };

      // Optimize for `useStyleRegister` performance
      const tokenKey = token2key(mergedDerivativeToken, salt);
      mergedDerivativeToken._tokenKey = tokenKey;
      actualToken._tokenKey = token2key(actualToken, salt);

      mergedDerivativeToken._themeKey = tokenKey;
      recordCleanToken(tokenKey);

      const hashId = `${hashPrefix}-${hash(tokenKey)}`;
      mergedDerivativeToken._hashId = hashId; // Not used

      return [mergedDerivativeToken, hashId, actualToken];
    },
  );

  return cachedToken;
}
