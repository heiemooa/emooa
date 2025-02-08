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
      [`&:not(${componentCls}-disabled):not(${componentCls}-loading)`]: {
        backgroundColor: token[`${type}${status}ColorBg`],
        color: token[`${type}${status}Color`],
        border: token[`${type}${status}Border`],
      },

      '&:focus-visible': {
        boxShadow: `0 0 0 2px ${token[`${type}${status}ColorBgHover`]}`,
      },

      [`&:not(${componentCls}-disabled):not(:active):not(${componentCls}-loading):hover`]: {
        backgroundColor: token[`${type}${status}ColorBgHover`],
        color: token[`${type}${status}ColorHover`],
        border: token[`${type}${status}BorderHover`],
      },

      [`&${componentCls}-disabled`]: {
        backgroundColor: token[`${type}${status}DisabledColorBg`],
        color: token[`${type}${status}DisabledColor`],
        border: token[`${type}${status}DisabledBorder`],
      },
      [`&${componentCls}-loading`]: {
        backgroundColor: token[`${type}${status}LoadingColorBg`],
        color: token[`${type}${status}LoadingColor`],
        border: token[`${type}${status}LoadingBorder`],
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
const prepareComponentToken: GetDefaultToken<'Button'> = token => {
  return {
    /**  Type  */
    // secondary
    secondaryColor: token.colorText,
    secondaryColorHover: token.colorText,
    secondaryColorBg: token.colorBgContainer,
    secondaryColorBgHover: token.colorBorder,
    secondaryBorder: `${token.lineWidth}px ${token.lineType} transparent`,
    secondaryBorderHover: `${token.lineWidth}px ${token.lineType} transparent`,
    secondaryDisabledColor: token.colorTextQuaternary,
    secondaryDisabledColorBg: token.colorBgContainerDisabled,
    secondaryDisabledBorder: `${token.lineWidth}px ${token.lineType} transparent`,
    secondaryLoadingColor: token.colorTextSecondary,
    secondaryLoadingColorBg: token.colorBgContainer,
    secondaryLoadingBorder: `${token.lineWidth}px ${token.lineType} transparent`,

    secondarySuccessColor: token.colorSuccesses[6],
    secondarySuccessColorHover: token.colorSuccesses[6],
    secondarySuccessColorBg: token.colorSuccesses[1],
    secondarySuccessColorBgHover: token.colorSuccesses[2],
    secondarySuccessBorder: `${token.lineWidth}px ${token.lineType} transparent`,
    secondarySuccessBorderHover: `${token.lineWidth}px ${token.lineType} transparent`,
    secondarySuccessDisabledColor: token.colorSuccesses[3],
    secondarySuccessDisabledColorBg: token.colorSuccesses[1],
    secondarySuccessDisabledBorder: `${token.lineWidth}px ${token.lineType} transparent`,
    secondarySuccessLoadingColor: token.colorSuccesses[6],
    secondarySuccessLoadingColorBg: token.colorSuccesses[1],
    secondarySuccessLoadingBorder: `${token.lineWidth}px ${token.lineType} transparent`,

    secondaryDangerColor: token.colorErrors[6],
    secondaryDangerColorHover: token.colorErrors[6],
    secondaryDangerColorBg: token.colorErrors[1],
    secondaryDangerColorBgHover: token.colorErrors[2],
    secondaryDangerBorder: `${token.lineWidth}px ${token.lineType} transparent`,
    secondaryDangerBorderHover: `${token.lineWidth}px ${token.lineType} transparent`,
    secondaryDangerDisabledColor: token.colorErrors[3],
    secondaryDangerDisabledColorBg: token.colorErrors[1],
    secondaryDangerDisabledBorder: `${token.lineWidth}px ${token.lineType} transparent`,
    secondaryDangerLoadingColor: token.colorErrors[6],
    secondaryDangerLoadingColorBg: token.colorErrors[1],
    secondaryDangerLoadingBorder: `${token.lineWidth}px ${token.lineType} transparent`,

    secondaryWarningColor: token.colorWarnings[6],
    secondaryWarningColorHover: token.colorWarnings[6],
    secondaryWarningColorBg: token.colorWarnings[1],
    secondaryWarningColorBgHover: token.colorWarnings[2],
    secondaryWarningBorder: `${token.lineWidth}px ${token.lineType} transparent`,
    secondaryWarningBorderHover: `${token.lineWidth}px ${token.lineType} transparent`,
    secondaryWarningDisabledColor: token.colorWarnings[3],
    secondaryWarningDisabledColorBg: token.colorWarnings[1],
    secondaryWarningDisabledBorder: `${token.lineWidth}px ${token.lineType} transparent`,
    secondaryWarningLoadingColor: token.colorWarnings[6],
    secondaryWarningLoadingColorBg: token.colorWarnings[1],
    secondaryWarningLoadingBorder: `${token.lineWidth}px ${token.lineType} transparent`,

    // primary
    primaryColor: token.colorWhite,
    primaryColorHover: token.colorWhite,
    primaryColorBg: token.colorPrimarys[6],
    primaryColorBgHover: token.colorPrimarys[5],
    primaryBorder: `${token.lineWidth}px ${token.lineType} transparent`,
    primaryBorderHover: `${token.lineWidth}px ${token.lineType} transparent`,
    primaryDisabledColor: token.colorWhiteTertiary,
    primaryDisabledColorBg: token.colorPrimarys[3],
    primaryDisabledBorder: `${token.lineWidth}px ${token.lineType} transparent`,
    primaryLoadingColor: token.colorWhite,
    primaryLoadingColorBg: token.colorPrimarys[4],
    primaryLoadingBorder: `${token.lineWidth}px ${token.lineType} transparent`,

    primarySuccessColor: token.colorWhite,
    primarySuccessColorHover: token.colorWhite,
    primarySuccessColorBg: token.colorSuccesses[6],
    primarySuccessColorBgHover: token.colorSuccesses[5],
    primarySuccessBorder: `${token.lineWidth}px ${token.lineType} transparent`,
    primarySuccessBorderHover: `${token.lineWidth}px ${token.lineType} transparent`,
    primarySuccessDisabledColor: token.colorWhiteTertiary,
    primarySuccessDisabledColorBg: token.colorSuccesses[3],
    primarySuccessDisabledBorder: `${token.lineWidth}px ${token.lineType} transparent`,
    primarySuccessLoadingColor: token.colorWhite,
    primarySuccessLoadingColorBg: token.colorSuccesses[4],
    primarySuccessLoadingBorder: `${token.lineWidth}px ${token.lineType} transparent`,

    primaryDangerColor: token.colorWhite,
    primaryDangerColorHover: token.colorWhite,
    primaryDangerColorBg: token.colorErrors[6],
    primaryDangerColorBgHover: token.colorErrors[5],
    primaryDangerBorder: `${token.lineWidth}px ${token.lineType} transparent`,
    primaryDangerBorderHover: `${token.lineWidth}px ${token.lineType} transparent`,
    primaryDangerDisabledColor: token.colorWhiteTertiary,
    primaryDangerDisabledColorBg: token.colorErrors[3],
    primaryDangerDisabledBorder: `${token.lineWidth}px ${token.lineType} transparent`,
    primaryDangerLoadingColor: token.colorWhite,
    primaryDangerLoadingColorBg: token.colorErrors[4],
    primaryDangerLoadingBorder: `${token.lineWidth}px ${token.lineType} transparent`,

    primaryWarningColor: token.colorWhite,
    primaryWarningColorHover: token.colorWhite,
    primaryWarningColorBg: token.colorWarnings[6],
    primaryWarningColorBgHover: token.colorWarnings[5],
    primaryWarningBorder: `${token.lineWidth}px ${token.lineType} transparent`,
    primaryWarningBorderHover: `${token.lineWidth}px ${token.lineType} transparent`,
    primaryWarningDisabledColor: token.colorWhiteTertiary,
    primaryWarningDisabledColorBg: token.colorWarnings[3],
    primaryWarningDisabledBorder: `${token.lineWidth}px ${token.lineType} transparent`,
    primaryWarningLoadingColor: token.colorWhite,
    primaryWarningLoadingColorBg: token.colorWarnings[4],
    primaryWarningLoadingBorder: `${token.lineWidth}px ${token.lineType} transparent`,

    // dashed
    dashedColor: token.colorText,
    dashedColorHover: token.colorText,
    dashedColorBg: token.colorBgContainer,
    dashedColorBgHover: token.colorBorder,
    dashedBorder: `${token.lineWidth}px dashed ${token.colorBorder}`,
    dashedBorderHover: `${token.lineWidth}px dashed ${token.colorBorderSecondary}`,
    dashedDisabledColor: token.colorTextQuaternary,
    dashedDisabledColorBg: token.colorBgContainerDisabled,
    dashedDisabledBorder: `${token.lineWidth}px dashed ${token.colorBorder}`,
    dashedLoadingColor: token.colorTextSecondary,
    dashedLoadingColorBg: token.colorBgContainer,
    dashedLoadingBorder: `${token.lineWidth}px dashed ${token.colorBorder}`,

    dashedSuccessColor: token.colorSuccesses[6],
    dashedSuccessColorHover: token.colorSuccesses[6],
    dashedSuccessColorBg: token.colorSuccesses[1],
    dashedSuccessColorBgHover: token.colorSuccesses[2],
    dashedSuccessBorder: `${token.lineWidth}px dashed ${token.colorSuccesses[3]}`,
    dashedSuccessBorderHover: `${token.lineWidth}px dashed ${token.colorSuccesses[4]}`,
    dashedSuccessDisabledColor: token.colorSuccesses[3],
    dashedSuccessDisabledColorBg: token.colorSuccesses[1],
    dashedSuccessDisabledBorder: `${token.lineWidth}px dashed ${token.colorSuccesses[2]}`,
    dashedSuccessLoadingColor: token.colorSuccesses[6],
    dashedSuccessLoadingColorBg: token.colorSuccesses[1],
    dashedSuccessLoadingBorder: `${token.lineWidth}px dashed ${token.colorSuccesses[3]}`,

    dashedDangerColor: token.colorErrors[6],
    dashedDangerColorHover: token.colorErrors[6],
    dashedDangerColorBg: token.colorErrors[1],
    dashedDangerColorBgHover: token.colorErrors[2],
    dashedDangerBorder: `${token.lineWidth}px dashed ${token.colorErrors[3]}`,
    dashedDangerBorderHover: `${token.lineWidth}px dashed ${token.colorErrors[4]}`,
    dashedDangerDisabledColor: token.colorErrors[3],
    dashedDangerDisabledColorBg: token.colorErrors[1],
    dashedDangerDisabledBorder: `${token.lineWidth}px dashed ${token.colorErrors[2]}`,
    dashedDangerLoadingColor: token.colorErrors[6],
    dashedDangerLoadingColorBg: token.colorErrors[1],
    dashedDangerLoadingBorder: `${token.lineWidth}px dashed ${token.colorErrors[3]}`,

    dashedWarningColor: token.colorWarnings[6],
    dashedWarningColorHover: token.colorWarnings[6],
    dashedWarningColorBg: token.colorWarnings[1],
    dashedWarningColorBgHover: token.colorWarnings[2],
    dashedWarningBorder: `${token.lineWidth}px dashed ${token.colorWarnings[3]}`,
    dashedWarningBorderHover: `${token.lineWidth}px dashed ${token.colorWarnings[4]}`,
    dashedWarningDisabledColor: token.colorWarnings[3],
    dashedWarningDisabledColorBg: token.colorWarnings[1],
    dashedWarningDisabledBorder: `${token.lineWidth}px dashed ${token.colorWarnings[2]}`,
    dashedWarningLoadingColor: token.colorWarnings[6],
    dashedWarningLoadingColorBg: token.colorWarnings[1],
    dashedWarningLoadingBorder: `${token.lineWidth}px dashed ${token.colorWarnings[3]}`,

    // outline
    outlineColor: token.colorPrimarys[6],
    outlineColorHover: token.colorPrimarys[5],
    outlineColorBg: 'transparent',
    outlineColorBgHover: 'transparent',
    outlineBorder: `${token.lineWidth}px ${token.lineType} ${token.colorPrimarys[6]}`,
    outlineBorderHover: `${token.lineWidth}px ${token.lineType} ${token.colorPrimarys[5]}`,
    outlineDisabledColor: token.colorPrimarys[3],
    outlineDisabledColorBg: 'transparent',
    outlineDisabledBorder: `${token.lineWidth}px ${token.lineType} ${token.colorPrimarys[3]}`,
    outlineLoadingColor: token.colorPrimarys[5],
    outlineLoadingColorBg: 'transparent',
    outlineLoadingBorder: `${token.lineWidth}px ${token.lineType} ${token.colorPrimarys[5]}`,

    outlineSuccessColor: token.colorSuccesses[6],
    outlineSuccessColorHover: token.colorSuccesses[5],
    outlineSuccessColorBg: 'transparent',
    outlineSuccessColorBgHover: 'transparent',
    outlineSuccessBorder: `${token.lineWidth}px ${token.lineType} ${token.colorSuccesses[6]}`,
    outlineSuccessBorderHover: `${token.lineWidth}px ${token.lineType} ${token.colorSuccesses[5]}`,
    outlineSuccessDisabledColor: token.colorSuccesses[3],
    outlineSuccessDisabledColorBg: 'transparent',
    outlineSuccessDisabledBorder: `${token.lineWidth}px ${token.lineType} ${token.colorSuccesses[3]}`,
    outlineSuccessLoadingColor: token.colorSuccesses[5],
    outlineSuccessLoadingColorBg: 'transparent',
    outlineSuccessLoadingBorder: `${token.lineWidth}px ${token.lineType} ${token.colorSuccesses[5]}`,

    outlineDangerColor: token.colorErrors[6],
    outlineDangerColorHover: token.colorErrors[5],
    outlineDangerColorBg: 'transparent',
    outlineDangerColorBgHover: 'transparent',
    outlineDangerBorder: `${token.lineWidth}px ${token.lineType} ${token.colorErrors[6]}`,
    outlineDangerBorderHover: `${token.lineWidth}px ${token.lineType} ${token.colorErrors[5]}`,
    outlineDangerDisabledColor: token.colorErrors[3],
    outlineDangerDisabledColorBg: 'transparent',
    outlineDangerDisabledBorder: `${token.lineWidth}px ${token.lineType} ${token.colorErrors[3]}`,
    outlineDangerLoadingColor: token.colorErrors[5],
    outlineDangerLoadingColorBg: 'transparent',
    outlineDangerLoadingBorder: `${token.lineWidth}px ${token.lineType} ${token.colorErrors[5]}`,

    outlineWarningColor: token.colorWarnings[6],
    outlineWarningColorHover: token.colorWarnings[5],
    outlineWarningColorBg: 'transparent',
    outlineWarningColorBgHover: 'transparent',
    outlineWarningBorder: `${token.lineWidth}px ${token.lineType} ${token.colorWarnings[6]}`,
    outlineWarningBorderHover: `${token.lineWidth}px ${token.lineType} ${token.colorWarnings[5]}`,
    outlineWarningDisabledColor: token.colorWarnings[3],
    outlineWarningDisabledColorBg: 'transparent',
    outlineWarningDisabledBorder: `${token.lineWidth}px ${token.lineType} ${token.colorWarnings[3]}`,
    outlineWarningLoadingColor: token.colorWarnings[5],
    outlineWarningLoadingColorBg: 'transparent',
    outlineWarningLoadingBorder: `${token.lineWidth}px ${token.lineType} ${token.colorWarnings[5]}`,

    // text
    textColor: token.colorPrimarys[6],
    textColorHover: token.colorPrimarys[5],
    textColorBg: 'transparent',
    textColorBgHover: token.colorBgTextHover,
    textBorder: `${token.lineWidth}px dashed transparent`,
    textBorderHover: `${token.lineWidth}px dashed transparent`,
    textDisabledColor: token.colorPrimarys[3],
    textDisabledColorBg: 'transparent',
    textDisabledBorder: `${token.lineWidth}px ${token.lineType} transparent`,
    textLoadingColor: token.colorPrimarys[5],
    textLoadingColorBg: 'transparent',
    textLoadingBorder: `${token.lineWidth}px ${token.lineType} transparent`,

    textSuccessColor: token.colorSuccesses[6],
    textSuccessColorHover: token.colorSuccesses[5],
    textSuccessColorBg: 'transparent',
    textSuccessColorBgHover: token.colorBgTextHover,
    textSuccessBorder: `${token.lineWidth}px dashed transparent`,
    textSuccessBorderHover: `${token.lineWidth}px dashed transparent`,
    textSuccessDisabledColorBg: 'transparent',
    textSuccessDisabledColor: token.colorSuccesses[3],
    textSuccessDisabledBorder: `${token.lineWidth}px ${token.lineType} transparent`,
    textSuccessLoadingColor: token.colorSuccesses[5],
    textSuccessLoadingColorBg: 'transparent',
    textSuccessLoadingBorder: `${token.lineWidth}px ${token.lineType} transparent`,

    textDangerColor: token.colorErrors[6],
    textDangerColorHover: token.colorErrors[5],
    textDangerColorBg: 'transparent',
    textDangerColorBgHover: token.colorBgTextHover,
    textDangerBorder: `${token.lineWidth}px dashed transparent`,
    textDangerBorderHover: `${token.lineWidth}px dashed transparent`,
    textDangerDisabledColor: token.colorErrors[3],
    textDangerDisabledColorBg: 'transparent',
    textDangerDisabledBorder: `${token.lineWidth}px ${token.lineType} transparent`,
    textDangerLoadingColor: token.colorErrors[5],
    textDangerLoadingColorBg: 'transparent',
    textDangerLoadingBorder: `${token.lineWidth}px ${token.lineType} transparent`,

    textWarningColor: token.colorWarnings[6],
    textWarningColorHover: token.colorWarnings[5],
    textWarningColorBg: 'transparent',
    textWarningColorBgHover: token.colorBgTextHover,
    textWarningBorder: `${token.lineWidth}px dashed transparent`,
    textWarningBorderHover: `${token.lineWidth}px dashed transparent`,
    textWarningDisabledColor: token.colorWarnings[3],
    textWarningDisabledColorBg: 'transparent',
    textWarningDisabledBorder: `${token.lineWidth}px ${token.lineType} transparent`,
    textWarningLoadingColor: token.colorWarnings[5],
    textWarningLoadingColorBg: 'transparent',
    textWarningLoadingBorder: `${token.lineWidth}px ${token.lineType} transparent`,
  };
};

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
