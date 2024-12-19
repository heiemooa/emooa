import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';
import { CSSObject, unit } from '@/_cssinjs';
import { CSSProperties } from 'react';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  /**
   * 文本横向内间距
   */
  textPaddingInline?: CSSProperties['paddingInline'];
  /**
   * 文本与边缘距离
   */
  orientationMargin?: number;
  /**
   * 颜色
   */
  colorBorderSecondary?: string;
}

interface DividerToken extends FullToken<'Divider'> {
  dividerHorizontalMargin: number;
  dividerVerticalMargin: number;
}

const genDividerStyle: GenerateStyle<DividerToken, CSSObject> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      color: token.colorText,

      '&-horizontal': {
        width: '100%',
        minWidth: '100%',
        maxWidth: '100%',
        marginBlock: unit(token.dividerHorizontalMargin),

        [`&:not(${componentCls}-dashed):not(${componentCls}-with-text)`]: {
          borderBlockStart: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorderSecondary}`,
        },
        [`&${componentCls}-dashed:not(${componentCls}-with-text)`]: {
          borderBlockStart: `${unit(token.lineWidth)} dashed ${token.colorBorderSecondary}`,
        },
      },

      '&-vertical': {
        display: 'inline-block',
        height: '0.9em',
        marginInline: unit(token.dividerVerticalMargin),
        verticalAlign: 'middle',

        [`&:not(${componentCls}-dashed)`]: {
          borderInlineStart: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorderSecondary}`,
        },
        [`&${componentCls}-dashed`]: {
          borderInlineStart: `${unit(token.lineWidth)} dashed ${token.colorBorderSecondary}`,
        },
      },

      // 仅水平分割线才支持文字，只考虑水平情况
      '&-with-text': {
        display: 'flex',
        alignItems: 'center',

        '&::before, &::after': {
          content: '""',
          height: 0,
          flex: 1,
        },

        [`&:not(${componentCls}-dashed)`]: {
          '&::before, &::after': {
            borderBlockStart: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorderSecondary}`,
          },
        },
        [`&${componentCls}-dashed`]: {
          '&::before, &::after': {
            borderBlockStart: `${unit(token.lineWidth)} dashed ${token.colorBorderSecondary}`,
          },
        },

        '&-left::before': {
          flexBasis: token.orientationMargin,
          flexGrow: 0,
        },

        '&-right::after': {
          flexBasis: token.orientationMargin,
          flexGrow: 0,
        },

        [`${componentCls}-text`]: {
          fontWeight: token.fonts.fontWeight,
          paddingInline: token.textPaddingInline,
        },
      },
    },
  };
};

// ============================== Export ==============================
const prepareComponentToken: GetDefaultToken<'Divider'> = token => ({
  textPaddingInline: token.margins.MD,
  orientationMargin: token.margins.XL,
});
export default genStyleHooks(
  'Divider',
  token => {
    const dividerToken = mergeToken<DividerToken>(token, {
      dividerHorizontalMargin: token.margins.LG,
      dividerVerticalMargin: token.margins.XS,
    });
    return [genDividerStyle(dividerToken)];
  },
  prepareComponentToken,
);
