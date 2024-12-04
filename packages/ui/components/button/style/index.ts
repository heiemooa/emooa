import { CSSObject } from '@/_cssinjs';
import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';
import genGroupBtnStyle from './group';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here

  // secondary
  secondaryColorBg?: string;
  secondaryColor?: string;
  secondaryBorder?: string;

  // primary
  primaryColorBg?: string;
  primaryColor?: string;
  primaryBorder?: string;

  // dashed
  dashedColorBg?: string;
  dashedColor?: string;
  dashedBorder?: string;

  // text
  textColorBg?: string;
  textColor?: string;
  textBorder?: string;

  // outline
  outlineColorBg?: string;
  outlineColor?: string;
  outlineBorder?: string;
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
      lineHeight: token.fonts.lineHeight,
      outline: 'none',
      transition: `all ${token.motions.durationMid} ${token.motions.standard}`,

      '&:focus': {
        outline: 0,
      },

      [`&:not(${componentCls}-rtl)`]: {
        '& > svg + span': {
          marginLeft: token.paddings.XS,
        },
        '& > span + svg': {
          marginLeft: token.paddings.XS,
        },
      },
      [`&${componentCls}-rtl`]: {
        direction: 'rtl',

        '& > svg + span': {
          marginRight: token.paddings.XS,
        },
        '& > span + svg': {
          marginRight: token.paddings.XS,
        },
      },

      [`&:not(${componentCls}-disabled)`]: {
        [`&:not(${componentCls}-loading):active`]: {
          transform: 'scale(0.95)',
        },

        [`&${componentCls}-loading`]: {
          cursor: 'auto',

          [`${euiCls}-icon-loading`]: {
            transition: `width ${token.motions.durationMid} ${token.motions.standard}, opacity ${token.motions.durationSlow} ${token.motions.standard}`,
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

        [`&::after:not(${componentCls}-text)`]: {
          position: 'absolute',
          background: '#ffffff60',
          content: '""',
          height: '100%',
          width: '100%',
          left: `-${token.lineWidth}px`,
          top: `-${token.lineWidth}px`,
          border: `${token.lineWidth}px solid #ffffff60`,
          boxSizing: 'initial',
          borderRadius: token.rounded.MD,
        },
        [`&${componentCls}-text`]: {},
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
        borderRadius: token.rounded.MD,
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

      '&:focus-visible': {
        boxShadow: `0 0 0 2px ${token[`${type}${status}ColorBgHover`]}`,
      },

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
      fontSize: token.fonts.fontSizeSM,
      height: `${token.sizes.XS + 16}px`,
      borderRadius: token.rounded.MD,

      [`&${componentCls}-icon-only`]: {
        aspectRatio: 1,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      [`&:not(${componentCls}-icon-only)`]: {
        padding: `0 ${token.paddings.XS - token.lineWidth}px`,
      },
      [`&${componentCls}-circle`]: {
        borderRadius: '50%',
      },
      [`&${componentCls}-round`]: {
        borderRadius: `${(token.sizes.XS + 16) / 2}px`,
      },
    },
    [`${componentCls}-small`]: {
      fontSize: token.fonts.fontSizeSM,
      height: `${token.sizes.SM + 16}px`,
      borderRadius: token.rounded.MD,
      [`&${componentCls}-icon-only`]: {
        aspectRatio: 1,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      [`&:not(${componentCls}-icon-only)`]: {
        padding: `${token.sizes.XS / 4}px  ${token.paddings.XS - token.lineWidth}px`,
      },
      [`&${componentCls}-circle`]: {
        borderRadius: '50%',
      },
      [`&${componentCls}-round`]: {
        borderRadius: `${(token.sizes.SM + 16) / 2}px`,
      },
    },
    [`${componentCls}-medium`]: {
      fontSize: token.fonts.fontSize,
      height: `${token.sizes.MD + 16}px`,
      borderRadius: token.rounded.MD,
      [`&${componentCls}-icon-only`]: {
        aspectRatio: 1,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      [`&:not(${componentCls}-icon-only)`]: {
        padding: `${token.sizes.MD / 4}px  ${token.paddings.MD - token.lineWidth}px`,
      },
      [`&${componentCls}-circle`]: {
        borderRadius: '50%',
      },
      [`&${componentCls}-round`]: {
        borderRadius: `${(token.sizes.MD + 16) / 2}px`,
      },
    },
    [`${componentCls}-large`]: {
      fontSize: token.fonts.fontSize,
      height: `${token.sizes.LG + 16}px`,
      borderRadius: token.rounded.MD,
      [`&${componentCls}-icon-only`]: {
        aspectRatio: 1,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      [`&:not(${componentCls}-icon-only)`]: {
        padding: `${token.sizes.XL / 4}px ${token.paddings.LG - token.lineWidth}px`,
      },
      [`&${componentCls}-circle`]: {
        borderRadius: '50%',
      },
      [`&${componentCls}-round`]: {
        borderRadius: `${(token.sizes.LG + 16) / 2}px`,
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
const prepareComponentToken: GetDefaultToken<'Button'> = token => ({
  /**  Type  */
  // secondary
  secondaryColorBg: token.colorBorderSecondary,
  secondaryColorBgHover: token.colorBorder,
  secondaryColor: token.colorText,
  secondaryBorder: `${token.lineWidth}px ${token.lineType} transparent`,
  secondarySuccessColorBg: token.colorSuccesses.colorSuccessBg,
  secondarySuccessColorBgHover: token.colorSuccesses.colorSuccessBgHover,
  secondarySuccessColor: token.colorSuccesses.colorSuccess,
  secondarySuccessBorder: `${token.lineWidth}px ${token.lineType} transparent`,
  secondaryDangerColorBg: token.colorErrors.colorErrorBg,
  secondaryDangerColorBgHover: token.colorErrors.colorErrorBgHover,
  secondaryDangerColor: token.colorErrors.colorError,
  secondaryDangerBorder: `${token.lineWidth}px ${token.lineType} transparent`,
  secondaryWarningColorBg: token.colorWarnings.colorWarningBg,
  secondaryWarningColorBgHover: token.colorWarnings.colorWarningBgHover,
  secondaryWarningColor: token.colorWarnings.colorWarning,
  secondaryWarningBorder: `${token.lineWidth}px ${token.lineType} transparent`,

  // primary
  primaryColorBg: token.colorPrimarys.colorPrimary,
  primaryColorBgHover: token.colorPrimarys.colorPrimaryHover,
  primaryColor: token.colorTextLightSolid,
  primaryBorder: `${token.lineWidth}px ${token.lineType} transparent`,
  primarySuccessColorBg: token.colorSuccesses.colorSuccess,
  primarySuccessColorBgHover: token.colorSuccesses.colorSuccessHover,
  primarySuccessColor: token.colorTextLightSolid,
  primarySuccessBorder: `${token.lineWidth}px ${token.lineType} transparent`,
  primaryDangerColorBg: token.colorErrors.colorError,
  primaryDangerColorBgHover: token.colorErrors.colorErrorHover,
  primaryDangerColor: token.colorTextLightSolid,
  primaryDangerBorder: `${token.lineWidth}px ${token.lineType} transparent`,
  primaryWarningColorBg: token.colorWarnings.colorWarning,
  primaryWarningColorBgHover: token.colorWarnings.colorWarningHover,
  primaryWarningColor: token.colorTextLightSolid,
  primaryWarningBorder: `${token.lineWidth}px ${token.lineType} transparent`,

  // dashed
  dashedColorBg: token.colorBorderSecondary,
  dashedColorBgHover: token.colorBorder,
  dashedColor: token.colorText,
  dashedBorder: `${token.lineWidth}px dashed ${token.colorBorder}`,
  dashedBorderHover: `${token.lineWidth}px dashed ${token.colorBorder}`,
  dashedSuccessColorBg: token.colorSuccesses.colorSuccessBg,
  dashedSuccessColorBgHover: token.colorSuccesses.colorSuccessBgHover,
  dashedSuccessColor: token.colorSuccesses.colorSuccess,
  dashedSuccessBorder: `${token.lineWidth}px dashed ${token.colorSuccesses.colorSuccessBorder}`,
  dashedDangerColorBg: token.colorErrors.colorErrorBg,
  dashedDangerColorBgHover: token.colorErrors.colorErrorBgHover,
  dashedDangerColor: token.colorErrors.colorError,
  dashedDangerBorder: `${token.lineWidth}px dashed ${token.colorErrors.colorErrorBorder}`,
  dashedWarningColorBg: token.colorWarnings.colorWarningBg,
  dashedWarningColorBgHover: token.colorWarnings.colorWarningBgHover,
  dashedWarningColor: token.colorWarnings.colorWarning,
  dashedWarningBorder: `${token.lineWidth}px dashed ${token.colorWarnings.colorWarningBorder}`,

  // text
  textColorBg: 'transparent',
  textColorBgHover: token.colorBgTextHover,
  textColor: token.colorPrimarys.colorPrimary,
  textColorHover: token.colorPrimarys.colorPrimaryHover,
  textBorder: `${token.lineWidth}px dashed transparent`,
  textSuccessColorBg: 'transparent',
  textSuccessColorBgHover: token.colorBgTextHover,
  textSuccessColor: token.colorSuccesses.colorSuccess,
  textSuccessColorHover: token.colorSuccesses.colorSuccessHover,
  textSuccessBorder: `${token.lineWidth}px dashed transparent`,
  textDangerColorBg: 'transparent',
  textDangerColorBgHover: token.colorBgTextHover,
  textDangerColor: token.colorErrors.colorError,
  textDangerColorHover: token.colorErrors.colorErrorHover,
  textDangerBorder: `${token.lineWidth}px dashed transparent`,
  textWarningColorBg: 'transparent',
  textWarningColorBgHover: token.colorBgTextHover,
  textWarningColor: token.colorWarnings.colorWarning,
  textWarningColorHover: token.colorWarnings.colorWarningHover,
  textWarningBorder: `${token.lineWidth}px dashed transparent`,

  // outline
  outlineColorBg: 'transparent',
  outlineColor: token.colorPrimarys.colorPrimary,
  outlineColorHover: token.colorPrimarys.colorPrimaryHover,
  outlineBorder: `${token.lineWidth}px ${token.lineType} ${token.colorPrimarys.colorPrimary}`,
  outlineBorderHover: `${token.lineWidth}px ${token.lineType} ${token.colorPrimarys.colorPrimaryHover}`,
  outlineSuccessColorBg: 'transparent',
  outlineSuccessColor: token.colorSuccesses.colorSuccess,
  outlineSuccessColorHover: token.colorSuccesses.colorSuccessHover,
  outlineSuccessBorder: `${token.lineWidth}px ${token.lineType} ${token.colorSuccesses.colorSuccess}`,
  outlineSuccessBorderHover: `${token.lineWidth}px ${token.lineType} ${token.colorSuccesses.colorSuccessHover}`,
  outlineDangerColorBg: 'transparent',
  outlineDangerColor: token.colorErrors.colorError,
  outlineDangerColorHover: token.colorErrors.colorErrorHover,
  outlineDangerBorder: `${token.lineWidth}px ${token.lineType} ${token.colorErrors.colorError}`,
  outlineDangerBorderHover: `${token.lineWidth}px ${token.lineType} ${token.colorErrors.colorErrorHover}`,
  outlineWarningColorBg: 'transparent',
  outlineWarningColor: token.colorWarnings.colorWarning,
  outlineWarningColorHover: token.colorWarnings.colorWarningHover,
  outlineWarningBorder: `${token.lineWidth}px ${token.lineType} ${token.colorWarnings.colorWarning}`,
  outlineWarningBorderHover: `${token.lineWidth}px ${token.lineType} ${token.colorWarnings.colorWarningHover}`,
});

export default genStyleHooks(
  'Button',
  token => {
    console.log('token', token);
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
  // prepareComponentToken,
);
