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

export const fadeUpOut = new Keyframes('euiFadeUpOut', {
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

export const fadeDown = new Keyframes('euiFadeDown', {
  '0%': {
    opacity: 0,
    transformOrigin: '0 0',
    transform: 'translate3d(0, -100%, 0)',
  },
  '100%': {
    opacity: 1,
    transformOrigin: '0 0',
    transform: 'translate3d(0, 0, 0)',
  },
});

export const fadeDownOut = new Keyframes('euiFadeDownOut', {
  '0%': {
    opacity: 1,
    transformOrigin: '0 0',
    transform: 'translate3d(0, 0, 0)',
  },
  '100%': {
    opacity: 0,
    transformOrigin: '0 0',
    transform: 'translate3d(0, -100%, 0)',
  },
});

export const fadeLeft = new Keyframes('euiFadeLeft', {
  '0%': {
    opacity: 0,
    transform: 'translate3d(100%, 0, 0)',
    transformOrigin: '0 0',
  },
  '100%': {
    opacity: 1,
    transformOrigin: '0 0',
    transform: 'translate3d(0, 0, 0)',
  },
});

export const fadeLeftOut = new Keyframes('euiFadeLeftOut', {
  '0%': {
    opacity: 1,
    transformOrigin: '0 0',
    transform: 'translate3d(0, 0, 0)',
  },
  '100%': {
    opacity: 0,
    transformOrigin: '0 0',
    transform: 'translate3d(100%, 0, 0)',
  },
});

export const fadeRight = new Keyframes('euiFadeRight', {
  '0%': {
    opacity: 0,
    transform: 'translate3d(-100%, 0, 0)',
    transformOrigin: '0 0',
  },
  '100%': {
    opacity: 1,
    transformOrigin: '0 0',
    transform: 'translate3d(0, 0, 0)',
  },
});

export const fadeRightOut = new Keyframes('euiFadeRightOut', {
  '0%': {
    opacity: 1,
    transformOrigin: '0 0',
    transform: 'translate3d(0, 0, 0)',
  },
  '100%': {
    opacity: 0,
    transformOrigin: '0 0',
    transform: 'translate3d(-100%, 0, 0)',
  },
});

type FadeMotionTypes = 'fade' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right';

const fadeMotion: Record<FadeMotionTypes, { inKeyframes: Keyframes; outKeyframes: Keyframes }> = {
  fade: {
    inKeyframes: fadeIn,
    outKeyframes: fadeOut,
  },
  'fade-up': {
    inKeyframes: fadeUp,
    outKeyframes: fadeUpOut,
  },
  'fade-down': {
    inKeyframes: fadeDown,
    outKeyframes: fadeDownOut,
  },
  'fade-left': {
    inKeyframes: fadeLeft,
    outKeyframes: fadeLeftOut,
  },
  'fade-right': {
    inKeyframes: fadeRight,
    outKeyframes: fadeRightOut,
  },
};

export const initFadeMotion = (
  token: TokenWithCommonCls<AliasToken>,
  motionName: FadeMotionTypes = 'fade',
  sameLevel: boolean,
): CSSInterpolation => {
  const { euiCls } = token;
  const motionCls = `${euiCls}-${motionName}`;
  const sameLevelPrefix = '&';

  const { inKeyframes, outKeyframes } = fadeMotion[motionName];

  return [
    initMotion(motionCls, inKeyframes, outKeyframes, token.motions.durationMid, sameLevel),
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
