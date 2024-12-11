import type { FontBaseToken } from '../../interface';
import genFontSizes from './genFontSizes';

const genFontBaseToken = (fontSize: number): FontBaseToken => {
  const fontSizePairs = genFontSizes(fontSize);
  const fontSizes = fontSizePairs.map(pair => pair.size);
  const lineHeights = fontSizePairs.map(pair => pair.lineHeight);

  const fontSizeSM = fontSizes[0];
  const fontSizeMD = fontSizes[1];
  const fontSizeLG = fontSizes[2];
  const fontSizeXL = fontSizes[3];

  const lineHeightSM = lineHeights[0];
  const lineHeight = lineHeights[1];
  const lineHeightLG = lineHeights[2];
  const lineHeightXL = lineHeights[3];

  return {
    fontSizeSM,
    fontSize: fontSizeMD,
    fontSizeLG,
    fontSizeXL,

    fontSizeHeading1: fontSizes[6],
    fontSizeHeading2: fontSizes[5],
    fontSizeHeading3: fontSizes[4],
    fontSizeHeading4: fontSizes[3],
    fontSizeHeading5: fontSizes[2],

    lineHeightSM,
    lineHeight,
    lineHeightLG,
    lineHeightXL,

    fontHeightSM: Math.round(lineHeightSM * fontSizeSM),
    fontHeight: Math.round(lineHeight * fontSizeMD),
    fontHeightLG: Math.round(lineHeightLG * fontSizeLG),
    fontHeightXL: Math.round(lineHeightXL * fontSizeXL),

    lineHeightHeading1: lineHeights[6],
    lineHeightHeading2: lineHeights[5],
    lineHeightHeading3: lineHeights[4],
    lineHeightHeading4: lineHeights[3],
    lineHeightHeading5: lineHeights[2],

    fontSizeIcon: fontSizeSM,

    fontWeight: 500,
    fontWeightStrong: 600,
  };
};

export default genFontBaseToken;
