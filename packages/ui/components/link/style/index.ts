import { CSSObject } from '@/_cssinjs';
import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {}

interface LinkToken extends FullToken<'Link'> {}

const genLinkStyle: GenerateStyle<LinkToken> = token => {
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
      fontSize: token.fonts.fontSize,
      padding: `0px  ${token.sizes.XXS}px`,
      borderRadius: token.rounded.MD,

      [`&${componentCls}-icon-only`]: {
        aspectRatio: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },

      '&:focus': {
        outline: 0,
      },

      [`&:not(${componentCls}-rtl)`]: {
        '& > svg + span': {
          marginLeft: token.paddings.XXS,
        },
        '& > span + svg': {
          marginLeft: token.paddings.XXS,
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

// Type
const genLinkTypeStyle: GenerateStyle<LinkToken, CSSObject> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      [`&${componentCls}-default`]: genLinkStatusStyle(token, ''),
      [`&${componentCls}-success`]: genLinkStatusStyle(token, 'Success'),
      [`&${componentCls}-danger`]: genLinkStatusStyle(token, 'Danger'),
      [`&${componentCls}-warning`]: genLinkStatusStyle(token, 'Warning'),
    },
  };
};

const genLinkStatusStyle = (token: LinkToken, status): CSSObject => {
  const { componentCls } = token;
  return {
    '&': {
      [`&:not(${componentCls}-disabled)`]: {
        backgroundColor: token[`link${status}ColorBg`],
        color: token[`link${status}Color`],
      },

      '&:focus-visible': {
        boxShadow: `0 0 0 2px ${token[`link${status}ColorBgHover`]}`,
      },

      [`&${componentCls}-hoverable:not(${componentCls}-disabled):not(:active):not(${componentCls}-loading):hover`]: {
        backgroundColor: token[`link${status}ColorBgHover`],
        color: token[`link${status}ColorHover`],
      },
      [`&:not(${componentCls}-hoverable):not(${componentCls}-disabled):not(:active):not(${componentCls}-loading):hover`]:
        {
          color: token[`link${status}ColorHover`],
        },

      [`&${componentCls}-disabled`]: {
        backgroundColor: token[`link${status}DisabledColorBg`],
        color: token[`link${status}DisabledColor`],
      },
    },
  };
};
// ============================== Export ==============================
const prepareComponentToken: GetDefaultToken<'Link'> = token => {
  return {
    linkColor: token.colorPrimarys[6],
    linkColorHover: token.colorPrimarys[5],
    linkColorBg: 'transparent',
    linkColorBgHover: token.colorBgTextHover,
    linkDisabledColor: token.colorPrimarys[3],
    linkDisabledColorBg: 'transparent',

    linkSuccessColor: token.colorSuccesses[6],
    linkSuccessColorHover: token.colorSuccesses[5],
    linkSuccessColorBg: 'transparent',
    linkSuccessColorBgHover: token.colorBgTextHover,
    linkSuccessDisabledColorBg: 'transparent',
    linkSuccessDisabledColor: token.colorSuccesses[3],

    linkDangerColor: token.colorErrors[6],
    linkDangerColorHover: token.colorErrors[5],
    linkDangerColorBg: 'transparent',
    linkDangerColorBgHover: token.colorBgTextHover,
    linkDangerDisabledColor: token.colorErrors[3],
    linkDangerDisabledColorBg: 'transparent',

    linkWarningColor: token.colorWarnings[6],
    linkWarningColorHover: token.colorWarnings[5],
    linkWarningColorBg: 'transparent',
    linkWarningColorBgHover: token.colorBgTextHover,
    linkWarningDisabledColor: token.colorWarnings[3],
    linkWarningDisabledColorBg: 'transparent',
  };
};

export default genStyleHooks(
  'Link',
  token => {
    const linkToken = mergeToken<LinkToken>(token, {});
    return [genLinkStyle(linkToken), genLinkTypeStyle(linkToken)];
  },
  prepareComponentToken,
);
