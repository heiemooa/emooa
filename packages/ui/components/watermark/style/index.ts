import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

interface WatermarkToken extends FullToken<'Watermark'> {}

const genWatermarkStyle: GenerateStyle<WatermarkToken> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'relative',
      '&-rtl': {
        direction: 'rtl',
      },
    },
  };
};

// ============================== Export ==============================
const prepareComponentToken: GetDefaultToken<'Watermark'> = () => ({});

export default genStyleHooks(
  'Watermark',
  token => {
    const watermarkToken = mergeToken<WatermarkToken>(token, {});
    return [genWatermarkStyle(watermarkToken)];
  },
  prepareComponentToken,
);
