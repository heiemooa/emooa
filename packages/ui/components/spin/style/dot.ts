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
        width: token.sizes.MD * 10,
        height: token.sizes.MD * 3,

        [`${dotCls}-item`]: {
          width: token.sizes.MD,
          height: token.sizes.MD,
          position: 'absolute',
          borderRadius: '50%',
          backgroundColor: token.colorPrimarys[6],
          left: '15%',
          transformOrigin: '50%',
          animationName: spinDot(token.sizes.MD),
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
          width: token.sizes.MD,
          height: token.sizes.XXS,

          position: 'absolute',
          borderRadius: '50%',
          backgroundColor: 'rgba(0,0,0,.5)',
          top: token.sizes.MD * 3,
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
      width: token.sizes.SM * 10,
      height: token.sizes.SM * 3,
      [`${dotCls}-item`]: {
        width: token.sizes.SM,
        height: token.sizes.SM,
        animationName: spinDot(token.sizes.SM),
      },
      [`${dotCls}-shadow`]: {
        width: token.sizes.SM,
        top: token.sizes.SM * 3,
      },
    },
    [`${dotCls}-mini`]: {
      width: token.sizes.XS * 10,
      height: token.sizes.XS * 3,
      [`${dotCls}-item`]: {
        width: token.sizes.XS,
        height: token.sizes.XS,
        animationName: spinDot(token.sizes.XS),
      },
      [`${dotCls}-shadow`]: {
        width: token.sizes.XS,
        top: token.sizes.XS * 3,
      },
    },
    [`${dotCls}-large`]: {
      width: token.sizes.LG * 10,
      height: token.sizes.LG * 3,
      [`${dotCls}-item`]: {
        width: token.sizes.LG,
        height: token.sizes.LG,
        animationName: spinDot(token.sizes.LG),
      },
      [`${dotCls}-shadow`]: {
        width: token.sizes.LG,
        top: token.sizes.LG * 3,
      },
    },
  };
};

export default genSpinDotStyle;
