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
      '&-block': {
        display: 'block',
      },
      '&-width-tip': {
        textAlign: 'center',
      },

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

      [`${componentCls}-loading`]: {
        textAlign: 'center',
        userSelect: 'none',

        [`${componentCls}-loading-inner`]: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
        },
      },

      [`${componentCls}-container`]: {
        position: 'relative',

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
          transition: 'opacity .1s linear',
          pointerEvents: 'none',
          zIndex: 1,
        },
      },

      '&-with-loading': {
        position: 'relative',
        userSelect: 'none',

        [`${componentCls}-container::after`]: {
          opacity: 1,
          pointerEvents: 'auto',
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
    const spinToken = mergeToken<SpinToken>(token, {});
    return [genSpinStyle(spinToken)];
  },
  prepareComponentToken,
);
