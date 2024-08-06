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

        [`${componentCls}-mask, ${componentCls}-wrapper`]: {
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        },
        [`${componentCls}-mask`]: {
          background: token.colorBgMask,
        },
        [`${componentCls}-wrapper`]: {
          overflow: 'auto',
          [`&${componentCls}-wrapper-center`]: {
            whiteSpace: 'nowrap',
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
                  marginRight: token.marginXS,

                  '&:only-child': {
                    marginRight: 0,
                  },
                },
              },

              '&-close-icon': {
                right: 'initial',
                left: token.padding / 2,
              },
            },
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
          fontSize: token.fontSize,
          lineHeight: token.lineHeight,
          listStyle: 'none',
          position: 'relative',
          top: 100,
          width: 520,
          maxWidth: `calc(100vw - ${unit(token.calc(token.margin).mul(2).equal())})`,
          margin: '0 auto',
          borderRadius: token.borderRadius,
          textAlign: 'left',
          pointerEvents: 'none',

          '&-body': {
            backgroundColor: token.colorBgElevated,
            borderRadius: token.borderRadius,
            pointerEvents: 'auto',
          },

          '&-header': {
            // borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
            display: 'flex',
            alignItems: 'center',

            [`${componentCls}-title`]: {
              flex: 1,
              padding: `${unit(token.padding)} ${unit(token.paddingLG)}`,
              fontWeight: token.fontWeight,
              fontSize: token.fontSizeHeading5,
              lineHeight: token.lineHeightHeading5,
              wordWrap: 'break-word',

              [`${euiCls}-icon`]: {
                marginRight: token.margin / 2,
                fontSize: token.fontSizeLG + 2,
                verticalAlign: '-3px',

                [`&-info-circle-fill`]: {
                  color: token.colorPrimary,
                },
                [`&-check-circle-fill`]: {
                  color: token.colorSuccess,
                },
                [`&-exclamation-circle-fill`]: {
                  color: token.colorWarning,
                },
                [`&-close-circle-fill`]: {
                  color: token.colorError,
                },
              },
            },
          },
          '&-content': {
            padding: `${unit(token.padding)} ${unit(token.paddingLG)}`,
          },
          '&-footer': {
            // borderTop: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
            padding: `${unit(token.padding)} ${unit(token.paddingLG)}`,
            textAlign: 'right',

            [`> ${euiCls}-btn`]: {
              marginLeft: token.marginXS,

              '&:only-child': {
                marginLeft: 0,
              },
            },
          },
          '&-close-icon': {
            position: 'absolute',
            right: token.padding / 2,
            top: token.padding / 2,
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
      [`&`]: zoom.initZoomMotion(token, 'zoom'),
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
