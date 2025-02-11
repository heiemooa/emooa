import { CSSObject } from '@/_cssinjs';
import { PresetColors } from '@/_theme/interface';
import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';
import { getAlphaColor } from '@/_theme/themes/dark/colorAlgorithm';
import { map } from 'lodash';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {}

interface TagToken extends FullToken<'Alert'> {}

const genAlertStyle: GenerateStyle<TagToken> = token => {
  const { componentCls, euiCls } = token;

  return {
    [componentCls]: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: `0px ${token.sizes.XS}px`,
      borderRadius: token.rounded.MD,
      whiteSpace: 'nowrap',
      color: token.colorText,
      gap: token.sizes.XXS,
      border: `${token.lineWidth}px ${token.lineType} transparent`,
      transition: `all ${token.motions.durationFast} ${token.motions.linear}`,

      'a, a:hover': {
        color: token.colorText,
      },

      [`&${componentCls}-rtl`]: {
        direction: 'rtl',
      },

      [`${componentCls}-close-btn`]: {
        height: 16,
      },

      [`&${componentCls}-hide`]: {
        display: 'none',
      },

      [`&${componentCls}-checked`]: {
        backgroundColor: token.colorBgContainer,

        [`&${componentCls}-bordered`]: {
          borderColor: token.colorBorder,
        },

        [`${componentCls}-close-btn`]: {
          [`${euiCls}-icon`]: {
            color: token.colorTextSecondary,
          },
        },

        [`&${componentCls}-custom-color`]: {
          color: token.colorWhiteSecondary,

          'a, a:hover': {
            color: token.colorWhiteSecondary,
          },

          [`${componentCls}-close-btn`]: {
            color: token.colorWhiteSecondary,

            [`${euiCls}-icon`]: {
              color: token.colorWhiteSecondary,
            },
          },
        },
      },
      [`&:not(${componentCls}-checked)`]: {
        [`${componentCls}-close-btn`]: {
          [`${euiCls}-icon`]: {
            color: token.colorTextSecondary,
          },
        },
      },

      [`&${componentCls}-checkable`]: {
        cursor: 'pointer',

        '&:hover': {
          backgroundColor: token.colorBgContainer,
        },
        [`&${componentCls}-checked:hover`]: {
          backgroundColor: token.colorBorder,
        },
      },
    },
  };
};

const genTagSizeStyle: GenerateStyle<TagToken, CSSObject> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-mini`]: {
      fontSize: token.fonts.fontSizeSM - 2,
      height: `${token.sizes.XS + 12}px`,
    },
    [`${componentCls}-small`]: {
      fontSize: token.fonts.fontSizeSM,
      height: `${token.sizes.SM + 12}px`,
    },
    [`${componentCls}-medium`]: {
      fontSize: token.fonts.fontSize - 1,
      height: `${token.sizes.MD + 12}px`,
    },
    [`${componentCls}-large`]: {
      fontSize: token.fonts.fontSize,
      height: `${token.sizes.LG + 12}px`,
    },
  };
};

const genPresetStyle = (token: TagToken) => {
  const { componentCls, euiCls } = token;
  return {
    [`${componentCls}-light`]: map(PresetColors, color => {
      return {
        [`&${componentCls}-checked${componentCls}-${color}`]: {
          color: token.colors[`${color}7`],
          background: token.colors[`${color}1`],

          'a, a:hover': {
            color: token.colors[`${color}7`],
          },

          [`&${componentCls}-bordered`]: {
            borderColor: token.colors[`${color}3`],
          },
          [`${componentCls}-close-btn`]: {
            color: token.colorText,

            [`${euiCls}-icon`]: {
              color: token.colors[`${color}5`],

              '&:hover': {
                color: token.colors[`${color}7`],
              },
            },
          },

          '&:hover': {
            background: getAlphaColor(token.colors[`${color}6`], 0.25),
          },
        },

        [`&:not(${componentCls}-checked)${componentCls}-${color}`]: {
          [`${componentCls}-close-btn`]: {
            color: token.colorText,

            [`${euiCls}-icon`]: {
              color: token.colorTextSecondary,
            },
          },
        },
      };
    }),
    [`${componentCls}-dark`]: map(PresetColors, color => {
      return {
        [`&${componentCls}-checked${componentCls}-${color}`]: {
          background: getAlphaColor(token.colors[`${color}6`], 0.25),

          'a, a:hover': {
            color: token.colorText,
          },

          [`&${componentCls}-bordered`]: {
            borderColor: token.colors[`${color}5`],
          },

          [`${componentCls}-close-btn`]: {
            height: 16,
            color: token.colorText,

            [`${euiCls}-icon`]: {
              color: token.colorText,
            },
          },

          '&:hover': {
            background: getAlphaColor(token.colors[`${color}6`], 0.25),
          },
        },

        [`&:not(${componentCls}-checked)${componentCls}-${color}`]: {
          [`${componentCls}-close-btn`]: {
            color: token.colorText,

            [`${euiCls}-icon`]: {
              color: token.colorTextSecondary,
            },
          },
        },
      };
    }),
  };
};

// ============================== Export ==============================
const prepareComponentToken: GetDefaultToken<'Alert'> = () => ({});

export default genStyleHooks(
  'Alert',
  token => {
    const tagToken = mergeToken<TagToken>(token, {});
    return [genAlertStyle(tagToken), genTagSizeStyle(tagToken), genPresetStyle(tagToken)];
  },
  prepareComponentToken,
);
