import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';
import { fade, zoom } from '@/_theme/style/motion';

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
      bottom: token.margins.XXL,
      right: token.margins.XL,
      zIndex: 100,
      cursor: 'pointer',

      [`& > &-btn`]: {
        boxShadow: token.shadows.MD,
      },
    },
  };
};

const genModalMotion: GenerateStyle<BacktopToken> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: [
      zoom.initZoomMotion(token, 'zoom', true),
      fade.initFadeMotion(token, 'fade', true),
      fade.initFadeMotion(token, 'fade-up', true),
      fade.initFadeMotion(token, 'fade-left', true),
      fade.initFadeMotion(token, 'fade-right', true),
      fade.initFadeMotion(token, 'fade-down', true),
    ],
  };
};

// ============================== Export ==============================
const prepareComponentToken: GetDefaultToken<'Backtop'> = () => ({});

export default genStyleHooks(
  'Backtop',
  token => {
    const backtopToken = mergeToken<BacktopToken>(token);
    return [genBacktopStyle(backtopToken), genModalMotion(backtopToken)];
  },
  prepareComponentToken,
);
