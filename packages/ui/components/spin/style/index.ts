import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';
import genSpinDotStyle from './dot';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

interface SpinToken extends FullToken<'Spin'> {
  dotCls: string;
}

const genSpinStyle: GenerateStyle<SpinToken> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'relative',
      color: token.colorPrimarys[6],

      [`&-icon-only`]: {
        [`&${componentCls}-with-loading`]: {
          display: 'inline-block',
        },
      },

      [`${componentCls}-loading`]: {
        userSelect: 'none',
        textAlign: 'center',

        [`${componentCls}-icon`]: {
          fontSize: token.fonts.fontSizeXL,
        },

        [`${componentCls}-tip`]: {
          fontSize: token.fonts.fontSize,
          marginTop: token.margins.XS,
          fontWeight: token.fonts.fontWeight,
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
            backgroundColor: token.colorBgMask,
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
      },
    },
  };
};

const genSpinSizeStyle: GenerateStyle<SpinToken> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-mini`]: {
      [`${componentCls}-loading`]: {
        [`${componentCls}-icon`]: {
          fontSize: token.sizes.SM,
        },
        [`${componentCls}-tip`]: {
          fontSize: token.fonts.fontSizeSM,
        },
      },
    },
    [`${componentCls}-small`]: {
      [`${componentCls}-loading`]: {
        [`${componentCls}-icon`]: {
          fontSize: token.sizes.MD,
        },
        [`${componentCls}-tip`]: {
          fontSize: token.fonts.fontSizeSM,
        },
      },
    },
    [`${componentCls}-medium`]: {
      [`${componentCls}-loading`]: {
        [`${componentCls}-icon`]: {
          fontSize: token.sizes.LG,
        },
        [`${componentCls}-tip`]: {
          fontSize: token.fonts.fontSize,
        },
      },
    },
    [`${componentCls}-large`]: {
      [`${componentCls}-loading`]: {
        [`${componentCls}-icon`]: {
          fontSize: token.sizes.XXL,
        },
        [`${componentCls}-tip`]: {
          fontSize: token.fonts.fontSizeLG,
        },
      },
    },
  };
};

// ============================== Export ==============================
const prepareComponentToken: GetDefaultToken<'Spin'> = () => ({});

export default genStyleHooks(
  'Spin',
  token => {
    const dotCls = `${token.componentCls}-dot`;
    const spinToken = mergeToken<SpinToken>(token, { dotCls });

    return [genSpinStyle(spinToken), genSpinSizeStyle(spinToken), genSpinDotStyle(spinToken)];
  },
  prepareComponentToken,
);
