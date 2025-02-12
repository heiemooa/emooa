import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

interface EmptyToken extends FullToken<'Empty'> {}

const genEmptyStyle: GenerateStyle<EmptyToken> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      marginInline: token.margins.XS,
      textAlign: 'center',
      lineHeight: token.fonts.lineHeight,

      [`${componentCls}-image`]: {
        fontSize: token.fonts.fontSize * 4,
        marginBottom: token.margins.XS,
        color: token.colorTextTertiary,
        lineHeight: 1,

        boxSizing: 'border-box',
        img: {
          height: token.sizes.MD * 4,
          verticalAlign: 'middle',
          boxSizing: 'border-box',
        },

        svg: {
          width: '1em',
          height: '1em',
          verticalAlign: 'middle',
        },
      },

      [`${componentCls}-description`]: {
        color: token.colorTextDescription,
      },
    },
  };
};

// ============================== Export ==============================
const prepareComponentToken: GetDefaultToken<'Empty'> = () => ({});

export default genStyleHooks(
  'Empty',
  token => {
    return [genEmptyStyle(token)];
  },
  prepareComponentToken,
);
