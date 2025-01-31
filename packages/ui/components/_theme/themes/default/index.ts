import generate from '../../util/colors-generate';
import type { ColorPalettes, BaseToken, PresetColorType, SeedToken } from '../../interface';
import { generateColorPalettes, generateNeutralColorPalettes } from './colors';
import { genOtherBaseToken, genFontBaseToken, genMotionBaseToken, genColorBaseToken, genSizeBaseToken } from '../base';

export default function derivative(token: SeedToken): BaseToken {
  const colorPalettes = Object.keys(token.colors)
    .map((colorKey: keyof PresetColorType) => {
      const colors = generate(token.colors[colorKey]);

      return new Array(10).fill(1).reduce((prev, _, i) => {
        prev[`${colorKey}${i + 1}`] = colors[i];
        return prev;
      }, {}) as ColorPalettes;
    })
    .reduce((prev, cur) => {
      prev = {
        ...prev,
        ...cur,
      };
      return prev;
    }, {} as ColorPalettes);

  return {
    ...token,
    // Motion
    motions: genMotionBaseToken(token),
    // Colors
    colors: Object.assign({}, token.colors, colorPalettes),
    ...genColorBaseToken(token, {
      generateColorPalettes,
      generateNeutralColorPalettes,
    }),
    // Font
    fonts: genFontBaseToken(token.fontSize),
    // Size
    sizes: genSizeBaseToken(token),
    // Others
    ...genOtherBaseToken(token),
  };
}
