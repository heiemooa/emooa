import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

interface SpinToken extends FullToken<'Spin'> {}

const genSpinStyle: GenerateStyle<SpinToken> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'relative',

      [`&-icon-only`]: {
        [`&${componentCls}-with-loading`]: {
          display: 'inline-block',
        },
      },

      [`${componentCls}-loading`]: {
        userSelect: 'none',
        textAlign: 'center',

        [`${componentCls}-icon`]: {
          color: token.colorPrimary,
          fontSize: token.fontSizeXL,
        },

        [`${componentCls}-tip`]: {
          fontSize: token.fontSize,
          marginTop: token.marginXXS,
          fontWeight: token.fontWeight,
          color: token.colorPrimary,
        },
      },

      [`&:not(&-icon-only):not(&-full)`]: {
        [`${componentCls}-container`]: {
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            opacity: 0,
            transition: `opacity ${token.motions.durationFast} linear`,
            pointerEvents: 'none',
          },
        },

        [`&${componentCls}-with-loading`]: {
          [`${componentCls}-container::after`]: {
            opacity: 1,
            pointerEvents: 'auto',
          },
        },

        [`${componentCls}-loading`]: {
          [`${componentCls}-loading-inner`]: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          },
        },
      },

      '&-full': {
        content: '""',
        position: 'fixed',
        opacity: 0,
        height: '100vh',
        width: '100vw',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        transition: `opacity ${token.motions.durationFast} linear`,
        pointerEvents: 'none',
        zIndex: token.zIndexPopupBase,

        [`${componentCls}-loading`]: {
          [`${componentCls}-loading-inner`]: {
            zIndex: token.zIndexPopupBase + 1,
            position: 'fixed',
            top: '50vh',
            left: '50vw',
            transform: 'translate(-50%, -50%)',
          },
        },

        [`&${componentCls}-with-loading`]: {
          opacity: 1,
          pointerEvents: 'auto',
        },

        // '&::after': {
        //   content: '""',
        //   position: 'fixed',
        //   opacity: 1,
        //   height: '100vh',
        //   width: '100vw',
        //   left: 0,
        //   top: 0,
        //   right: 0,
        //   bottom: 0,
        //   backgroundColor: 'rgba(255, 255, 255, 0.6)',
        //   transition: `opacity ${token.motions.durationFast} linear`,
        //   pointerEvents: 'none',
        //   zIndex: token.zIndexPopupBase,
        // },
      },
    },
  };
};

// ============================== Export ==============================
const prepareComponentToken: GetDefaultToken<'Spin'> = () => ({});

export default genStyleHooks(
  'Spin',
  token => {
    const spinToken = mergeToken<SpinToken>(token, {});
    return [genSpinStyle(spinToken)];
  },
  prepareComponentToken,
);
