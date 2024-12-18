import { GenerateColorMap, GenerateNeutralColorMap } from '../../interface';
import generate from '../../util/colors-generate';
import { getAlphaColor, getSolidColor } from './colorAlgorithm';

export const generateColorPalettes: GenerateColorMap = (baseColor: string) => {
  const colors = generate(baseColor, { theme: 'dark' });

  return {
    1: colors[0],
    2: colors[1],
    3: colors[3],
    4: colors[4],
    5: colors[6],
    6: colors[5],
    // 7: colors[4],
    // 8: colors[6],
    // 9: colors[5],
    // 10: colors[4],
  };
};

export const generateNeutralColorPalettes: GenerateNeutralColorMap = (bgBaseColor: string, textBaseColor: string) => {
  const colorBgBase = bgBaseColor || '#000';
  const colorTextBase = textBaseColor || '#fff';

  return {
    colorBgBase,
    colorTextBase,

    colorText: getAlphaColor(colorTextBase, 0.85),
    colorTextSecondary: getAlphaColor(colorTextBase, 0.65),
    colorTextTertiary: getAlphaColor(colorTextBase, 0.45),
    colorTextQuaternary: getAlphaColor(colorTextBase, 0.25),

    colorFill: getAlphaColor(colorTextBase, 0.18),
    colorFillSecondary: getAlphaColor(colorTextBase, 0.12),
    colorFillTertiary: getAlphaColor(colorTextBase, 0.08),
    colorFillQuaternary: getAlphaColor(colorTextBase, 0.04),

    colorBg: getSolidColor(colorBgBase, 4),
    colorBgContainer: getSolidColor(colorBgBase, 19),
    colorBgContainerDisabled: getAlphaColor(colorTextBase, 0.08),
    colorBgElevated: getSolidColor(colorBgBase, 12),

    colorBorder: getSolidColor(colorBgBase, 26),
    colorBorderSecondary: getSolidColor(colorBgBase, 19),
  };
};
