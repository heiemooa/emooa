import { CSSObject, unit } from '@/_cssinjs';
import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {}

interface TagToken extends FullToken<'Description'> {}

const genDescriptionStyle: GenerateStyle<TagToken> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      [`&${componentCls}-rtl`]: {
        direction: 'rtl',
      },

      [`${componentCls}-title`]: {
        fontWeight: token.fonts.fontWeight,
      },
      [`${componentCls}-body`]: {
        [`${componentCls}-table`]: {
          width: '100%',
          borderCollapse: 'collapse',
          tableLayout: 'fixed',

          [`${componentCls}-row`]: {
            verticalAlign: 'top',

            [`${componentCls}-item-label, ${componentCls}-item-label-inline`]: {
              color: token.colorTextTertiary,
              fontWeight: token.fonts.fontWeight,
              whiteSpace: 'nowrap',
            },
            [`${componentCls}-item-has-colon:after`]: {
              content: '":"',
              position: 'relative',
              top: -0.5, // magic for position
              marginInline: `${unit(token.margins.XXS / 2)} ${unit(token.margins.XXS)}`,
            },
          },
        },
      },

      [`&${componentCls}-bordered`]: {
        [`${componentCls}-body`]: {
          boxSizing: 'border-box',
          border: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
          borderRadius: token.borderRadius,

          [`${componentCls}-table`]: {
            [`${componentCls}-row`]: {
              [`${componentCls}-item-label`]: {
                background: token.colorFillQuaternary,
                color: token.colorTextSecondary,
              },
              [`&:not(:last-child)`]: {
                borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
              },
              [`${componentCls}-item-label, ${componentCls}-item-value, ${componentCls}-item`]: {
                [`&:not(:last-child)`]: {
                  borderRight: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
                },
              },
            },
          },
        },
      },
    },
  };
};

const genSizeStyle: GenerateStyle<TagToken, CSSObject> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-mini`]: {
      fontSize: token.fonts.fontSizeSM,

      [`${componentCls}-title`]: {
        fontSize: token.fonts.fontSizeHeading5,
        marginBottom: token.margins.XS,
      },
      [`&:not(${componentCls}-bordered)`]: {
        [`${componentCls}-body`]: {
          [`${componentCls}-table`]: {
            [`${componentCls}-row`]: {
              [`${componentCls}-item-label, ${componentCls}-item-value, ${componentCls}-item`]: {
                paddingBottom: token.paddings.XXS,
              },
            },
          },
        },
      },
      [`&${componentCls}-bordered`]: {
        [`${componentCls}-body`]: {
          [`${componentCls}-table`]: {
            [`${componentCls}-row`]: {
              [`${componentCls}-item-label, ${componentCls}-item-value, ${componentCls}-item`]: {
                padding: `${token.paddings.XXS - 1}px ${token.paddings.XS}px`,
              },
            },
          },
        },
      },
    },
    [`${componentCls}-small`]: {
      fontSize: token.fonts.fontSize,

      [`${componentCls}-title`]: {
        fontSize: token.fonts.fontSizeHeading5,
        marginBottom: token.margins.XS,
      },
      [`&:not(${componentCls}-bordered)`]: {
        [`${componentCls}-body`]: {
          [`${componentCls}-table`]: {
            [`${componentCls}-row`]: {
              [`${componentCls}-item-label, ${componentCls}-item-value, ${componentCls}-item`]: {
                paddingBottom: token.paddings.XS,
              },
            },
          },
        },
      },
      [`&${componentCls}-bordered`]: {
        [`${componentCls}-body`]: {
          [`${componentCls}-table`]: {
            [`${componentCls}-row`]: {
              [`${componentCls}-item-label, ${componentCls}-item-value, ${componentCls}-item`]: {
                padding: `${token.paddings.XXS - 1}px ${token.paddings.MD}px`,
              },
            },
          },
        },
      },
    },
    [`${componentCls}-medium`]: {
      fontSize: token.fonts.fontSize,

      [`${componentCls}-title`]: {
        fontSize: token.fonts.fontSizeHeading5,
        marginBottom: token.margins.MD,
      },
      [`&:not(${componentCls}-bordered)`]: {
        [`${componentCls}-body`]: {
          [`${componentCls}-table`]: {
            [`${componentCls}-row`]: {
              [`${componentCls}-item-label, ${componentCls}-item-value, ${componentCls}-item`]: {
                paddingBottom: token.paddings.MD - 4,
              },
            },
          },
        },
      },
      [`&${componentCls}-bordered`]: {
        [`${componentCls}-body`]: {
          [`${componentCls}-table`]: {
            [`${componentCls}-row`]: {
              [`${componentCls}-item-label, ${componentCls}-item-value, ${componentCls}-item`]: {
                padding: `${token.paddings.XS - 1}px ${token.paddings.MD}px`,
              },
            },
          },
        },
      },
    },
    [`${componentCls}-large`]: {
      fontSize: token.fonts.fontSize,

      [`${componentCls}-title`]: {
        fontSize: token.fonts.fontSizeHeading5,
        marginBottom: token.margins.MD,
      },
      [`&:not(${componentCls}-bordered)`]: {
        [`${componentCls}-body`]: {
          [`${componentCls}-table`]: {
            [`${componentCls}-row`]: {
              [`${componentCls}-item-label, ${componentCls}-item-value, ${componentCls}-item`]: {
                paddingBottom: token.paddings.MD,
              },
            },
          },
        },
      },
      [`&${componentCls}-bordered`]: {
        [`${componentCls}-body`]: {
          [`${componentCls}-table`]: {
            [`${componentCls}-row`]: {
              [`${componentCls}-item-label, ${componentCls}-item-value, ${componentCls}-item`]: {
                padding: `${token.paddings.MD + 1}px ${token.paddings.MD}px`,
              },
            },
          },
        },
      },
    },
  };
};

const genLayoutStyle: GenerateStyle<TagToken, CSSObject> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-layout-inline-horizontal`]: {
      [`${componentCls}-body`]: {
        [`${componentCls}-table`]: {
          [`${componentCls}-row`]: {
            [`${componentCls}-item`]: {
              [`${componentCls}-item-container`]: {
                display: 'flex',
                [`${componentCls}-item-label-inline`]: {
                  marginRight: token.margins.XS,
                },
              },
            },
          },
        },
      },
    },
    [`${componentCls}-layout-horizontal`]: {
      [`${componentCls}-body`]: {
        [`${componentCls}-table`]: {
          tableLayout: 'initial',
          [`${componentCls}-row`]: {
            [`${componentCls}-item-label`]: {
              paddingRight: token.margins.LG,
              width: 1,
            },
          },
        },
      },
      [`&${componentCls}-bordered`]: {
        [`${componentCls}-body`]: {
          [`${componentCls}-table`]: {
            [`${componentCls}-row`]: {
              verticalAlign: 'middle',
            },
          },
        },
      },
    },
    [`${componentCls}-layout-vertical`]: {
      [`&${componentCls}-bordered`]: {
        [`${componentCls}-body`]: {
          [`${componentCls}-table`]: {
            [`${componentCls}-row`]: {
              verticalAlign: 'middle',
            },
          },
        },
      },
    },
    [`${componentCls}-layout-inline-vertical`]: {
      [`${componentCls}-body`]: {
        [`${componentCls}-table`]: {
          [`${componentCls}-row`]: {
            [`${componentCls}-item`]: {
              [`${componentCls}-item-label-inline`]: {
                marginBottom: token.margins.XXS / 2,
              },
            },
          },
        },
      },
    },
  };
};
// ============================== Export ==============================
const prepareComponentToken: GetDefaultToken<'Description'> = () => ({});

export default genStyleHooks(
  'Description',
  token => {
    const tagToken = mergeToken<TagToken>(token, {});
    return [genDescriptionStyle(tagToken), genLayoutStyle(tagToken), genSizeStyle(tagToken)];
  },
  prepareComponentToken,
);
