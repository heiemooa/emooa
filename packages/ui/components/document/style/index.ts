import { unit } from '@/_cssinjs';
import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';
import { fade, zoom } from '@/_theme/style/motion';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

interface DocumentToken extends FullToken<'Document'> {
  previewCls: string;
}

const genModalStyle: GenerateStyle<DocumentToken> = token => {
  const { componentCls, euiCls } = token;

  return [
    /**
     * root
     */
    {
      [`${componentCls}-root`]: {
        position: 'fixed',
        top: 0,
        zIndex: token.zIndexPopupBase * 2,

        [`& > ${componentCls}`]: {
          position: 'fixed',
          right: {
            _skip_check_: true,
            value: 48,
          },
          bottom: 48,
          userSelect: 'none',
          boxSizing: 'border-box',
          padding: 0,
          color: token.colorText,
          fontSize: token.fonts.fontSize,
          lineHeight: token.fonts.lineHeight,
          listStyle: 'none',
          margin: '0 auto',
          textAlign: 'left',
          pointerEvents: 'auto',
          visibility: 'hidden',
        },

        '&-hide': {
          display: 'none',
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
          '&-wrapper': {
            position: 'relative',
            boxShadow: token.shadows.MD,
            visibility: 'visible',
            display: 'flex',
            flexDirection: 'column',
            resize: 'both',
            transition: `all ${token.motions.durationFast} ${token.motions.linear}`,
            backgroundColor: token.colorBgElevated,
            minWidth: `min(260px, 100vw, ${window.innerWidth - 96}px)`,
            maxWidth: '100vw',
            minHeight: `min(400px, 100vh, ${window.innerHeight - 96}px)`,
            maxHeight: '100vh',
            borderRadius: token.rounded.MD,
          },

          '&-header': {
            borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorderSecondary}`,
            display: 'flex',
            alignItems: 'center',

            [`${componentCls}-title`]: {
              flex: 1,
              padding: `${unit(token.paddings.SM)} ${unit(token.paddings.LG)}`,
              fontWeight: token.fonts.fontWeight,
              fontSize: token.fonts.fontSizeHeading5,
              lineHeight: token.fonts.lineHeightHeading5,
              wordWrap: 'break-word',
              display: 'flex',
              cursor: 'move',

              [`${componentCls}-title-text`]: {
                color: token.colorText,
                marginLeft: -token.margins.MD,
                fontSize: token.fonts.fontSizeHeading5,

                '&:hover': {
                  backgroundColor: 'initial !important',
                },
              },
            },
          },
          '&-content': {
            padding: `${unit(token.paddings.SM)} ${unit(token.paddings.LG)}`,
            flex: 1,
            overflow: 'auto',
            position: 'relative',
          },
          '&-footer': {
            borderTop: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorderSecondary}`,
            padding: `${unit(token.paddings.SM)} ${unit(token.paddings.LG)}`,

            [`> ${euiCls}-btn`]: {
              marginLeft: token.margins.XS,

              '&:only-child': {
                marginLeft: 0,
              },
            },
          },
          '&-remark-icon': {
            position: 'absolute',
            right: token.paddings.MD / 2,
            top: token.paddings.MD / 2,

            [`${euiCls}-icon`]: {
              color: token.colorText,

              '&:hover': {
                color: token.colorPrimarys[6],
              },
            },
            '&-left': {
              transform: 'rotate(-45deg)',

              '&.expand': {
                scale: '0.85',
              },
            },
          },
        },
      },
    },
  ];
};

const genModalMotion: GenerateStyle<DocumentToken> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-root`]: {
      [componentCls]: [fade.initFadeMotion(token, 'fade-mini-left', true)],
    },
  };
};

// ============================== Export ==============================
const prepareComponentToken: GetDefaultToken<'Document'> = () => ({});

export default genStyleHooks(
  'Document',
  token => {
    const modalToken = mergeToken<DocumentToken>(token);
    return [genModalStyle(modalToken), genModalMotion(modalToken)];
  },
  prepareComponentToken,
);
