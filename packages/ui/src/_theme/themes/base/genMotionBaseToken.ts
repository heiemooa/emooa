import type { MotionBaseToken, SeedToken } from '../../interface';

export default function genMotionBaseToken(token: SeedToken): MotionBaseToken {
  const { motionUnit, motionBase } = token;

  return {
    // motion
    motionDurationFast: `${(motionBase + motionUnit).toFixed(1)}s`,
    motionDurationMid: `${(motionBase + motionUnit * 2).toFixed(1)}s`,
    motionDurationSlow: `${(motionBase + motionUnit * 3).toFixed(1)}s`,
  };
}
