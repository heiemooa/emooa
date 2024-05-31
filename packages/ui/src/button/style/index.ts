import { CSSObject } from '@/_cssinjs';
import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';
import genGroupBtnStyle from './group';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here

  // secondary
  secondaryColorBg: string;
  secondaryColor: string;
  secondaryBorder: string;

  // primary
  primaryColorBg: string;
  primaryColor: string;
  primaryBorder: string;

  // dashed
  dashedColorBg: string;
  dashedColor: string;
  dashedBorder: string;

  // text
  textColorBg: string;
  textColor: string;
  textBorder: string;

  // outline
  outlineColorBg: string;
  outlineColor: string;
  outlineBorder: string;
}

interface ButtonToken extends FullToken<'Button'> {}

const genBtnStyle: GenerateStyle<ButtonToken> = token => {
  const { componentCls, euiCls } = token;

  return {
    [componentCls]: {
      display: 'inline-block',
      position: 'relative',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      textAlign: 'center',
      lineHeight: token.lineHeight,
      outline: 'none',
      transition: `all ${token.motionDurationMid} ${token.motionStandard}`,

      [`&:not(${componentCls}-rtl)`]: {
        '& > svg + span': {
          marginLeft: token.paddingXS,
        },
        '& > span + svg': {
          marginLeft: token.paddingXS,
        },
      },
      [`&${componentCls}-rtl`]: {
        direction: 'rtl',

        '& > svg + span': {
          marginRight: token.paddingXS,
        },
        '& > span + svg': {
          marginRight: token.paddingXS,
        },
      },

      [`&:not(${componentCls}-disabled)`]: {
        [`&:not(${componentCls}-loading):active`]: {
          transform: 'scale(0.95)',
        },

        [`&${componentCls}-loading`]: {
          cursor: 'auto',

          [`${euiCls}-icon-loading`]: {
            transition: `width ${token.motionDurationMid} ${token.motionStandard}, opacity ${token.motionDurationSlow} ${token.motionStandard}`,
          },
        },
      },

      [`&${componentCls}-disabled, &:disabled`]: {
        [`&:not(${componentCls}-loading)`]: {
          cursor: 'not-allowed',
        },

        '& > *': {
          pointerEvents: 'none',
        },

        '&::after': {
          position: 'absolute',
          background: '#ffffff60',
          content: '""',
          height: '100%',
          width: '100%',
          left: `-${token.lineWidth}px`,
          top: `-${token.lineWidth}px`,
          border: `${token.lineWidth}px solid #ffffff60`,
          boxSizing: 'initial',
          borderRadius: token.borderRadius,
        },
      },

      [`&${componentCls}-loading::after`]: {
        position: 'absolute',
        background: '#ffffff60',
        content: '""',
        height: '100%',
        width: '100%',
        left: `-${token.lineWidth}px`,
        top: `-${token.lineWidth}px`,
        border: `${token.lineWidth}px solid #ffffff60`,
        boxSizing: 'initial',
        borderRadius: token.borderRadius,
      },
    },
  };
};

// 'secondary' | 'primary' | 'dashed' | 'outline' | 'text'
const genBtnTypesStyle: GenerateStyle<ButtonToken> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-secondary`]: genBtnTypeStyle(token, 'secondary'),
    [`${componentCls}-primary`]: genBtnTypeStyle(token, 'primary'),
    [`${componentCls}-dashed`]: genBtnTypeStyle(token, 'dashed'),
    [`${componentCls}-text`]: genBtnTypeStyle(token, 'text'),
    [`${componentCls}-outline`]: genBtnTypeStyle(token, 'outline'),
  };
};

// Type
const genBtnTypeStyle: GenerateStyle<ButtonToken, CSSObject> = (token, type) => {
  const { componentCls } = token;

  return {
    [`&${componentCls}-default`]: genBtnStatusStyle(token, type, ''),
    [`&${componentCls}-success`]: genBtnStatusStyle(token, type, 'Success'),
    [`&${componentCls}-danger`]: genBtnStatusStyle(token, type, 'Danger'),
    [`&${componentCls}-warning`]: genBtnStatusStyle(token, type, 'Warning'),
  };
};

// status
const genBtnStatusStyle = (token: ButtonToken, type, status): CSSObject => {
  const { componentCls } = token;
  return {
    '&': {
      backgroundColor: token[`${type}${status}ColorBg`],
      color: token[`${type}${status}Color`],
      border: token[`${type}${status}Border`],

      [`&:not(${componentCls}-disabled):not(:active):not(${componentCls}-loading):hover`]: {
        backgroundColor: token[`${type}${status}ColorBgHover`],
        color: token[`${type}${status}ColorHover`],
        border: token[`${type}${status}BorderHover`],
      },
    },
  };
};

const genBtnSizeStyle: GenerateStyle<ButtonToken, CSSObject> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-mini`]: {
      fontSize: token.fontSizeSM,
      height: `${token.sizeXS + 16}px`,
      borderRadius: token.borderRadius,

      [`&${componentCls}-icon-only`]: {
        aspectRatio: 1,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      [`&:not(${componentCls}-icon-only)`]: {
        padding: `0 ${token.paddingXS - token.lineWidth}px`,
      },
      [`&${componentCls}-circle`]: {
        borderRadius: '50%',
      },
      [`&${componentCls}-round`]: {
        borderRadius: `${(token.sizeXS + 16) / 2}px`,
      },
    },
    [`${componentCls}-small`]: {
      fontSize: token.fontSizeSM,
      height: `${token.sizeSM + 16}px`,
      borderRadius: token.borderRadius,
      [`&${componentCls}-icon-only`]: {
        aspectRatio: 1,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      [`&:not(${componentCls}-icon-only)`]: {
        padding: `${token.sizeXS / 4}px  ${token.paddingXS - token.lineWidth}px`,
      },
      [`&${componentCls}-circle`]: {
        borderRadius: '50%',
      },
      [`&${componentCls}-round`]: {
        borderRadius: `${(token.sizeSM + 16) / 2}px`,
      },
    },
    [`${componentCls}-medium`]: {
      fontSize: token.fontSize,
      height: `${token.size + 16}px`,
      borderRadius: token.borderRadius,
      [`&${componentCls}-icon-only`]: {
        aspectRatio: 1,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      [`&:not(${componentCls}-icon-only)`]: {
        padding: `${token.size / 4}px  ${token.padding - token.lineWidth}px`,
      },
      [`&${componentCls}-circle`]: {
        borderRadius: '50%',
      },
      [`&${componentCls}-round`]: {
        borderRadius: `${(token.size + 16) / 2}px`,
      },
    },
    [`${componentCls}-large`]: {
      fontSize: token.fontSize,
      height: `${token.sizeLG + 16}px`,
      borderRadius: token.borderRadius,
      [`&${componentCls}-icon-only`]: {
        aspectRatio: 1,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      [`&:not(${componentCls}-icon-only)`]: {
        padding: `${token.sizeXL / 4}px ${token.paddingLG - token.lineWidth}px`,
      },
      [`&${componentCls}-circle`]: {
        borderRadius: '50%',
      },
      [`&${componentCls}-round`]: {
        borderRadius: `${(token.sizeLG + 16) / 2}px`,
      },
    },
  };
};

const genBtnFullStyle: GenerateStyle<ButtonToken> = token => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      [`&${componentCls}-full`]: {
        width: '100%',
      },
    },
  };
};

// ============================== Export ==============================
export const prepareComponentToken: GetDefaultToken<'Button'> = token => ({
  /**  Type  */
  // secondary
  secondaryColorBg: token.colorBorderSecondary,
  secondaryColorBgHover: token.colorBorder,
  secondaryColor: token.colorText,
  secondaryBorder: `${token.lineWidth}px ${token.lineType} transparent`,
  secondarySuccessColorBg: token.colorSuccessBg,
  secondarySuccessColorBgHover: token.colorSuccessBgHover,
  secondarySuccessColor: token.colorSuccess,
  secondarySuccessBorder: `${token.lineWidth}px ${token.lineType} transparent`,
  secondaryDangerColorBg: token.colorErrorBg,
  secondaryDangerColorBgHover: token.colorErrorBgHover,
  secondaryDangerColor: token.colorError,
  secondaryDangerBorder: `${token.lineWidth}px ${token.lineType} transparent`,
  secondaryWarningColorBg: token.colorWarningBg,
  secondaryWarningColorBgHover: token.colorWarningBgHover,
  secondaryWarningColor: token.colorWarning,
  secondaryWarningBorder: `${token.lineWidth}px ${token.lineType} transparent`,

  // primary
  primaryColorBg: token.colorPrimary,
  primaryColorBgHover: token.colorPrimaryHover,
  primaryColor: token.colorTextLightSolid,
  primaryBorder: `${token.lineWidth}px ${token.lineType} transparent`,
  primarySuccessColorBg: token.colorSuccess,
  primarySuccessColorBgHover: token.colorSuccessHover,
  primarySuccessColor: token.colorTextLightSolid,
  primarySuccessBorder: `${token.lineWidth}px ${token.lineType} transparent`,
  primaryDangerColorBg: token.colorError,
  primaryDangerColorBgHover: token.colorErrorHover,
  primaryDangerColor: token.colorTextLightSolid,
  primaryDangerBorder: `${token.lineWidth}px ${token.lineType} transparent`,
  primaryWarningColorBg: token.colorWarning,
  primaryWarningColorBgHover: token.colorWarningHover,
  primaryWarningColor: token.colorTextLightSolid,
  primaryWarningBorder: `${token.lineWidth}px ${token.lineType} transparent`,

  // dashed
  dashedColorBg: token.colorBorderSecondary,
  dashedColorBgHover: token.colorBorder,
  dashedColor: token.colorText,
  dashedBorder: `${token.lineWidth}px dashed ${token.colorBorder}`,
  dashedBorderHover: `${token.lineWidth}px dashed ${token.colorBorder}`,
  dashedSuccessColorBg: token.colorSuccessBg,
  dashedSuccessColorBgHover: token.colorSuccessBgHover,
  dashedSuccessColor: token.colorSuccess,
  dashedSuccessBorder: `${token.lineWidth}px dashed ${token.colorSuccessBorder}`,
  dashedDangerColorBg: token.colorErrorBg,
  dashedDangerColorBgHover: token.colorErrorBgHover,
  dashedDangerColor: token.colorError,
  dashedDangerBorder: `${token.lineWidth}px dashed ${token.colorErrorBorder}`,
  dashedWarningColorBg: token.colorWarningBg,
  dashedWarningColorBgHover: token.colorWarningBgHover,
  dashedWarningColor: token.colorWarning,
  dashedWarningBorder: `${token.lineWidth}px dashed ${token.colorWarningBorder}`,

  // text
  textColorBg: 'transparent',
  textColorBgHover: token.colorBgTextHover,
  textColor: token.colorPrimary,
  textColorHover: token.colorPrimaryHover,
  textBorder: `${token.lineWidth}px dashed transparent`,
  textSuccessColorBg: 'transparent',
  textSuccessColorBgHover: token.colorBgTextHover,
  textSuccessColor: token.colorSuccess,
  textSuccessColorHover: token.colorSuccessHover,
  textSuccessBorder: `${token.lineWidth}px dashed transparent`,
  textDangerColorBg: 'transparent',
  textDangerColorBgHover: token.colorBgTextHover,
  textDangerColor: token.colorError,
  textDangerColorHover: token.colorErrorHover,
  textDangerBorder: `${token.lineWidth}px dashed transparent`,
  textWarningColorBg: 'transparent',
  textWarningColorBgHover: token.colorBgTextHover,
  textWarningColor: token.colorWarning,
  textWarningColorHover: token.colorWarningHover,
  textWarningBorder: `${token.lineWidth}px dashed transparent`,

  // outline
  outlineColorBg: 'transparent',
  outlineColor: token.colorPrimary,
  outlineColorHover: token.colorPrimaryHover,
  outlineBorder: `${token.lineWidth}px ${token.lineType} ${token.colorPrimary}`,
  outlineBorderHover: `${token.lineWidth}px ${token.lineType} ${token.colorPrimaryHover}`,
  outlineSuccessColorBg: 'transparent',
  outlineSuccessColor: token.colorSuccess,
  outlineSuccessColorHover: token.colorSuccessHover,
  outlineSuccessBorder: `${token.lineWidth}px ${token.lineType} ${token.colorSuccess}`,
  outlineSuccessBorderHover: `${token.lineWidth}px ${token.lineType} ${token.colorSuccessHover}`,
  outlineDangerColorBg: 'transparent',
  outlineDangerColor: token.colorError,
  outlineDangerColorHover: token.colorErrorHover,
  outlineDangerBorder: `${token.lineWidth}px ${token.lineType} ${token.colorError}`,
  outlineDangerBorderHover: `${token.lineWidth}px ${token.lineType} ${token.colorErrorHover}`,
  outlineWarningColorBg: 'transparent',
  outlineWarningColor: token.colorWarning,
  outlineWarningColorHover: token.colorWarningHover,
  outlineWarningBorder: `${token.lineWidth}px ${token.lineType} ${token.colorWarning}`,
  outlineWarningBorderHover: `${token.lineWidth}px ${token.lineType} ${token.colorWarningHover}`,
});

export default genStyleHooks(
  'Button',
  token => {
    const buttonToken = mergeToken<ButtonToken>(token, {});
    return [
      genBtnStyle(buttonToken),
      // 'secondary' | 'primary' | 'dashed' | 'outline' | 'text'
      genBtnTypesStyle(buttonToken),
      // mini | small | medium | large
      genBtnSizeStyle(buttonToken),
      // full
      genBtnFullStyle(buttonToken),
      // Group Button
      genGroupBtnStyle(buttonToken),
    ];
  },
  prepareComponentToken,
);
