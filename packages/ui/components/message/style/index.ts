import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';
import { fade, zoom } from '@/_theme/style/motion';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

interface MessageToken extends FullToken<'Message'> {}

const genMessageStyle: GenerateStyle<MessageToken> = token => {
  const { componentCls, euiCls } = token;

  return [
    {
      [`${componentCls}-wrapper`]: {
        width: '100%',
        position: 'fixed',
        zIndex: token.zIndexPopupBase,
        padding: '0 10px',
        textAlign: 'center',
        pointerEvents: 'none',
        boxSizing: 'border-box',
        left: '0',

        '&-top': {
          top: token.marginXXL,
        },

        '&-bottom': {
          bottom: token.marginXXL,
        },

        [`${componentCls}-rtl`]: {
          direction: 'rtl',
          span: {
            direction: 'rtl',
          },

          [`& > span:not(:last-child)`]: {
            marginLeft: token.marginXS,
          },
        },

        [`${componentCls}:not(${componentCls}-rtl)`]: {
          [`& > span:not(:last-child)`]: {
            marginRight: token.marginXS,
          },
        },

        '& > div': {
          transition: `all ${token.motions.durationMid} ${token.motions.linear}`,
        },

        [componentCls]: {
          display: 'inline-block',
          pointerEvents: 'auto',
          background: token.colorBgElevated,
          paddingInline: token.padding,
          paddingBlock: token.paddingXS,
          borderRadius: token.borderRadius,
          boxShadow: token.boxShadow,
          textAlign: 'center',
          marginBottom: token.margin,
          transition: `all ${token.motions.durationMid} ${token.motions.linear}`,
          lineHeight: 1,

          [`&-close-btn`]: {
            display: 'inline',
            color: token.colorText,
          },

          '&-icon': {
            fontSize: token.fontSizeXL,
            verticalAlign: 'sub',
          },

          '&-success': {
            [`${componentCls}-icon`]: {
              color: token.colorSuccess,
            },
          },
          '&-info': {
            [`${componentCls}-icon`]: {
              color: token.colorPrimary,
            },
          },
          '&-error': {
            [`${componentCls}-icon`]: {
              color: token.colorError,
            },
          },
          '&-warning': {
            [`${componentCls}-icon`]: {
              color: token.colorWarning,
            },
          },
          '&-loading': {
            [`${componentCls}-icon`]: {
              color: token.colorPrimary,
            },
          },
        },
      },
    },
  ];
};

const genMessageMotion: GenerateStyle<MessageToken> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-wrapper`]: {
      '&-top >': fade.initFadeMotion(token, 'fade-down', true),
      '&-bottom >': fade.initFadeMotion(token, 'fade-up', true),
    },
  };
};

// ============================== Export ==============================
const prepareComponentToken: GetDefaultToken<'Message'> = () => ({});

export default genStyleHooks(
  'Message',
  token => {
    const messageToken = mergeToken<MessageToken>(token);

    return [genMessageStyle(messageToken), genMessageMotion(messageToken)];
  },
  prepareComponentToken,
);
