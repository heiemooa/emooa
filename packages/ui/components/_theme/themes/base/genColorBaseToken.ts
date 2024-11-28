import type { ColorBaseToken, GenerateColorMap, GenerateNeutralColorMap, SeedToken } from '../../interface';

interface PaletteGenerators {
  generateColorPalettes: GenerateColorMap;
  generateNeutralColorPalettes: GenerateNeutralColorMap;
}

export default function genColorBaseToken(
  seed: SeedToken,
  { generateColorPalettes, generateNeutralColorPalettes }: PaletteGenerators,
): ColorBaseToken {
  const {
    colorSuccess: colorSuccessBase,
    colorWarning: colorWarningBase,
    colorError: colorErrorBase,
    colorInfo: colorInfoBase,
    colorPrimary: colorPrimaryBase,
    colorLink: colorLinkBase,
    colorBgBase,
    colorTextBase,
  } = seed;

  const primaryColors = generateColorPalettes(colorPrimaryBase);
  const successColors = generateColorPalettes(colorSuccessBase);
  const warningColors = generateColorPalettes(colorWarningBase);
  const errorColors = generateColorPalettes(colorErrorBase);
  const infoColors = generateColorPalettes(colorInfoBase);
  const linkColors = generateColorPalettes(colorLinkBase);
  const neutralColors = generateNeutralColorPalettes(colorBgBase, colorTextBase);

  // Color Link

  return {
    ...neutralColors,

    colorPrimarys: primaryColors,

    colorSuccesses: successColors,

    colorErrors: errorColors,

    colorWarnings: warningColors,

    colorInfos: infoColors,

    colorLinks: {
      colorLinkHover: linkColors[4],
      colorLink: linkColors[6],
      colorLinkDidsabled: linkColors[3],
      colorLinkActive: linkColors[7],
    },
  };
}
