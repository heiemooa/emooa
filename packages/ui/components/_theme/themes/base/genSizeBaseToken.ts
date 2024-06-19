import type { SeedToken, SizeBaseToken } from '../../interface';

export default function genSizeBaseToken(token: SeedToken): SizeBaseToken {
  const { sizeUnit, sizeStep } = token;

  return {
    sizeXXL: sizeUnit * (sizeStep + 4), // 32
    sizeXL: sizeUnit * (sizeStep + 2), // 24
    sizeLG: sizeUnit * (sizeStep + 1), // 20
    size: sizeUnit * sizeStep, // 16
    sizeSM: sizeUnit * (sizeStep - 1), // 12
    sizeXS: sizeUnit * (sizeStep - 2), // 8
    sizeXXS: sizeUnit * (sizeStep - 3), // 4
  };
}
