import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

interface ImageToken extends FullToken<'Image'> {}

const genImageStyle: GenerateStyle<ImageToken> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'relative',
      display: 'inline-block',
      verticalAlign: 'middle',

      '&-loading,&-loading-error': {
        [`${componentCls}-img`]: {
          visibility: 'hidden',
        },
      },

      [`${componentCls}-overlay`]: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,

        [`${componentCls}-error`]: {
          height: '100%',
          width: '100%',
          background: token.colorErrorBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          '&-spin': {
            textAlign: 'center',

            '&-text': {},
          },
        },

        [`${componentCls}-loader`]: {
          height: '100%',
          width: '100%',
          background: token.colorInfoBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          '&-spin': {
            textAlign: 'center',
          },

          '&-placeholder': {
            filter: 'blur(5px)',
          },
        },
      },
    },
  };
};

// ============================== Export ==============================
export const prepareComponentToken: GetDefaultToken<'Image'> = () => ({});

export default genStyleHooks(
  'Image',
  token => {
    const imageToken = mergeToken<ImageToken>(token, {});
    console.log(genImageStyle(imageToken));
    return [genImageStyle(imageToken)];
  },
  prepareComponentToken,
);
