import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

interface CopyToken extends FullToken<'Copy'> {}

const genCopyStyle: GenerateStyle<CopyToken> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      wordBreak: 'break-all',
      whiteSpace: 'normal',
      color: token.colorText,

      '&-rtl': {
        direction: 'rtl',

        [`${componentCls}-icon`]: {
          marginRight: token.margins.XS,
        },
      },

      [`${componentCls}-content`]: {
        display: 'inline-block',
      },

      [`${componentCls}-icon`]: {
        marginLeft: token.margins.XXS,
        cursor: 'pointer',
        color: token.colorTextSecondary,

        [`&:not(&-copied):hover`]: {
          color: token.colorPrimarys[5],
        },
        '&-copied': {
          color: token.colorSuccesses[6],
        },
        '&-loading': {
          color: token.colorPrimarys[5],
        },
      },

      '&-hover': {
        [`${componentCls}-icon`]: {
          visibility: 'hidden',
        },

        '&:hover': {
          [`${componentCls}-icon`]: {
            visibility: 'initial',
          },
        },
      },
    },
  };
};

// ============================== Export ==============================
const prepareComponentToken: GetDefaultToken<'Copy'> = () => ({});

export default genStyleHooks(
  'Copy',
  token => {
    return [genCopyStyle(token)];
  },
  prepareComponentToken,
);
