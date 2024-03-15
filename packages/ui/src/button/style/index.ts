import { CSSObject } from '@/_cssinjs';
import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here

  // default
  defaultColorBg: string;
  defaultColor: string;
  defaultBorder: string;

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
  const { componentCls } = token;

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

      '&-rtl': {
        direction: 'rtl',
      },
    },
  };
};

// 'default' | 'primary' | 'dashed' | 'outline' | 'text'
const genBtnTypesStyle: GenerateStyle<ButtonToken> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-default`]: genBtnTypeStyle(token, 'default'),
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
    [`&:not(${componentCls}-disabled)`]: {
      backgroundColor: token[`${type}ColorBg`],
      color: token[`${type}Color`],
      border: token[`${type}Border`],
    },
    [`&${componentCls}-success:not(${componentCls}-disabled)`]: genBtnStatusStyle(token, type, 'Success'),
    [`&${componentCls}-danger:not(${componentCls}-disabled)`]: genBtnStatusStyle(token, type, 'Danger'),
    [`&${componentCls}-warning:not(${componentCls}-disabled)`]: genBtnStatusStyle(token, type, 'Warning'),
  };
};

// status
const genBtnStatusStyle = (token: ButtonToken, type, status): CSSObject => {
  return {
    backgroundColor: token[`${type}${status}ColorBg`],
    color: token[`${type}${status}Color`],
    border: token[`${type}${status}Border`],
  };
};

const genBtnSizeStyle: GenerateStyle<ButtonToken, CSSObject> = (token, type) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-mini`]: {
      // border-radius: ~'@{btn-size-@{size}-radius}';
      padding: `0 ${token.paddingXS - token.lineWidth}`,
      fontSize: token.fontSizeSM,
      height: `${token.sizeXS + 16}px`,
      borderRadius: token.borderRadius,
    },
    [`${componentCls}-small`]: {
      padding: `${token.paddingSM - token.lineWidth}`,
      fontSize: token.fontSizeSM,
      height: `${token.sizeSM + 16}px`,
      borderRadius: token.borderRadius,
    },
    [`${componentCls}-medium`]: {
      padding: `${token.padding - token.lineWidth}`,
      fontSize: token.fontSize,
      height: `${token.size + 16}px`,
      borderRadius: token.borderRadius,
    },
    [`${componentCls}-large`]: {
      padding: `${token.paddingMD - token.lineWidth}`,
      fontSize: token.fontSize,
      height: `${token.sizeLG + 16}px`,
      borderRadius: token.borderRadius,
    },
  };
};

// ============================== Export ==============================
export const prepareComponentToken: GetDefaultToken<'Button'> = token => ({
  /**  Type  */
  // default
  defaultColorBg: token.colorBgContainer,
  defaultColor: token.colorText,
  defaultBorder: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
  defaultSuccessColorBg: token.colorSuccessBg,
  defaultSuccessColor: token.colorSuccess,
  defaultSuccessBorder: `${token.lineWidth}px ${token.lineType} transparent`,
  defaultDangerColorBg: token.colorErrorBg,
  defaultDangerColor: token.colorError,
  defaultDangerBorder: `${token.lineWidth}px ${token.lineType} transparent`,
  defaultWarningColorBg: token.colorWarningBg,
  defaultWarningColor: token.colorWarning,
  defaultWarningBorder: `${token.lineWidth}px ${token.lineType} transparent`,

  // primary
  primaryColorBg: token.colorPrimary,
  primaryColor: token.colorTextLightSolid,
  primaryBorder: `${token.lineWidth}px ${token.lineType} transparent`,
  primarySuccessColorBg: token.colorSuccess,
  primarySuccessColor: token.colorTextLightSolid,
  primarySuccessBorder: `${token.lineWidth}px ${token.lineType} transparent`,
  primaryDangerColorBg: token.colorError,
  primaryDangerColor: token.colorTextLightSolid,
  primaryDangerBorder: `${token.lineWidth}px ${token.lineType} transparent`,
  primaryWarningColorBg: token.colorWarning,
  primaryWarningColor: token.colorTextLightSolid,
  primaryWarningBorder: `${token.lineWidth}px ${token.lineType} transparent`,

  // dashed
  dashedColorBg: token.colorBgContainer,
  dashedColor: token.colorText,
  dashedBorder: `${token.lineWidth}px dashed ${token.colorBorder}`,
  dashedSuccessColorBg: token.colorSuccessBg,
  dashedSuccessColor: token.colorSuccess,
  dashedSuccessBorder: `${token.lineWidth}px dashed ${token.colorSuccessBorder}`,
  dashedDangerColorBg: token.colorErrorBg,
  dashedDangerColor: token.colorError,
  dashedDangerBorder: `${token.lineWidth}px dashed ${token.colorErrorBorder}`,
  dashedWarningColorBg: token.colorWarningBg,
  dashedWarningColor: token.colorWarning,
  dashedWarningBorder: `${token.lineWidth}px dashed ${token.colorWarningBorder}`,

  // text
  textColorBg: token.colorBgContainer,
  textColor: token.colorText,
  textBorder: `${token.lineWidth}px dashed transparent`,
  textSuccessColorBg: token.colorBgContainer,
  textSuccessColor: token.colorSuccess,
  textSuccessBorder: `${token.lineWidth}px dashed transparent`,
  textDangerColorBg: token.colorBgContainer,
  textDangerColor: token.colorError,
  textDangerBorder: `${token.lineWidth}px dashed transparent`,
  textWarningColorBg: token.colorBgContainer,
  textWarningColor: token.colorWarning,
  textWarningBorder: `${token.lineWidth}px dashed transparent`,

  // outline
  outlineColorBg: 'transparent',
  outlineColor: token.colorPrimary,
  outlineBorder: `${token.lineWidth}px ${token.lineType} ${token.colorPrimary}`,
  outlineSuccessColorBg: 'transparent',
  outlineSuccessColor: token.colorSuccess,
  outlineSuccessBorder: `${token.lineWidth}px ${token.lineType} ${token.colorSuccess}`,
  outlineDangerColorBg: 'transparent',
  outlineDangerColor: token.colorError,
  outlineDangerBorder: `${token.lineWidth}px ${token.lineType} ${token.colorError}`,
  outlineWarningColorBg: 'transparent',
  outlineWarningColor: token.colorWarning,
  outlineWarningBorder: `${token.lineWidth}px ${token.lineType} ${token.colorWarning}`,
});

export default genStyleHooks(
  'Button',
  token => {
    const buttonToken = mergeToken<ButtonToken>(token, {});
    return [
      genBtnStyle(buttonToken),
      // 'default' | 'primary' | 'dashed' | 'outline' | 'text'
      genBtnTypesStyle(buttonToken),
      // mini | small | medium | large
      genBtnSizeStyle(buttonToken),
    ];
  },
  prepareComponentToken,
);
