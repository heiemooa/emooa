import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

interface GeoJSONToken extends FullToken<'GeoJSON'> {}

const genGeoJSONStyle: GenerateStyle<GeoJSONToken> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {},
  };
};

// ============================== Export ==============================
export const prepareComponentToken: GetDefaultToken<'GeoJSON'> = () => ({});

export default genStyleHooks(
  'GeoJSON',
  token => {
    const imageToken = mergeToken<GeoJSONToken>(token, {});
    return [genGeoJSONStyle(imageToken)];
  },
  prepareComponentToken,
  {
    resetStyle: false,
  },
);
