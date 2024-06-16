import { CSSInterpolation, Keyframes } from '@/_cssinjs';
import { AliasToken } from '@/_theme/interface';
import { TokenWithCommonCls } from '@/_theme/util/genStyleHooks';
import { initMotion } from './motions';

export const fadeIn = new Keyframes('euiFadeIn', {
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

export const fadeOut = new Keyframes('euiFadeOut', {
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
});

export const initFadeMotion = (token: TokenWithCommonCls<AliasToken>, sameLevel = false): CSSInterpolation => {
  const { euiCls } = token;
  const motionCls = `${euiCls}-fade`;
  const sameLevelPrefix = sameLevel ? '&' : '';

  return [
    initMotion(motionCls, fadeIn, fadeOut, token.motions.durationMid, sameLevel),
    {
      [`
        ${sameLevelPrefix}${motionCls}-enter,
        ${sameLevelPrefix}${motionCls}-appear
      `]: {
        opacity: 0,
        animationTimingFunction: 'linear',
      },

      [`${sameLevelPrefix}${motionCls}-leave`]: {
        animationTimingFunction: 'linear',
      },
    },
  ];
};
