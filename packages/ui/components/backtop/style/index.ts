import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

interface BacktopToken extends FullToken<'Backtop'> {}

const genBacktopStyle: GenerateStyle<BacktopToken> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'fixed',
      bottom: token.marginXXL,
      right: token.marginXXL,
      zIndex: 100,
      cursor: 'pointer',
    },
  };
};

// ============================== Export ==============================
const prepareComponentToken: GetDefaultToken<'Backtop'> = () => ({});

export default genStyleHooks(
  'Backtop',
  token => {
    const backtopToken = mergeToken<BacktopToken>(token);
    return [genBacktopStyle(backtopToken)];
  },
  prepareComponentToken,
);
