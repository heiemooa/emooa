import { FullToken, GenerateStyle } from '@/_theme/internal';
import { fade } from '@/_theme/style/motion';

interface ImagePreview extends FullToken<'Image'> {}

const genImagePreviewStyle: GenerateStyle<ImagePreview> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-preview`]: [
      {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: token.zIndexPopupBase,

        [`&-custom-popup`]: {
          zIndex: 'inherit',
          position: 'absolute',
        },

        [`${componentCls}-preview-mask, ${componentCls}-preview-wrapper`]: {
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        },
        [`${componentCls}-preview-mask`]: {
          background: token.colorBgMask,
        },

        [`${componentCls}-preview-img-container`]: {
          width: '100%',
          height: '100%',
          textAlign: 'center',

          '&::before': {
            content: '""',
            width: 0,
            height: '100%',
            verticalAlign: 'middle',
            display: 'inline-block',
          },

          [`${componentCls}-preview-img`]: {
            maxWidth: '100%',
            maxHeight: '100%',
            verticalAlign: 'middle',
            userSelect: 'none',
            cursor: 'grab',
            transition: `transform ${token.motions.durationMid} ${token.motions.decelerate} 0s`,
          },
        },

        [`${componentCls}-preview-scale-value`]: {
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          color: token.colorWhite,

          // [`&`]: {
          //   animationName: fade.fadeIn,
          //   animationDuration: token.motions.durationSlow,
          //   animationTimingFunction: token.motions.decelerate,
          // },
        },

        [`${componentCls}-preview-tools`]: {
          position: 'absolute',
          left: '50%',
          bottom: '48px',
          transform: 'translate(-50%, 0%)',
          color: '#fefefe',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: token.colorBgMask,
          borderRadius: token.borderRadius,
          padding: token.paddingXXS,

          [`${componentCls}-preview-tools-action`]: {
            borderRadius: token.borderRadius,
            cursor: 'pointer',
            padding: token.paddingSM,
            lineHeight: 1,

            '&:hover': {
              backgroundColor: 'rgba(255, 255,255, 0.1)',
              color: token.colorWhite,
            },
            '&:active': {
              transform: 'scale(0.95)',
            },
            '&-disabled, &-disabled:hover': {
              color: 'rgba(255, 255,255, 0.3)',
              cursor: 'not-allowed',
            },
          },

          [`${componentCls}-preview-tools-progress`]: {
            fontSize: token.fontSizeSM,
          },
        },

        [`${componentCls}-preview-close`]: {
          position: 'absolute',
          right: token.marginXL,
          top: token.marginXL,
          color: '#fefefe',
          display: 'flex',
          alignItems: 'flex-start',
          backgroundColor: token.colorBgMask,
          borderRadius: '50%',
          padding: token.paddingSM,
          cursor: 'pointer',

          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            color: token.colorWhite,
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
        },

        [`${componentCls}-preview-loading`]: {
          animationName: fade.fadeIn,
          animationDuration: token.motions.durationSlow,
          animationTimingFunction: token.motions.decelerate,
          fontSize: token.fontSizeXL,
          padding: token.paddingXL,
          borderRadius: token.borderRadius,
          backgroundColor: 'rgba(255, 255,255, 0.1)',
          color: token.colorTextSecondary,
          textAlign: 'center',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        },
        [`${componentCls}-preview-arrow`]: {
          [`${componentCls}-preview-arrow-left, ${componentCls}-preview-arrow-right`]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            borderRadius: '50%',
            color: '#fefefe',
            backgroundColor: 'rgba(255, 255,255, 0.3)',
            cursor: 'pointer',
            padding: token.paddingSM,

            '&:hover': {
              backgroundColor: 'rgba(255, 255,255, 0.4)',
            },

            [`&${componentCls}-preview-arrow-disabled, &${componentCls}-preview-arrow-disabled:hover`]: {
              color: 'rgba(255, 255,255, 0.3)',
              backgroundColor: 'rgba(255, 255,255, 0.2)',
              cursor: 'not-allowed',
            },
          },
          [`${componentCls}-preview-arrow-left`]: {
            left: token.marginXL,
            top: '50%',
            transform: 'translateY(-50%)',
          },

          [`${componentCls}-preview-arrow-right`]: {
            right: token.marginXL,
            top: '50%',
            transform: 'translateY(-50%)',
          },
        },
      },
    ],
  };
};

export default genImagePreviewStyle;