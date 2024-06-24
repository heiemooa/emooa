import { CSSInterpolation, Keyframes } from '@/_cssinjs';
import { AliasToken } from '@/_theme/interface';
import { TokenWithCommonCls } from '@/_theme/util/genStyleHooks';
import { initMotion } from './motions';

export const zoomIn = new Keyframes('euiZoomIn', {
  '0%': {
    transform: 'scale(0.2)',
    opacity: 0,
  },

  '100%': {
    transform: 'scale(1)',
    opacity: 1,
  },
});

export const zoomOut = new Keyframes('euiZoomOut', {
  '0%': {
    transform: 'scale(1)',
  },

  '100%': {
    transform: 'scale(0.2)',
    opacity: 0,
  },
});

export const zoomBigIn = new Keyframes('euiZoomBigIn', {
  '0%': {
    opacity: 0,
    transform: 'scale(1.2)',
  },
  '100%': {
    opacity: 1,
    transform: 'scale(1)',
  },
});

export const zoomBigOut = new Keyframes('euiZoomBigOut', {
  '0%': {
    transform: 'scale(1)',
  },

  '100%': {
    transform: 'scale(0.8)',
    opacity: 0,
  },
});

export const zoomUpIn = new Keyframes('euiZoomUpIn', {
  '0%': {
    transform: 'scale(0.8)',
    transformOrigin: '50% 0%',
    opacity: 0,
  },

  '100%': {
    transform: 'scale(1)',
    transformOrigin: '50% 0%',
  },
});

export const zoomUpOut = new Keyframes('euiZoomUpOut', {
  '0%': {
    transform: 'scale(1)',
    transformOrigin: '50% 0%',
  },

  '100%': {
    transform: 'scale(0.8)',
    transformOrigin: '50% 0%',
    opacity: 0,
  },
});

export const zoomLeftIn = new Keyframes('euiZoomLeftIn', {
  '0%': {
    transform: 'scale(0.8)',
    transformOrigin: '0% 50%',
    opacity: 0,
  },

  '100%': {
    transform: 'scale(1)',
    transformOrigin: '0% 50%',
  },
});

export const zoomLeftOut = new Keyframes('euiZoomLeftOut', {
  '0%': {
    transform: 'scale(1)',
    transformOrigin: '0% 50%',
  },

  '100%': {
    transform: 'scale(0.8)',
    transformOrigin: '0% 50%',
    opacity: 0,
  },
});

export const zoomRightIn = new Keyframes('euiZoomRightIn', {
  '0%': {
    transform: 'scale(0.8)',
    transformOrigin: '100% 50%',
    opacity: 0,
  },

  '100%': {
    transform: 'scale(1)',
    transformOrigin: '100% 50%',
  },
});

export const zoomRightOut = new Keyframes('euiZoomRightOut', {
  '0%': {
    transform: 'scale(1)',
    transformOrigin: '100% 50%',
  },

  '100%': {
    transform: 'scale(0.8)',
    transformOrigin: '100% 50%',
    opacity: 0,
  },
});

export const zoomDownIn = new Keyframes('euiZoomDownIn', {
  '0%': {
    transform: 'scale(0.8)',
    transformOrigin: '50% 100%',
    opacity: 0,
  },

  '100%': {
    transform: 'scale(1)',
    transformOrigin: '50% 100%',
  },
});

export const zoomDownOut = new Keyframes('euiZoomDownOut', {
  '0%': {
    transform: 'scale(1)',
    transformOrigin: '50% 100%',
  },

  '100%': {
    transform: 'scale(0.8)',
    transformOrigin: '50% 100%',
    opacity: 0,
  },
});

type ZoomMotionTypes = 'zoom' | 'zoom-big' | 'zoom-big-fast' | 'zoom-left' | 'zoom-right' | 'zoom-up' | 'zoom-down';

const zoomMotion: Record<ZoomMotionTypes, { inKeyframes: Keyframes; outKeyframes: Keyframes }> = {
  zoom: {
    inKeyframes: zoomIn,
    outKeyframes: zoomOut,
  },
  'zoom-big': {
    inKeyframes: zoomBigIn,
    outKeyframes: zoomBigOut,
  },
  'zoom-big-fast': {
    inKeyframes: zoomBigIn,
    outKeyframes: zoomBigOut,
  },
  'zoom-left': {
    inKeyframes: zoomLeftIn,
    outKeyframes: zoomLeftOut,
  },
  'zoom-right': {
    inKeyframes: zoomRightIn,
    outKeyframes: zoomRightOut,
  },
  'zoom-up': {
    inKeyframes: zoomUpIn,
    outKeyframes: zoomUpOut,
  },
  'zoom-down': {
    inKeyframes: zoomDownIn,
    outKeyframes: zoomDownOut,
  },
};

export const initZoomMotion = (
  token: TokenWithCommonCls<AliasToken>,
  motionName: ZoomMotionTypes,
): CSSInterpolation => {
  const { euiCls } = token;
  const motionCls = `${euiCls}-${motionName}`;
  const { inKeyframes, outKeyframes } = zoomMotion[motionName];

  return [
    initMotion(motionCls, inKeyframes, outKeyframes, token.motions.durationMid),
    {
      [`
        ${motionCls}-enter,
        ${motionCls}-appear
      `]: {
        transform: 'scale(0)',
        opacity: 0,
        animationTimingFunction: 'cubic-bezier(0.08, 0.82, 0.17, 1)',

        '&-prepare': {
          transform: 'none',
        },
      },

      [`${motionCls}-exit`]: {
        animationTimingFunction: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
      },
    },
  ];
};
