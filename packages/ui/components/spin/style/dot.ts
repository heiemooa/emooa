import { Keyframes } from '@/_cssinjs';
import { FullToken, GenerateStyle } from '@/_theme/internal';

interface Dot extends FullToken<'Spin'> {
  dotCls: string;
}

const spinDot = size =>
  new Keyframes(`dot-${size}`, {
    '0%': {
      top: size * 3 - 2,
      height: size / 4,
      borderRadius: '50px 50px 25px 25px',
      transform: 'scaleX(1.7)',
      opacity: '.7',
    },
    '40%': {
      height: size + size / 4,
      borderRadius: '50%',
      transform: 'scaleX(1)',
    },
    '100%': {
      top: '0%',
    },
  });

const shadow = new Keyframes('shadow', {
  '0%': {
    transform: 'scaleX(1.5)',
  },
  '40%': {
    transform: 'scaleX(1)',
    opacity: '.7',
  },
  '100%': {
    transform: 'scaleX(.2)',
    opacity: '.4',
  },
});

const genSpinDotStyle: GenerateStyle<Dot> = token => {
  const { dotCls } = token;

  return {
    [dotCls]: [
      {
        opacity: 0,
        width: token.size * 10,
        height: token.size * 3,

        [`${dotCls}-item`]: {
          width: token.size,
          height: token.size,
          position: 'absolute',
          borderRadius: '50%',
          backgroundColor: token.colorPrimary,
          left: '15%',
          transformOrigin: '50%',
          animationName: spinDot(token.size),
          animationDuration: '.5s',
          animationTimingFunction: 'ease',
          animationIterationCount: 'infinite',
          animationDirection: 'alternate',
          animationDelay: '.1s',

          [`&:nth-child(2)`]: {
            left: '45%',
            animationDelay: '.2s',
          },
          [`&:nth-child(3)`]: {
            left: 'auto',
            right: '15%',
            animationDelay: '.3s',
          },
        },
        [`${dotCls}-shadow`]: {
          width: token.size,
          height: token.sizeXXS,

          position: 'absolute',
          borderRadius: '50%',
          backgroundColor: 'rgba(0,0,0,.5)',
          top: token.size * 3,
          left: '15%',
          transformOrigin: '50%',
          filter: 'blur(1px)',
          animationName: shadow,
          animationDuration: '.5s',
          animationTimingFunction: 'ease',
          animationIterationCount: 'infinite',
          animationDirection: 'alternate',
          animationDelay: '.1s',

          [`&:nth-child(4)`]: {
            left: '45%',
            animationDelay: '.2s',
          },
          [`&:nth-child(5)`]: {
            left: 'auto',
            right: '15%',
            animationDelay: '.3s',
          },
        },
      },
    ],
    [`${dotCls}-small`]: {
      width: token.sizeSM * 10,
      height: token.sizeSM * 3,
      [`${dotCls}-item`]: {
        width: token.sizeSM,
        height: token.sizeSM,
        animationName: spinDot(token.sizeSM),
      },
      [`${dotCls}-shadow`]: {
        width: token.sizeSM,
        top: token.sizeSM * 3,
      },
    },
    [`${dotCls}-mini`]: {
      width: token.sizeXS * 10,
      height: token.sizeXS * 3,
      [`${dotCls}-item`]: {
        width: token.sizeXS,
        height: token.sizeXS,
        animationName: spinDot(token.sizeXS),
      },
      [`${dotCls}-shadow`]: {
        width: token.sizeXS,
        top: token.sizeXS * 3,
      },
    },
    [`${dotCls}-large`]: {
      width: token.sizeLG * 10,
      height: token.sizeLG * 3,
      [`${dotCls}-item`]: {
        width: token.sizeLG,
        height: token.sizeLG,
        animationName: spinDot(token.sizeLG),
      },
      [`${dotCls}-shadow`]: {
        width: token.sizeLG,
        top: token.sizeLG * 3,
      },
    },
  };
};

export default genSpinDotStyle;
