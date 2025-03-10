import type { MotionBaseToken, SeedToken } from '../../interface';

export default function genMotionBaseToken(token: SeedToken): Partial<MotionBaseToken> {
  const { motions } = token;

  return Object.assign({}, motions, {
    durationFast: `${(motions.base + motions.unit).toFixed(1)}s`,
    durationMid: `${(motions.base + motions.unit * 2).toFixed(1)}s`,
    durationSlow: `${(motions.base + motions.unit * 3).toFixed(1)}s`,
  });
}
``;
