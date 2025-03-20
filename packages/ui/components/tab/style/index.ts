import { CSSObject, unit } from '@/_cssinjs';
import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {}

interface TagToken extends FullToken<'Tab'> {}

const genTabStyle: GenerateStyle<TagToken> = token => {
  const { componentCls, euiCls } = token;

  return {
    [componentCls]: {
      background: token.colorBgElevated,
      [`&${componentCls}-rtl`]: {
        direction: 'rtl',
      },

      [`${componentCls}-header`]: {
        position: 'relative',
        display: 'flex',
        alignItems: 'end',
        fontWeight: token.fonts.fontWeight,
        gap: token.margins.XS,

        ['&::before']: {
          content: '""',
          clear: 'both',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          backgroundColor: token.colorBorderSecondary,
          display: 'block',
        },

        [`${componentCls}-navs`]: {
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          gap: token.margins.XS,
          transition: `all ${token.motions.durationSlow} ${token.motions.standard}`,

          [`${componentCls}-nav-items`]: {
            display: 'flex',
            whiteSpace: 'nowrap',

            [`${componentCls}-nav-item`]: {
              boxSizing: 'border-box',
              display: 'inline-flex',
              alignItems: 'center',
              gap: token.margins.XXS,
              position: 'relative',

              [`&:not([aria-disabled="true"])`]: {
                cursor: 'pointer',
              },
              [`&[aria-disabled="true"]`]: {
                cursor: 'no-drop',
                color: token.colorTextQuaternary,
              },
            },

            [`${componentCls}-nav-item-active`]: {
              color: token.colorPrimary,
              transition: `all ${token.motions.durationSlow} ${token.motions.standard}`,
            },
          },

          [`${componentCls}-nav-ink`]: {
            position: 'absolute',
            bottom: 0,
            right: 'auto',
            top: 'auto',
            height: token.lineWidth * 2,
            backgroundColor: token.colorPrimary,
            transition: `left ${token.motions.durationMid} ${token.motions.linear}, width ${token.motions.durationMid} ${token.motions.standard}`,
          },
        },

        [`${componentCls}-extra`]: {
          alignSelf: 'center',
        },

        [`${componentCls}-add-icon`]: {
          height: 'auto',
          padding: 1,
          [`&:not(.eui-btn-disabled)`]: {
            color: token.colorTextSecondary,
          },
        },

        [`${componentCls}-delete-icon`]: {
          height: 'auto',
          padding: 1,

          [`&:not(.eui-btn-disabled)`]: {
            color: token.colorTextSecondary,
          },

          [`&[disabled]`]: {
            color: token.colorTextQuaternary,
          },
        },
      },

      [`${componentCls}-content`]: {
        width: '100%',
        overflow: 'hidden',

        [`${componentCls}-panes`]: {
          display: 'flex',
          width: '100%',

          [`${componentCls}-pane-item`]: {
            width: '100%',
            overflow: 'hidden',
            flexShrink: 0,
            // padding: token.paddings.MD,

            [`&-active`]: {
              height: 'auto',
            },
            [`&:not(&-active)`]: {
              height: 0,
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
      [`${componentCls}-header`]: {
        fontSize: token.fonts.fontSizeSM,
        marginBottom: token.margins.XS,

        [`${componentCls}-navs`]: {
          [`${componentCls}-nav-item`]: {
            height: `${token.sizes.XS + 16}px`,
            paddingInline: unit(token.paddings.MD),
          },
        },
      },
    },
    [`${componentCls}-small`]: {
      [`${componentCls}-header`]: {
        fontSize: token.fonts.fontSize,
        marginBottom: token.margins.XS,

        [`${componentCls}-navs`]: {
          [`${componentCls}-nav-item`]: {
            height: `${token.sizes.SM + 16}px`,
            paddingInline: unit(token.paddings.MD),
          },
        },
      },
    },
    [`${componentCls}-medium`]: {
      [`${componentCls}-header`]: {
        fontSize: token.fonts.fontSize,
        marginBottom: token.margins.MD,

        [`${componentCls}-navs`]: {
          [`${componentCls}-nav-item`]: {
            height: `${token.sizes.MD + 16}px`,
            paddingInline: unit(token.paddings.MD),
          },
        },
      },
    },
    [`${componentCls}-large`]: {
      [`${componentCls}-header`]: {
        fontSize: token.fonts.fontSize,
        marginBottom: token.margins.MD,

        [`${componentCls}-navs`]: {
          [`${componentCls}-nav-item`]: {
            height: `${token.sizes.LG + 16}px`,
            paddingInline: unit(token.paddings.MD),
          },
        },
      },
    },
    [`${componentCls}-mini${componentCls}-capsule`]: {
      [`${componentCls}-header`]: {
        [`${componentCls}-navs`]: {
          [`${componentCls}-nav-item`]: {
            height: `${token.sizes.XS + 10}px`,
          },
        },
      },
    },
    [`${componentCls}-small${componentCls}-capsule`]: {
      [`${componentCls}-header`]: {
        [`${componentCls}-navs`]: {
          [`${componentCls}-nav-item`]: {
            height: `${token.sizes.SM + 10}px`,
          },
        },
      },
    },
    [`${componentCls}-medium${componentCls}-capsule`]: {
      [`${componentCls}-header`]: {
        [`${componentCls}-navs`]: {
          [`${componentCls}-nav-item`]: {
            height: `${token.sizes.MD + 10}px`,
          },
        },
      },
    },
    [`${componentCls}-large${componentCls}-capsule`]: {
      [`${componentCls}-header`]: {
        [`${componentCls}-navs`]: {
          [`${componentCls}-nav-item`]: {
            height: `${token.sizes.LG + 10}px`,
          },
        },
      },
    },
  };
};

const genTypeStyle: GenerateStyle<TagToken, CSSObject> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-line`]: {
      [`${componentCls}-header`]: {
        [`${componentCls}-navs`]: {
          [`${componentCls}-nav-item`]: {
            marginInline: token.margins.MD,
            paddingInline: 0,
            zIndex: 1,

            [`&:not([aria-disabled="true"]):not(${componentCls}-nav-item-active):hover::before`]: {
              content: "''",
              top: token.margins.XS / 2,
              bottom: token.margins.XS / 2,
              left: -token.margins.MD / 2,
              right: -token.margins.MD / 2,
              borderRadius: token.borderRadius,
              position: 'absolute',
              background: token.colorBgContainer,
              transition: `all ${token.motions.durationSlow} ${token.motions.standard}`,
              zIndex: -1,
            },

            [`&:not(:first-child)::after`]: {
              position: 'absolute',
              width: token.lineWidth,
              height: '50%',
              left: -token.margins.MD,
              content: '""',
              top: 0,
              transform: 'translateY(50%)',
              background: token.colorBorder,
            },
          },
        },
      },
    },
    [`${componentCls}-card`]: {
      [`${componentCls}-header`]: {
        [`${componentCls}-navs`]: {
          [`${componentCls}-nav-item`]: {
            borderRight: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
            borderTop: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
            borderBottom: `${token.lineWidth}px ${token.lineType} transparent`,

            [`&:first-of-type`]: {
              borderTopLeftRadius: token.borderRadius / 2,
              borderLeft: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
            },

            [`&:last-of-type`]: {
              borderTopRightRadius: token.borderRadius / 2,
            },

            [`&${componentCls}-nav-item-active`]: {
              borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorBgElevated}`,
            },

            [`&[aria-disabled="true"]`]: {
              background: token.colorBgContainerDisabled,
            },
          },
        },
      },
    },
    [`${componentCls}-card-gutter`]: {
      [`${componentCls}-header`]: {
        [`${componentCls}-navs`]: {
          [`${componentCls}-nav-items`]: {
            columnGap: token.margins.XXS,

            [`${componentCls}-nav-item`]: {
              borderRight: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
              borderLeft: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
              borderTop: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
              borderBottom: `${token.lineWidth}px ${token.lineType} transparent`,
              borderTopLeftRadius: token.borderRadius / 2,
              borderTopRightRadius: token.borderRadius / 2,

              [`&[aria-disabled="true"]`]: {
                background: token.colorBgContainerDisabled,
              },

              [`&${componentCls}-nav-item-active`]: {
                borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorBgElevated}`,
              },
            },
          },
        },
      },
    },
    [`${componentCls}-capsule`]: {
      [`${componentCls}-header`]: {
        [`${componentCls}-navs`]: {
          [`${componentCls}-nav-items`]: {
            columnGap: token.margins.XXS - 1,
            background: token.colorBgContainer,
            borderRadius: token.borderRadius / 2,
            padding: token.paddings.XXS - 1,

            [`${componentCls}-nav-item`]: {
              [`&${componentCls}-nav-item-active, &:not([aria-disabled="true"]):hover`]: {
                background: token.colorBgElevated,
                borderRadius: token.borderRadius / 2,
              },

              [`&:not(:last-child):not(${componentCls}-nav-item-active)::before`]: {
                position: 'absolute',
                width: token.lineWidth,
                height: '50%',
                right: -1,
                content: '""',
                top: 0,
                transform: 'translateY(50%)',
                background: token.colorBorder,
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
    console.log(token);
    const tagToken = mergeToken<TagToken>(token, {});
    return [genTabStyle(tagToken), genLayoutStyle(tagToken), genSizeStyle(tagToken), genTypeStyle(tagToken)];
  },
  prepareComponentToken,
);
