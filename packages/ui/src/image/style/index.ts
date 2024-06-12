import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';
import { zoomIn, zoomOut } from '@/_theme/style/motion';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

interface ImageToken extends FullToken<'Image'> {}

const genImageStyle: GenerateStyle<ImageToken> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'relative',
      display: 'inline-block',
      verticalAlign: 'middle',
      overflow: 'hidden',

      '&-rtl': {
        direction: 'rtl',
      },

      '&-loading,&-loading-error': {
        [`${componentCls}-img`]: {
          visibility: 'hidden',
        },
      },

      [`&-motion > ${componentCls}-img`]: {
        '&[image-lazy="loaded"]': {
          animationName: zoomIn,
          animationDuration: token.motions.durationMid,
          animationTimingFunction: token.motions.decelerate,
        },
      },

      [`${componentCls}-overlay`]: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,

        [`${componentCls}-error`]: {
          height: '100%',
          minWidth: '100%',
          background: token.colorBgLayout,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: token.colorTextPlaceholder,

          [`${componentCls}-error-icon`]: {
            fontSize: '4em',
          },
        },

        [`${componentCls}-loader`]: {
          height: '100%',
          width: '100%',
          background: token.colorBgLayout,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: token.colorTextSecondary,

          [`${componentCls}-loader-spin`]: {
            fontSize: '2em',
          },

          [`${componentCls}-loader-placeholder`]: {
            filter: 'blur(5px)',
            transition: `all ${token.motions.durationMid} ${token.motions.standard}`,
          },
        },
      },
    },
  };
};

// ============================== Export ==============================
export const prepareComponentToken: GetDefaultToken<'Image'> = () => ({});

export default genStyleHooks(
  'Image',
  token => {
    const imageToken = mergeToken<ImageToken>(token, {});
    return [genImageStyle(imageToken)];
  },
  prepareComponentToken,
);
