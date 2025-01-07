import { CSSObject } from '@/_cssinjs';
import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';
import { fade } from '@/_theme/style/motion';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {}

interface AlertToken extends FullToken<'Alert'> {}

const genAlertStyle: GenerateStyle<AlertToken> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'relative',
      fontSize: token.fonts.fontSize,
      padding: `${token.sizes.XS}px ${token.sizes.MD}px`,
      borderRadius: token.rounded.MD,
      color: token.colorText,
      display: 'flex',
      gap: token.sizes.SM,
      alignItems: 'center',

      [`&${componentCls}-with-title`]: {
        alignItems: 'start',

        [`${componentCls}-icon-wrapper`]: {
          fontSize: token.fonts.fontSizeXL,
          svg: {
            verticalAlign: 0,
          },
        },

        [`${componentCls}-close-btn`]: {
          transform: 'translateY(-2px)',
        },
      },

      [`&${componentCls}-rtl`]: {
        direction: 'rtl',
      },

      [`&${componentCls}-banner`]: {
        border: 'none',
        borderRadius: 0,
      },

      [`${componentCls}-icon-wrapper`]: {
        fontSize: token.fonts.fontSizeLG,
      },

      [`${componentCls}-content-wrapper`]: {
        flex: 1,

        [`${componentCls}-title`]: {
          fontSize: token.fonts.fontSizeHeading5,
          fontWeight: token.fonts.fontWeight,
        },
        [`${componentCls}-content`]: {
          color: token.colorTextSecondary,
        },
      },

      [`${componentCls}-close-custom-btn`]: {
        paddingInline: token.paddings.XXS,
      },
    },
  };
};

// Type
const genAlertTypeStyle: GenerateStyle<AlertToken, CSSObject> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      [`&${componentCls}-info`]: genAlertStatusStyle(token, ''),
      [`&${componentCls}-success`]: genAlertStatusStyle(token, 'Success'),
      [`&${componentCls}-error`]: genAlertStatusStyle(token, 'Error'),
      [`&${componentCls}-warning`]: genAlertStatusStyle(token, 'Warning'),
    },
  };
};

const genAlertStatusStyle = (token: AlertToken, status): CSSObject => {
  const { componentCls } = token;
  return {
    '&': {
      backgroundColor: token[`alert${status}ColorBg`],
      border: '1px solid transparent',

      [`${componentCls}-icon-wrapper`]: {
        color: token[`alert${status}Color`],
      },
    },
  };
};

const genAlertMotion: GenerateStyle<AlertToken> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      [`&${componentCls}-animate-exit-active`]: {
        maxHeight: 0,
        marginBottom: '0 !important',
        marginTop: '0 !important',
        paddingTop: 0,
        paddingBottom: 0,
        opacity: 0,
      },
      [`&${componentCls}-animate-exit`]: {
        overflow: 'hidden',
        transition: `all ${token.motions.durationSlow} ${token.motions.standard}`,
      },
    },
  };
};

// ============================== Export ==============================
const prepareComponentToken: GetDefaultToken<'Alert'> = token => {
  return {
    alertColorBorder: `${token.lineWidth}px ${token.lineType} ${token.colorPrimarys[3]}`,
    alertColorBg: token.colorPrimarys[1],
    alertColor: token.colorPrimarys[6],

    alertSuccessColorBorder: `${token.lineWidth}px ${token.lineType} ${token.colorSuccesses[3]}`,
    alertSuccessColorBg: token.colorSuccesses[1],
    alertSuccessColor: token.colorSuccesses[6],

    alertErrorColorBorder: `${token.lineWidth}px ${token.lineType} ${token.colorErrors[3]}`,
    alertErrorColorBg: token.colorErrors[1],
    alertErrorColor: token.colorErrors[6],

    alertWarningColorBorder: `${token.lineWidth}px ${token.lineType} ${token.colorWarnings[3]}`,
    alertWarningColorBg: token.colorWarnings[1],
    alertWarningColor: token.colorWarnings[6],
  };
};

export default genStyleHooks(
  'Alert',
  token => {
    const alertToken = mergeToken<AlertToken>(token, {});
    return [genAlertStyle(alertToken), genAlertTypeStyle(alertToken), genAlertMotion(alertToken)];
  },
  prepareComponentToken,
);
