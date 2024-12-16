import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';
import { fade, zoom } from '@/_theme/style/motion';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

interface NotificationToken extends FullToken<'Notification'> {}

const genNotificationStyle: GenerateStyle<NotificationToken> = token => {
  const { componentCls } = token;

  return [
    {
      [`${componentCls}-wrapper`]: {
        position: 'fixed',
        zIndex: token.zIndexPopupBase + 20,
        margin: token.paddings.LG,
        pointerEvents: 'none',
        boxSizing: 'border-box',
        color: token.colorText,
        display: 'grid',
        width: 340,

        '&-topRight': {
          top: 0,
          right: 0,
        },

        '&-topLeft': {
          top: 0,
          left: 0,
        },

        '&-bottomLeft': {
          bottom: 0,
          left: 0,
        },

        '&-bottomRight': {
          bottom: 0,
          right: 0,
        },

        [`${componentCls}-rtl`]: {
          direction: 'rtl',
          span: {
            direction: 'rtl',
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
          display: 'flex',
          pointerEvents: 'auto',
          background: token.colorBgElevated,
          padding: token.paddings.MD,
          borderRadius: token.rounded.MD,
          boxShadow: token.shadows.MD,
          transition: `all ${token.motions.durationMid} ${token.motions.linear}`,
          position: 'relative',
          gap: token.margins.XS,
          marginBottom: token.margins.MD,

          [`&-close-btn`]: {
            position: 'absolute',
            right: token.margins.XS,
            top: token.margins.XS,
          },

          '&-icon': {
            fontSize: token.fonts.fontSizeXXL,
            display: 'contents',
          },

          '&-body': {
            flex: 1,
          },

          '&-title': {
            fontSize: token.fonts.fontSizeLG,
            fontWeight: token.fonts.fontWeight,
            marginBottom: token.margins.XS,
          },

          '&-content': {
            lineHeight: token.fonts.lineHeight,
          },

          '&-actions': {
            marginTop: token.margins.MD,
            textAlign: 'right',
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
        },
      },
    },
  ];
};

const genNotificationMotion: GenerateStyle<NotificationToken> = token => {
  const { componentCls } = token;
  return {
    [`${componentCls}-wrapper`]: {
      '&-topRight >': fade.initFadeMotion(token, 'fade-left', true),
      '&-topLeft >': fade.initFadeMotion(token, 'fade-right', true),
      '&-bottomRight >': fade.initFadeMotion(token, 'fade-left', true),
      '&-bottomLeft >': fade.initFadeMotion(token, 'fade-right', true),
    },
  };
};

// ============================== Export ==============================
const prepareComponentToken: GetDefaultToken<'Notification'> = () => ({});

export default genStyleHooks(
  'Notification',
  token => {
    const notificationToken = mergeToken<NotificationToken>(token);

    return [genNotificationStyle(notificationToken), genNotificationMotion(notificationToken)];
  },
  prepareComponentToken,
);
