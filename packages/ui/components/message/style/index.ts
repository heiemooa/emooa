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
        zIndex: token.zIndexPopupBase + 20,
        padding: '0 10px',
        textAlign: 'center',
        pointerEvents: 'none',
        boxSizing: 'border-box',
        left: '0',
        color: token.colorText,

        '&-top': {
          top: token.margins.XXL,
        },

        '&-bottom': {
          bottom: token.margins.XXL,
        },

        [`${componentCls}-rtl`]: {
          direction: 'rtl',
          span: {
            direction: 'rtl',
          },

          [`& > span:not(:last-child)`]: {
            marginLeft: token.margins.XS,
          },
        },

        [`${componentCls}:not(${componentCls}-rtl)`]: {
          [`& > span:not(:last-child)`]: {
            marginRight: token.margins.XS,
          },
        },

        '& > div': {
          transition: `all ${token.motions.durationMid} ${token.motions.linear}`,
        },

        [componentCls]: {
          display: 'inline-block',
          pointerEvents: 'auto',
          background: token.colorBgElevated,
          paddingInline: token.paddings.MD,
          paddingBlock: token.paddings.XS,
          borderRadius: token.rounded.MD,
          boxShadow: token.shadows.MD,
          textAlign: 'center',
          marginBottom: token.margins.MD,
          transition: `all ${token.motions.durationMid} ${token.motions.linear}`,
          lineHeight: 1,

          [`&-close-btn`]: {
            display: 'inline',
            color: token.colorText,
          },

          '&-icon': {
            fontSize: token.fonts.fontSizeXL,
            verticalAlign: 'sub',
          },

          '&-success': {
            [`${componentCls}-icon`]: {
              color: token.colorSuccesses[6],
            },
          },
          '&-info': {
            [`${componentCls}-icon`]: {
              color: token.colorPrimarys[6],
            },
          },
          '&-error': {
            [`${componentCls}-icon`]: {
              color: token.colorErrors[6],
            },
          },
          '&-warning': {
            [`${componentCls}-icon`]: {
              color: token.colorWarnings[6],
            },
          },
          '&-loading': {
            [`${componentCls}-icon`]: {
              color: token.colorPrimarys[6],
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
