import generate from '../../util/colors-generate';
import type { ColorPalettes, BaseToken, PresetColorType, SeedToken } from '../../interface';
import { genColorBaseToken } from '../base';
import { generateColorPalettes, generateNeutralColorPalettes } from './colors';
import defaultAlgorithm from '../default';
import { DerivativeFunc } from '@/_cssinjs/theme/interface';

const derivative: DerivativeFunc<SeedToken, BaseToken> = (token, baseToken) => {
  const colorPalettes = Object.keys(token.colors)
    .map((colorKey: keyof PresetColorType) => {
      const colors = generate(token.colors[colorKey], { theme: 'dark' });

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

  const mergedBaseToken = baseToken ?? defaultAlgorithm(token);

  return {
    ...mergedBaseToken,

    // Dark tokens
    colors: Object.assign({}, token.colors, colorPalettes),
    // Colors
    ...genColorBaseToken(token, {
      generateColorPalettes,
      generateNeutralColorPalettes,
    }),
  };
};

export default derivative;
