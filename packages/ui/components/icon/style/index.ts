import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

interface IconToken extends FullToken<'Icon'> {}

const genIconStyle: GenerateStyle<IconToken> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {},
  };
};

// ============================== Export ==============================
const prepareComponentToken: GetDefaultToken<'Icon'> = () => ({});

export default genStyleHooks(
  'Icon',
  token => {
    const iconToken = mergeToken<IconToken>(token, {});
    return [genIconStyle(iconToken)];
  },
  prepareComponentToken,
);
