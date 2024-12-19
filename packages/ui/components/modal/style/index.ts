import { unit } from '@/_cssinjs';
import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';
import { fade, zoom } from '@/_theme/style/motion';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

interface ModalToken extends FullToken<'Modal'> {
  previewCls: string;
}

const genModalStyle: GenerateStyle<ModalToken> = token => {
  const { componentCls, euiCls } = token;

  return [
    /**
     * root
     */
    {
      [`${componentCls}-root`]: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: token.zIndexPopupBase,
        '&-hide': {
          display: 'none',
        },

        [`${componentCls}-mask`]: {
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          background: token.colorBgMask,
        },
        [`&${componentCls}-rtl`]: {
          direction: 'rtl',

          [componentCls]: {
            '&-header': {
              [`${componentCls}-title`]: {
                textAlign: 'right',
              },
            },

            [`&-footer`]: {
              textAlign: 'unset',

              [`> ${euiCls}-btn`]: {
                marginLeft: 0,
                marginRight: token.margins.XS,

                '&:only-child': {
                  marginRight: 0,
                },
              },
            },

            '&-close-icon': {
              right: 'initial',
              left: token.paddings.MD / 2,
            },
          },
        },

        [`&${componentCls}-center`]: {
          textAlign: 'center',

          '&::after': {
            content: '""',
            verticalAlign: 'middle',
            display: 'inline-block',
            height: '100%',
            width: 0,
          },

          [`${componentCls}`]: {
            top: 0,
            verticalAlign: 'middle',
            display: 'inline-block',
          },
        },
      },
    },
    /**
     * modal
     */
    {
      [`${componentCls}-root`]: {
        [componentCls]: {
          boxSizing: 'border-box',
          padding: 0,
          color: token.colorText,
          fontSize: token.fonts.fontSize,
          lineHeight: token.fonts.lineHeight,
          listStyle: 'none',
          position: 'relative',
          top: 100,
          width: 520,
          maxWidth: `calc(100vw - ${unit(token.calc(token.margins.MD).mul(2).equal())})`,
          margin: '0 auto',
          borderRadius: token.rounded.MD,
          textAlign: 'left',
          pointerEvents: 'none',
          boxShadow: token.shadows.MD,

          '&-wrapper': {
            backgroundColor: token.colorBgElevated,
            borderRadius: token.rounded.MD,
            pointerEvents: 'auto',
          },

          '&-header': {
            // borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorderSecondary}`,
            display: 'flex',
            alignItems: 'center',

            [`${componentCls}-title`]: {
              flex: 1,
              padding: `${unit(token.paddings.MD)} ${unit(token.paddings.LG)}`,
              fontWeight: token.fonts.fontWeight,
              fontSize: token.fonts.fontSizeHeading5,
              lineHeight: token.fonts.lineHeightHeading5,
              wordWrap: 'break-word',

              [`${euiCls}-icon`]: {
                marginRight: token.margins.MD / 2,
                fontSize: token.fonts.fontSizeLG + 2,
                verticalAlign: '-3px',

                [`&-info-circle-fill`]: {
                  color: token.colorPrimarys[6],
                },
                [`&-check-circle-fill`]: {
                  color: token.colorSuccesses[6],
                },
                [`&-exclamation-circle-fill`]: {
                  color: token.colorWarnings[6],
                },
                [`&-close-circle-fill`]: {
                  color: token.colorErrors[6],
                },
              },
            },
          },
          '&-content': {
            padding: `${unit(token.paddings.MD)} ${unit(token.paddings.LG)}`,
          },
          '&-footer': {
            // borderTop: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorderSecondary}`,
            padding: `${unit(token.paddings.MD)} ${unit(token.paddings.LG)}`,
            textAlign: 'right',

            [`> ${euiCls}-btn`]: {
              marginLeft: token.margins.XS,

              '&:only-child': {
                marginLeft: 0,
              },
            },
          },
          '&-close-icon': {
            color: 'inherit',
            position: 'absolute',
            right: token.paddings.MD / 2,
            top: token.paddings.MD / 2,
          },
        },
      },
    },
  ];
};

const genModalMotion: GenerateStyle<ModalToken> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-root`]: {
      [`${componentCls}-mask`]: fade.initFadeMotion(token, 'fade', true),
      [componentCls]: zoom.initZoomMotion(token, 'zoom', true),
    },
  };
};

// ============================== Export ==============================
const prepareComponentToken: GetDefaultToken<'Modal'> = () => ({});

export default genStyleHooks(
  'Modal',
  token => {
    const modalToken = mergeToken<ModalToken>(token);

    return [genModalStyle(modalToken), genModalMotion(modalToken)];
  },
  prepareComponentToken,
);
