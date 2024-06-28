import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

interface SpinToken extends FullToken<'Spin'> {
  spaceGapMiniSize: number;
  spaceGapSmallSize: number;
  spaceGapMediumSize: number;
  spaceGapLargeSize: number;
}

const genSpinStyle: GenerateStyle<SpinToken> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'inline-flex',
      '&-rtl': {
        direction: 'rtl',
      },
      '&-vertical': {
        flexDirection: 'column',
      },
      '&-horizontal': {
        flexDirection: 'row',
      },
      '&-wrap': {
        flexWrap: 'wrap',
      },
      '&-align': {
        flexDirection: 'column',
        '&-center': {
          alignItems: 'center',
        },
        '&-start': {
          alignItems: 'flex-start',
        },
        '&-end': {
          alignItems: 'flex-end',
        },
        '&-baseline': {
          alignItems: 'baseline',
        },
      },
      [`${componentCls}-item:empty`]: {
        display: 'none',
      },
    },
  };
};

const genSpinGapStyle: GenerateStyle<SpinToken> = token => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      '&-gap-row-mini': {
        rowGap: token.spaceGapMiniSize,
      },
      '&-gap-row-small': {
        rowGap: token.spaceGapSmallSize,
      },
      '&-gap-row-medium': {
        rowGap: token.spaceGapMediumSize,
      },
      '&-gap-row-large': {
        rowGap: token.spaceGapLargeSize,
      },
      '&-gap-col-mini': {
        columnGap: token.spaceGapMiniSize,
      },
      '&-gap-col-small': {
        columnGap: token.spaceGapSmallSize,
      },
      '&-gap-col-medium': {
        columnGap: token.spaceGapMediumSize,
      },
      '&-gap-col-large': {
        columnGap: token.spaceGapLargeSize,
      },
    },
  };
};

// ============================== Export ==============================
const prepareComponentToken: GetDefaultToken<'Spin'> = () => ({});

export default genStyleHooks(
  'Spin',
  token => {
    const spaceToken = mergeToken<SpinToken>(token, {
      spaceGapMiniSize: token.paddingXXS,
      spaceGapSmallSize: token.paddingXS,
      spaceGapMediumSize: token.padding,
      spaceGapLargeSize: token.paddingLG,
    });
    return [genSpinStyle(spaceToken), genSpinGapStyle(spaceToken)];
  },
  prepareComponentToken,
);
