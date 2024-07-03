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
          backgroundColor: token.colorBgElevated,
          borderRadius: token.borderRadius,

          '&-header': {
            padding: `${unit(token.paddingSM)} ${unit(token.padding)}`,
            borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
            display: 'flex',
            alignItems: 'center',

            [`${componentCls}-title`]: {
              flex: 1,
              fontWeight: token.fontWeight,
              fontSize: token.fontSizeHeading5,
              lineHeight: token.lineHeightHeading5,
              wordWrap: 'break-word',
            },
          },
          '&-content': {
            padding: token.padding,
          },
          '&-footer': {
            borderTop: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
            padding: token.padding,
            textAlign: 'right',

            [`> ${euiCls}-btn`]: {
              marginLeft: token.marginXS,

              '&:only-child': {
                marginLeft: 0,
              },
            },
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
      [`${componentCls}-mask`]: fade.initFadeMotion(token, true),
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
