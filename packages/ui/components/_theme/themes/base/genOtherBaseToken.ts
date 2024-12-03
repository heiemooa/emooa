import type { SeedToken, OtherBaseToken, BaseToken } from '../../interface';

const genRadius = (radiusBase: number): Pick<BaseToken['rounded'], 'XS' | 'SM' | 'LG' | 'MD'> => {
  let radiusLG = radiusBase;
  let radiusSM = radiusBase;
  let radiusXS = radiusBase;

  // radiusLG
  if (radiusBase < 6 && radiusBase >= 5) {
    radiusLG = radiusBase + 1;
  } else if (radiusBase < 16 && radiusBase >= 6) {
    radiusLG = radiusBase + 2;
  } else if (radiusBase >= 16) {
    radiusLG = 16;
  }

  // radiusSM
  if (radiusBase < 7 && radiusBase >= 5) {
    radiusSM = 4;
  } else if (radiusBase < 8 && radiusBase >= 7) {
    radiusSM = 5;
  } else if (radiusBase < 14 && radiusBase >= 8) {
    radiusSM = 6;
  } else if (radiusBase < 16 && radiusBase >= 14) {
    radiusSM = 7;
  } else if (radiusBase >= 16) {
    radiusSM = 8;
  }

  // radiusXS
  if (radiusBase < 6 && radiusBase >= 2) {
    radiusXS = 1;
  } else if (radiusBase >= 6) {
    radiusXS = 2;
  }
  return {
    XS: radiusXS,
    SM: radiusSM,
    MD: radiusBase,
    LG: radiusLG,
  };
};

export default function genOtherBaseToken(token: SeedToken): OtherBaseToken {
  const { borderRadius, lineWidth } = token;

  return {
    // line
    lineWidthBold: lineWidth + 1,
    rounded: genRadius(borderRadius),
  };
}
