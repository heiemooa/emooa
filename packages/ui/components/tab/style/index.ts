import { CSSObject, unit } from '@/_cssinjs';
import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {}

interface TagToken extends FullToken<'Tab'> {}

const genTabStyle: GenerateStyle<TagToken> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      [`&${componentCls}-rtl`]: {
        direction: 'rtl',
      },

      [`${componentCls}-header`]: {
        position: 'relative',
        display: 'flex',
        alignItems: 'end',
        fontWeight: token.fonts.fontWeight,

        ['&::before']: {
          content: '""',
          clear: 'both',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          backgroundColor: token.colorBorder,
          display: 'block',
        },

        [`${componentCls}-navs`]: {
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          flex: 1,
        },
      },
      [`${componentCls}-content`]: {},
    },
  };
};

const genSizeStyle: GenerateStyle<TagToken, CSSObject> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-mini`]: {
      [`${componentCls}-header`]: {
        fontSize: token.fonts.fontSizeSM,
        [`${componentCls}-navs`]: {
          [`${componentCls}-nav-item`]: {
            paddingBlock: unit(token.paddings.XXS / 2),
            paddingInline: unit(token.paddings.SM),
          },
        },
      },
      [`${componentCls}-content`]: {
        padding: `${token.paddings.XXS}px ${token.paddings.MD}px`,
      },
    },
    [`${componentCls}-small`]: {
      [`${componentCls}-header`]: {
        fontSize: token.fonts.fontSize,

        [`${componentCls}-navs`]: {
          [`${componentCls}-nav-item`]: {
            paddingBlock: unit(token.paddings.XXS / 2),
            paddingInline: unit(token.paddings.MD),
          },
        },
      },
      [`${componentCls}-content`]: {
        padding: `${token.paddings.XS}px ${token.paddings.MD}px`,
      },
    },
    [`${componentCls}-medium`]: {
      [`${componentCls}-header`]: {
        fontSize: token.fonts.fontSize,

        [`${componentCls}-navs`]: {
          [`${componentCls}-nav-item`]: {
            paddingBlock: unit(token.paddings.XXS),
            paddingInline: unit(token.paddings.MD),
          },
        },
      },
      [`${componentCls}-content`]: {
        padding: `${token.paddings.MD}px ${token.paddings.MD}px`,
      },
    },
    [`${componentCls}-large`]: {
      [`${componentCls}-header`]: {
        fontSize: token.fonts.fontSize,
        [`${componentCls}-navs`]: {
          [`${componentCls}-nav-item`]: {
            paddingBlock: unit(token.paddings.XXS + 2),
            paddingInline: unit(token.paddings.MD),
          },
        },
      },
      [`${componentCls}-content`]: {
        padding: `${token.paddings.LG}px ${token.paddings.MD}px`,
      },
    },
  };
};

const genTypeStyle: GenerateStyle<TagToken, CSSObject> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-line`]: {},
    [`${componentCls}-card`]: {
      [`${componentCls}-header`]: {
        [`${componentCls}-navs`]: {
          [`${componentCls}-nav-item`]: {
            borderRight: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
            borderTop: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,

            [`&:first-of-type`]: {
              borderTopLeftRadius: token.borderRadius / 2,
              borderLeft: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
            },

            [`&:last-of-type`]: {
              borderTopRightRadius: token.borderRadius / 2,
            },

            [`&${componentCls}-nav-item-active`]: {
              borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorBgBase}`,
            },
          },
        },
      },
    },
    [`${componentCls}-card-gutter`]: {
      [`${componentCls}-header`]: {
        [`${componentCls}-navs`]: {
          columnGap: token.margins.XXS,
          [`${componentCls}-nav-item`]: {
            borderRight: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
            borderLeft: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
            borderTop: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
            borderTopLeftRadius: token.borderRadius / 2,
            borderTopRightRadius: token.borderRadius / 2,
          },
        },
      },
    },
    [`${componentCls}-large`]: {
      [`${componentCls}-header`]: {
        fontSize: token.fonts.fontSize,
        [`${componentCls}-navs`]: {
          [`${componentCls}-nav-item`]: {
            paddingBlock: unit(token.paddings.XXS + 2),
            paddingInline: unit(token.paddings.MD),
          },
        },
      },
      [`${componentCls}-content`]: {
        padding: `${token.paddings.LG}px ${token.paddings.MD}px`,
      },
    },
  };
};

const genLayoutStyle: GenerateStyle<TagToken, CSSObject> = token => {
  const { componentCls } = token;

  return {
    // [`${componentCls}-layout-inline-horizontal`]: {
    //   [`${componentCls}-body`]: {
    //     [`${componentCls}-table`]: {
    //       [`${componentCls}-row`]: {
    //         [`${componentCls}-item`]: {
    //           [`${componentCls}-item-container`]: {
    //             display: 'flex',
    //             [`${componentCls}-item-label-inline`]: {
    //               marginRight: token.margins.XS,
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    // [`${componentCls}-layout-horizontal`]: {
    //   [`${componentCls}-body`]: {
    //     [`${componentCls}-table`]: {
    //       tableLayout: 'initial',
    //       [`${componentCls}-row`]: {
    //         [`${componentCls}-item-label`]: {
    //           paddingRight: token.margins.LG,
    //           width: 1,
    //         },
    //       },
    //     },
    //   },
    //   [`&${componentCls}-bordered`]: {
    //     [`${componentCls}-body`]: {
    //       [`${componentCls}-table`]: {
    //         [`${componentCls}-row`]: {
    //           verticalAlign: 'middle',
    //         },
    //       },
    //     },
    //   },
    // },
    // [`${componentCls}-layout-vertical`]: {
    //   [`&${componentCls}-bordered`]: {
    //     [`${componentCls}-body`]: {
    //       [`${componentCls}-table`]: {
    //         [`${componentCls}-row`]: {
    //           verticalAlign: 'middle',
    //         },
    //       },
    //     },
    //   },
    // },
    // [`${componentCls}-layout-inline-vertical`]: {
    //   [`${componentCls}-body`]: {
    //     [`${componentCls}-table`]: {
    //       [`${componentCls}-row`]: {
    //         [`${componentCls}-item`]: {
    //           [`${componentCls}-item-label-inline`]: {
    //             marginBottom: token.margins.XXS / 2,
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
  };
};
// ============================== Export ==============================
const prepareComponentToken: GetDefaultToken<'Tab'> = () => ({});

export default genStyleHooks(
  'Tab',
  token => {
    console.log(token.paddings);
    const tagToken = mergeToken<TagToken>(token, {});
    return [genTabStyle(tagToken), genLayoutStyle(tagToken), genSizeStyle(tagToken), genTypeStyle(tagToken)];
  },
  prepareComponentToken,
);
