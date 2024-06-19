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
}

interface DividerToken extends FullToken<'Divider'> {
  dividerHorizontalMargin: number;
  dividerVerticalMargin: number;
}

const genDividerStyle: GenerateStyle<DividerToken, CSSObject> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      '&-horizontal': {
        width: '100%',
        minWidth: '100%',
        maxWidth: '100%',
        marginBlock: unit(token.dividerHorizontalMargin),

        [`&:not(${componentCls}-dashed):not(${componentCls}-with-text)`]: {
          borderBlockStart: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
        },
        [`&${componentCls}-dashed:not(${componentCls}-with-text)`]: {
          borderBlockStart: `${unit(token.lineWidth)} dashed ${token.colorSplit}`,
        },
      },

      '&-vertical': {
        display: 'inline-block',
        height: '0.9em',
        marginInline: unit(token.dividerVerticalMargin),
        verticalAlign: 'middle',

        [`&:not(${componentCls}-dashed)`]: {
          borderInlineStart: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
        },
        [`&${componentCls}-dashed`]: {
          borderInlineStart: `${unit(token.lineWidth)} dashed ${token.colorSplit}`,
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
            borderBlockStart: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
          },
        },
        [`&${componentCls}-dashed`]: {
          '&::before, &::after': {
            borderBlockStart: `${unit(token.lineWidth)} dashed ${token.colorSplit}`,
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
          fontWeight: token.fontWeight,
          paddingInline: token.textPaddingInline,
        },
      },
    },
  };
};

// ============================== Export ==============================
const prepareComponentToken: GetDefaultToken<'Divider'> = token => ({
  textPaddingInline: token.margin,
  orientationMargin: token.marginXL,
});
export default genStyleHooks(
  'Divider',
  token => {
    const dividerToken = mergeToken<DividerToken>(token, {
      dividerHorizontalMargin: token.marginLG,
      dividerVerticalMargin: token.marginXS,
    });
    return [genDividerStyle(dividerToken)];
  },
  prepareComponentToken,
);
