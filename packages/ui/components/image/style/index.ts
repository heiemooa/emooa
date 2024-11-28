import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';
import { fade, zoom } from '@/_theme/style/motion';
import genImagePreviewStyle from './image-preview';
import { Keyframes } from '@/_cssinjs';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

interface ImageToken extends FullToken<'Image'> {
  previewCls: string;
}

const flip = new Keyframes('flip', {
  '0%': {
    transform: 'perspective(120px) rotateX(0) rotateY(0)',
  },
  '25%': {
    transform: 'perspective(120px) rotateX(-180deg) rotateY(0)',
  },
  '50%': {
    transform: 'perspective(120px) rotateX(-180deg) rotateY(-180deg)',
  },
  '75%': {
    transform: 'perspective(120px) rotateX(0) rotateY(-180deg)',
  },
  '100%': {
    transform: 'perspective(120px) rotateX(0) rotateY(-360deg)',
  },
});

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
          animationName: zoom.zoomBigIn,
          animationDuration: '.7s',
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
          flexDirection: 'column',
          wordBreak: 'break-word',
          padding: token.paddings.XS,

          [`${componentCls}-error-icon`]: {
            fontSize: '4em',
          },
        },

        [`${componentCls}-loader`]: {
          height: '100%',
          width: '100%',
          background: token.colorWhite,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: token.colorTextSecondary,

          [`${componentCls}-loader-spin`]: {
            fontSize: token.fonts.fontSize,
            textAlign: 'center',

            'svg.eui-icon': {
              margin: 'auto',
              fontSize: '2em',
            },
          },

          [`${componentCls}-loader-placeholder`]: {
            filter: 'blur(5px)',
            transform: 'scale(1.2)',
            transition: `all ${token.motions.durationMid} ${token.motions.standard}`,
          },

          [`${componentCls}-loader-compnent`]: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: token.colorWhite,

            [`${componentCls}-loader-squre-spin`]: {
              width: '4em',
              height: '4em',
              display: 'block',
              borderRadius: token.rounded.SM,
              backdropFilter: 'saturate(180%) blur(20px)',
              backgroundColor: '#ffffffb8',
              animationName: flip,
              animationDuration: '3s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDirection: 'alternate',
              animationDelay: '.1s',
              transition: `all ${token.motions.durationMid} ${token.motions.standard}`,
            },

            '&.false': {
              color: token.colorText,
              [`${componentCls}-loader-squre-spin`]: {
                backgroundColor: '#dfdfdf',
              },
            },
          },
        },
      },

      '&-with-footer-inner': {
        [`${componentCls}-footer`]: {
          background: 'linear-gradient(1turn,rgba(0,0,0,.3),transparent)',
          boxSizing: 'border-box',
          paddingInline: token.paddings.XS,
          paddingBlock: token.paddings.XXS,
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
            fontSize: token.fonts.fontSizeHeading5,
            fontWeight: token.fonts.fontWeightStrong,
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
            borderRadius: token.rounded.MD,
            cursor: 'pointer',
          },
        },
      },
    },
  };
};

const genPreviewMotion: GenerateStyle<ImageToken> = token => {
  const { previewCls } = token;

  return {
    [`${previewCls}`]: {
      [`${previewCls}-mask`]: fade.initFadeMotion(token, 'fade', true),
      [`&`]: zoom.initZoomMotion(token, 'zoom'),
    },
  };
};

// ============================== Export ==============================
const prepareComponentToken: GetDefaultToken<'Image'> = () => ({});

export default genStyleHooks(
  'Image',
  token => {
    const previewCls = `${token.componentCls}-preview`;
    const imageToken = mergeToken<ImageToken>(token, { previewCls });

    return [genImageStyle(imageToken), genImagePreviewStyle(imageToken), genPreviewMotion(imageToken)];
  },
  prepareComponentToken,
);
