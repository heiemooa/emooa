import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

interface SpaceToken extends FullToken<'Button'> {
  spaceGapMiniSize: number;
  spaceGapSmallSize: number;
  spaceGapMediumSize: number;
  spaceGapLargeSize: number;
}

const genBtnStyle: GenerateStyle<SpaceToken> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      textAlign: 'center',
      lineHeight: token.lineHeight,
      color: token.colorText,

      '&-rtl': {
        direction: 'rtl',
      },
    },
  };
};

// ============================== Export ==============================
export const prepareComponentToken: GetDefaultToken<'Button'> = () => ({});

export default genStyleHooks(
  'Button',
  token => {
    const spaceToken = mergeToken<SpaceToken>(token, {
      spaceGapMiniSize: token.paddingXXS,
      spaceGapSmallSize: token.paddingXS,
      spaceGapMediumSize: token.padding,
      spaceGapLargeSize: token.paddingLG,
    });
    return [genBtnStyle(spaceToken)];
  },
  prepareComponentToken,
);
