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
          width: 380,
          maxWidth: `calc(100vw - ${unit(token.calc(token.margin).mul(2).equal())})`,
        },
        [`&${componentCls}-right > ${componentCls}`]: {
          top: 0,
          right: {
            _skip_check_: true,
            value: 0,
          },
          bottom: 0,
          width: 380,
          maxWidth: `calc(100vw - ${unit(token.calc(token.margin).mul(2).equal())})`,
        },
        [`&${componentCls}-top > ${componentCls}`]: {
          top: 0,
          insetInline: 0,
          height: 380,
          maxHeight: `calc(100vh - ${unit(token.calc(token.margin).mul(2).equal())})`,
        },
        [`&${componentCls}-bottom > ${componentCls}`]: {
          bottom: 0,
          insetInline: 0,
          height: 380,
          maxHeight: `calc(100vh - ${unit(token.calc(token.margin).mul(2).equal())})`,
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

    {
      [`${componentCls}-root`]: {
        [componentCls]: {
          boxSizing: 'border-box',
          padding: 0,
          color: token.colorText,
          fontSize: token.fontSize,
          lineHeight: token.lineHeight,
          listStyle: 'none',
          position: 'absolute',
          margin: '0 auto',
          textAlign: 'left',
          pointerEvents: 'auto',
          backgroundColor: token.colorBgElevated,

          '&-wrapper': {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          },

          '&-header': {
            borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
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
            flex: 1,
            overflow: 'auto',
          },
          '&-footer': {
            borderTop: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
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
            color: 'inherit',
            position: 'absolute',
            right: token.padding / 2,
            top: token.padding / 2,
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

    console.log(genModalMotion(modalToken));
    return [genModalStyle(modalToken), genModalMotion(modalToken)];
  },
  prepareComponentToken,
);
