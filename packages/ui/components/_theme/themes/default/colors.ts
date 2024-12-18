import { GenerateColorMap, GenerateNeutralColorMap } from '../../interface';
import generate from '../../util/colors-generate';
import { getAlphaColor, getSolidColor } from './colorAlgorithm';

export const generateColorPalettes: GenerateColorMap = (baseColor: string) => {
  const colors = generate(baseColor);

  return {
    1: colors[0],
    2: colors[1],
    3: colors[2],
    4: colors[3],
    5: colors[4],
    6: colors[5],
    // 7: colors[6],
    // 8: colors[4],
    // 9: colors[5],
    // 10: colors[6],
  };
};

export const generateNeutralColorPalettes: GenerateNeutralColorMap = (bgBaseColor: string, textBaseColor: string) => {
  const colorBgBase = bgBaseColor || '#fff';
  const colorTextBase = textBaseColor || '#000';

  return {
    colorBgBase,
    colorTextBase,

    colorText: getAlphaColor(colorTextBase, 0.88),
    colorTextSecondary: getAlphaColor(colorTextBase, 0.65),
    colorTextTertiary: getAlphaColor(colorTextBase, 0.45),
    colorTextQuaternary: getAlphaColor(colorTextBase, 0.25),

    colorFill: getAlphaColor(colorTextBase, 0.15),
    colorFillSecondary: getAlphaColor(colorTextBase, 0.06),
    colorFillTertiary: getAlphaColor(colorTextBase, 0.04),
    colorFillQuaternary: getAlphaColor(colorTextBase, 0.02),

    colorBg: getSolidColor(colorBgBase, 4),
    colorBgContainer: getSolidColor(colorBgBase, 6),
    colorBgContainerDisabled: getAlphaColor(colorTextBase, 0.04),
    colorBgElevated: getSolidColor(colorBgBase, 0),

    colorBorder: getSolidColor(colorBgBase, 15),
    colorBorderSecondary: getSolidColor(colorBgBase, 6),
  };
};
