import { FullToken, GenerateStyle, GetDefaultToken, genStyleHooks, mergeToken } from '@/_theme/internal';

export interface ComponentToken {}

interface AppToken extends FullToken<'App'> {}

// =============================== Base ===============================
const genAppStyle: GenerateStyle<AppToken> = token => {
  const { componentCls, colorText, fontSize, lineHeight, fontFamily } = token;
  return {
    [componentCls]: {
      color: colorText,
      fontSize,
      lineHeight,
      fontFamily,
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'App'> = () => ({});

// ============================== Export ==============================
export default genStyleHooks(
  'App',
  token => {
    const modalToken = mergeToken<AppToken>(token);

    return [genAppStyle(modalToken)];
  },
  prepareComponentToken,
);
