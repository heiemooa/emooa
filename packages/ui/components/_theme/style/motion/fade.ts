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

export const fadeUp = new Keyframes('euiFadeUp', {
  '0%': {
    opacity: 0,
    transform: 'translate3d(0, 100%, 0)',
    transformOrigin: '0 0',
  },
  '100%': {
    opacity: 1,
    transformOrigin: '0 0',
    transform: 'translate3d(0, 0, 0)',
  },
});

export const fadeDown = new Keyframes('euiFadeDown', {
  '0%': {
    opacity: 1,
    transformOrigin: '0 0',
    transform: 'translate3d(0, 0, 0)',
  },
  '100%': {
    opacity: 0,
    transformOrigin: '0 0',
    transform: 'translate3d(0, 100%, 0)',
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

      [`${sameLevelPrefix}${motionCls}-exit`]: {
        animationTimingFunction: 'linear',
      },
    },
  ];
};

export const initFadeUpMotion = (token: TokenWithCommonCls<AliasToken>, sameLevel = false): CSSInterpolation => {
  const { euiCls } = token;
  const motionCls = `${euiCls}-fade-up`;
  const sameLevelPrefix = sameLevel ? '&' : '';

  return [
    initMotion(motionCls, fadeUp, fadeDown, token.motions.durationMid, sameLevel),
    {
      [`
        ${sameLevelPrefix}${motionCls}-enter,
        ${sameLevelPrefix}${motionCls}-appear
      `]: {
        opacity: 0,
        animationTimingFunction: 'linear',
      },

      [`${sameLevelPrefix}${motionCls}-exit`]: {
        animationTimingFunction: 'linear',
      },
    },
  ];
};
