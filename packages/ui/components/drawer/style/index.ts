import { unit } from '@/_cssinjs';
import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';
import { fade, zoom } from '@/_theme/style/motion';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

interface DrawerToken extends FullToken<'Drawer'> {
  previewCls: string;
}

const genModalStyle: GenerateStyle<DrawerToken> = token => {
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

        [`&${componentCls}-left > ${componentCls}`]: {
          top: 0,
          bottom: 0,
          left: {
            _skip_check_: true,
            value: 0,
          },
          width: 640,
          maxWidth: `calc(100vw - ${unit(token.calc(token.margins.MD).mul(2).equal())})`,
        },
        [`&${componentCls}-right > ${componentCls}`]: {
          top: 0,
          right: {
            _skip_check_: true,
            value: 0,
          },
          bottom: 0,
          width: 640,
          maxWidth: `calc(100vw - ${unit(token.calc(token.margins.MD).mul(2).equal())})`,
        },
        [`&${componentCls}-top > ${componentCls}`]: {
          top: 0,
          insetInline: 0,
          height: 380,
          maxHeight: `calc(100vh - ${unit(token.calc(token.margins.MD).mul(2).equal())})`,
        },
        [`&${componentCls}-bottom > ${componentCls}`]: {
          bottom: 0,
          insetInline: 0,
          height: 380,
          maxHeight: `calc(100vh - ${unit(token.calc(token.margins.MD).mul(2).equal())})`,
        },

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
      },
    },

    {
      [`${componentCls}-root`]: {
        [componentCls]: {
          boxSizing: 'border-box',
          padding: 0,
          color: token.colorText,
          fontSize: token.fonts.fontSize,
          lineHeight: token.fonts.lineHeight,
          listStyle: 'none',
          position: 'absolute',
          margin: '0 auto',
          textAlign: 'left',
          pointerEvents: 'auto',

          '&-wrapper': {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            transition: `all ${token.motions.durationMid} ${token.motions.linear}`,
            backgroundColor: token.colorBgElevated,
          },

          '&-header': {
            borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorderSecondary}`,
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
            flex: 1,
            overflow: 'auto',
          },
          '&-footer': {
            borderTop: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorderSecondary}`,
            padding: `${unit(token.paddings.MD)} ${unit(token.paddings.LG)}`,

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

const genModalMotion: GenerateStyle<DrawerToken> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-root`]: {
      [`${componentCls}-mask`]: fade.initFadeMotion(token, 'fade', true),
      [componentCls]: [
        fade.initFadeMotion(token, 'fade-up', true),
        fade.initFadeMotion(token, 'fade-down', true),
        fade.initFadeMotion(token, 'fade-left', true),
        fade.initFadeMotion(token, 'fade-right', true),
      ],
    },
  };
};

// ============================== Export ==============================
const prepareComponentToken: GetDefaultToken<'Drawer'> = () => ({});

export default genStyleHooks(
  'Drawer',
  token => {
    const modalToken = mergeToken<DrawerToken>(token);
    return [genModalStyle(modalToken), genModalMotion(modalToken)];
  },
  prepareComponentToken,
);
