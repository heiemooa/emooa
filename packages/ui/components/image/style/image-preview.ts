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
          color: token.colorTextLightSolid,

          // [`&`]: {
          //   animationName: fade.fadeIn,
          //   animationDuration: token.motions.durationSlow,
          //   animationTimingFunction: token.motions.decelerate,
          // },
        },
      },
    ],
  };
};

export default genImagePreviewStyle;
