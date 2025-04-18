import { FullToken, GenerateStyle } from '@/_theme/internal';
import { fade } from '@/_theme/style/motion';

interface ImagePreview extends FullToken<'Image'> {
  previewCls: string;
}

const genImagePreviewStyle: GenerateStyle<ImagePreview> = token => {
  const { previewCls } = token;

  return {
    [previewCls]: [
      {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: token.zIndexPopupBase,

        '&-hide': {
          display: 'none',
        },

        '&-custom-popup': {
          zIndex: 'inherit',
          position: 'absolute',
        },

        [`${previewCls}-mask, ${previewCls}-wrapper`]: {
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        },
        [`${previewCls}-mask`]: {
          background: token.colorBgMask,
        },

        [`${previewCls}-img-focus-lock`]: {
          width: '100%',
          height: '100%',
          pointerEvents: 'none',

          '& > *': {
            pointerEvents: 'auto',
          },
        },

        [`${previewCls}-img-container`]: {
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

          [`& > :first-child`]: {
            display: 'inline-block',
            maxWidth: '100%',
            maxHeight: '100%',
            verticalAlign: 'middle',
          },

          [`${previewCls}-img`]: {
            display: 'inline-block',
            maxWidth: '100%',
            maxHeight: '100%',
            verticalAlign: 'middle',
            userSelect: 'none',
            cursor: 'grab',
            transition: `transform ${token.motions.durationSlow} ${token.motions.decelerate} 0s`,
          },
        },

        [`${previewCls}-scale-value`]: {
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          color: token.colorWhite,
        },

        [`${previewCls}-tools`]: {
          position: 'absolute',
          left: '50%',
          bottom: '48px',
          transform: 'translate(-50%, 0%)',
          color: '#fefefe',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: token.colorBgMask,
          borderRadius: token.rounded.MD,
          padding: token.paddings.XXS,
          boxShadow: token.shadows.XS,

          [`${previewCls}-tools-action`]: {
            borderRadius: token.rounded.MD,
            cursor: 'pointer',
            padding: token.paddings.SM,
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

          [`${previewCls}-tools-progress`]: {
            fontSize: token.fonts.fontSizeSM,
            userSelect: 'none',
          },
        },

        [`${previewCls}-close`]: {
          position: 'absolute',
          right: token.margins.XL,
          top: token.margins.XL,
          color: '#fefefe',
          display: 'flex',
          alignItems: 'flex-start',
          backgroundColor: token.colorBgMask,
          borderRadius: '50%',
          padding: token.paddings.SM,
          cursor: 'pointer',
          boxShadow: token.shadows.MD,

          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            color: token.colorWhite,
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
        },

        [`${previewCls}-loading`]: {
          animationName: fade.fadeIn,
          animationDuration: token.motions.durationSlow,
          animationTimingFunction: token.motions.decelerate,
          fontSize: token.fonts.fontSizeXL,
          padding: token.paddings.XL,
          borderRadius: token.rounded.MD,
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
        [`${previewCls}-arrow`]: {
          [`${previewCls}-arrow-left, ${previewCls}-arrow-right`]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            borderRadius: '50%',
            color: '#fefefe',
            backgroundColor: 'rgba(255, 255,255, 0.3)',
            cursor: 'pointer',
            padding: token.paddings.SM,

            '&:hover': {
              backgroundColor: 'rgba(255, 255,255, 0.4)',
            },

            [`&${previewCls}-arrow-disabled, &${previewCls}-arrow-disabled:hover`]: {
              color: 'rgba(255, 255,255, 0.3)',
              backgroundColor: 'rgba(255, 255,255, 0.2)',
              cursor: 'not-allowed',
            },
          },
          [`${previewCls}-arrow-left`]: {
            left: token.margins.XL,
            top: '50%',
            transform: 'translateY(-50%)',
          },

          [`${previewCls}-arrow-right`]: {
            right: token.margins.XL,
            top: '50%',
            transform: 'translateY(-50%)',
          },
        },
      },
    ],
  };
};

export default genImagePreviewStyle;
