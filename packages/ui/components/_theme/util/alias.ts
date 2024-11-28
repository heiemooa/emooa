import type { AliasToken, BaseToken, OverrideToken, SeedToken } from '../interface';
import seedToken from '../themes/seed';
import getAlphaColor from './getAlphaColor';
import { merge } from 'lodash';

type RawMergedToken = BaseToken & OverrideToken & { override: Partial<AliasToken> };

/**
 * Seed (designer) > Derivative (designer) > Alias (developer).
 *
 * Merge seed & derivative & override token and generate alias token for developer.
 */
export default function formatToken(derivativeToken: RawMergedToken): AliasToken {
  const { override, ...restToken } = derivativeToken;
  const overrideTokens = { ...override };

  Object.keys(seedToken).forEach(token => {
    delete overrideTokens[token as keyof SeedToken];
  });

  const mergedToken: AliasToken = merge({}, overrideTokens, restToken);

  const screens = {
    XS: 480,
    SM: 576,
    MD: 768,
    LG: 992,
    XL: 1200,
    XXL: 1600,
  };

  // Motion
  if (mergedToken.motion === false) {
    const fastDuration = '0s';
    mergedToken.motions.durationFast = fastDuration;
    mergedToken.motions.durationMid = fastDuration;
    mergedToken.motions.durationSlow = fastDuration;
  }

  const alias: Partial<AliasToken> = {
    // ============== Background ============== //
    colorFillContent: mergedToken.colorFillSecondary,
    colorFillContentHover: mergedToken.colorFill,
    colorFillAlter: mergedToken.colorFillQuaternary,
    colorBgContainerDisabled: mergedToken.colorFillTertiary,

    // ============== Split ============== //
    colorBorderBg: mergedToken.colorBgContainer,
    colorSplit: getAlphaColor(mergedToken.colorBorderSecondary, mergedToken.colorBgContainer),

    // ============== Text ============== //
    colorTextPlaceholder: mergedToken.colorTextQuaternary,
    colorTextDisabled: mergedToken.colorTextQuaternary,
    colorTextHeading: mergedToken.colorText,
    colorTextLabel: mergedToken.colorTextSecondary,
    colorTextDescription: mergedToken.colorTextTertiary,
    colorHighlight: mergedToken.colorError,
    colorBgTextHover: mergedToken.colorFillSecondary,
    colorBgTextActive: mergedToken.colorFill,

    colorIcon: mergedToken.colorTextTertiary,
    colorIconHover: mergedToken.colorText,

    // Line
    lineWidthFocus: mergedToken.lineWidth * 4,

    // Control
    lineWidth: mergedToken.lineWidth,
    lineType: mergedToken.lineType,
    linkDecoration: 'none',
    linkHoverDecoration: 'none',
    linkFocusDecoration: 'none',

    paddings: {
      XXS: mergedToken.sizes.XXS,
      XS: mergedToken.sizes.XS,
      SM: mergedToken.sizes.SM,
      MD: mergedToken.sizes.MD,
      LG: mergedToken.sizes.LG,
      XL: mergedToken.sizes.XL,
    },
    margins: {
      XXS: mergedToken.sizes.XXS,
      XS: mergedToken.sizes.XS,
      SM: mergedToken.sizes.SM,
      MD: mergedToken.sizes.MD,
      LG: mergedToken.sizes.LG,
      XL: mergedToken.sizes.XL,
      XXL: mergedToken.sizes.XXL,
    },

    screens: {
      XS: screens.XS,
      XSMin: screens.XS,
      XSMax: screens.SM - 1,
      SM: screens.SM,
      SMMin: screens.SM,
      SMMax: screens.MD - 1,
      MD: screens.MD,
      MDMin: screens.MD,
      MDMax: screens.LG - 1,
      LG: screens.LG,
      LGMin: screens.LG,
      LGMax: screens.XL - 1,
      XL: screens.XL,
      XLMin: screens.XL,
      XLMax: screens.XXL - 1,
      XXL: screens.XXL,
      XXLMin: screens.XXL,
    },

    // Override AliasToken
  };

  // Generate alias token
  const aliasToken: AliasToken = merge({}, mergedToken, alias, overrideTokens);

  return aliasToken;
}
