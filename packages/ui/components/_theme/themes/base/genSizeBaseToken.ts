import type { SeedToken, SizeBaseToken } from '../../interface';

export default function genSizeBaseToken(token: SeedToken): SizeBaseToken {
  const { sizeUnit, sizeStep } = token;

  return {
    XXL: sizeUnit * (sizeStep + 4), // 32
    XL: sizeUnit * (sizeStep + 2), // 24
    LG: sizeUnit * (sizeStep + 1), // 20
    MD: sizeUnit * sizeStep, // 16
    SM: sizeUnit * (sizeStep - 1), // 12
    XS: sizeUnit * (sizeStep - 2), // 8
    XXS: sizeUnit * (sizeStep - 3), // 4
  };
}
