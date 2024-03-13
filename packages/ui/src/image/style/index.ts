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
      '&:hover': {
        cursor: 'pointer',
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
    return [genImageStyle(imageToken)];
  },
  prepareComponentToken,
);
