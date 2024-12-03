import useCacheToken, { getComputedToken } from './hooks/useCacheToken';
import type { CSSInterpolation, CSSObject } from './hooks/useStyleRegister';
import useStyleRegister from './hooks/useStyleRegister';
import Keyframes from './Keyframes';
import type { Linter } from './linters';

import type { StyleProviderProps } from './StyleContext';
import { createCache, StyleProvider } from './StyleContext';
import type { DerivativeFunc, TokenType } from './theme';
import { createTheme, Theme } from './theme';
import { supportLogicProps, supportWhere, unit } from './util';

export {
  Theme,
  createTheme,
  useStyleRegister,
  useCacheToken,
  createCache,
  StyleProvider,
  Keyframes,
  getComputedToken,
  unit,
};
export type { TokenType, CSSObject, CSSInterpolation, DerivativeFunc, Linter, StyleProviderProps };

export const _experimental = {
  supportModernCSS: () => supportWhere() && supportLogicProps(),
};
