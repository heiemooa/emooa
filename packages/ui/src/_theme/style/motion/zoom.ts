import { CSSInterpolation, Keyframes } from '@/_cssinjs';
import { AliasToken } from '@/_theme/interface';
import { TokenWithCommonCls } from '@/_theme/util/genStyleHooks';
import { initMotion } from './motions';

export const zoomIn = new Keyframes('euiZoonIn', {
  '0%': {
    transform: 'scale(1.2)',
  },
  '100%': {
    transform: 1,
  },
});

export const zoomOut = new Keyframes('euiZoonOut', {
  '0%': {
    transform: 1,
  },
  '100%': {
    transform: 'scale(0.9)',
  },
});

export const initZoomMotion = (token: TokenWithCommonCls<AliasToken>, sameLevel = false): CSSInterpolation => {
  const { euiCls } = token;
  const motionCls = `${euiCls}-zoom`;
  const sameLevelPrefix = sameLevel ? '&' : '';

  return [
    initMotion(motionCls, zoomIn, zoomOut, token.motions.durationMid, sameLevel),
    {
      [`
        ${sameLevelPrefix}${motionCls}-enter,
        ${sameLevelPrefix}${motionCls}-appear
      `]: {
        animationTimingFunction: 'linear',
      },

      [`${sameLevelPrefix}${motionCls}-leave`]: {
        animationTimingFunction: 'linear',
      },
    },
  ];
};
