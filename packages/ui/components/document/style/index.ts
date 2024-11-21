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
        zIndex: token.zIndexPopupBase,

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
          fontSize: token.fontSize,
          lineHeight: token.lineHeight,
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
          '&-wrapper': {
            boxShadow: token.boxShadow,
            visibility: 'visible',
            display: 'flex',
            flexDirection: 'column',
            resize: 'both',
            // transition: `all ${token.motions.durationMid} ${token.motions.linear}`,
            backgroundColor: token.colorBgElevated,
            minWidth: `min(400px, 100vw)`,
            maxWidth: `max(400px, 100vw)`,
            minHeight: `min(600px, 100vh)`,
            maxHeight: `max(600px, 100vh)`,
            borderRadius: token.borderRadius,
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
              display: 'flex',

              [`${componentCls}-title-text`]: {
                color: token.colorText,
                marginLeft: -token.margin,
                fontSize: token.fontSizeHeading5,

                '&:hover': {
                  backgroundColor: 'initial !important',
                },
              },
            },
          },
          '&-content': {
            padding: `${unit(token.padding)} ${unit(token.paddingLG)}`,
            flex: 1,
            overflow: 'auto',
            position: 'relative',
          },
          '&-footer': {
            borderTop: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
            padding: `${unit(token.padding)} ${unit(token.paddingLG)}`,

            [`> ${euiCls}-btn`]: {
              marginLeft: token.marginXS,

              '&:only-child': {
                marginLeft: 0,
              },
            },
          },
          '&-remark-icon': {
            position: 'absolute',
            right: token.padding / 2,
            top: token.padding / 2,

            [`${euiCls}-icon`]: {
              color: token.colorText,

              '&:hover': {
                color: token.colorPrimary,
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
