import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';
import { zoom } from '@/_theme/style/motion';
import genImagePreviewStyle from './image-preview';

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

      [`${componentCls}-img`]: {
        verticalAlign: 'middle',
      },

      '&-with-preview': {
        [`${componentCls}-img`]: {
          cursor: 'zoom-in',
        },
      },

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
          animationName: zoom.zoomIn,
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
            transform: 'scale(1.2)',
            transition: `all ${token.motions.durationMid} ${token.motions.standard}`,
          },
        },
      },

      '&-with-footer-inner': {
        [`${componentCls}-footer`]: {
          background: 'linear-gradient(1turn,rgba(0,0,0,.3),transparent)',
          boxSizing: 'border-box',
          paddingInline: token.paddingXS,
          paddingBlock: token.paddingXXS,
          alignItems: 'center',
          position: 'absolute',
          left: 0,
          bottom: 0,
          color: token.colorWhite,
        },
      },

      [`${componentCls}-footer`]: {
        width: '100%',
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'flex-end',

        '&-block': {
          flex: 'auto',
        },

        [`${componentCls}-caption`]: {
          '&-title': {
            fontSize: token.fontSizeHeading5,
            fontWeight: token.fontWeightStrong,
          },

          '&-description': {},
        },

        [`${componentCls}-actions`]: {
          '&-list': {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          },

          '&-item': {
            lineHeight: 1,
            borderRadius: token.borderRadius,
            cursor: 'pointer',
          },
        },
      },
    },
  };
};

// ============================== Export ==============================
const prepareComponentToken: GetDefaultToken<'Image'> = () => ({});

export default genStyleHooks(
  'Image',
  token => {
    const imageToken = mergeToken<ImageToken>(token, {});
    return [genImageStyle(imageToken), genImagePreviewStyle(imageToken)];
  },
  prepareComponentToken,
);
