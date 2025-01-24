import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';
import { CSSObject, unit } from '@/_cssinjs';
import { AliasToken } from '@/_theme/interface';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {}

interface GridToken extends FullToken<'Grid'> {}

interface GridColToken extends FullToken<'Grid'> {
  /**
   * @desc 网格列数
   * @descEN Number of grid columns
   */
  gridColumns: number;
}

const genLoopGridColumnsStyle = (token: GridColToken, sizeCls: string): CSSObject => {
  const { prefixCls, componentCls, gridColumns } = token;

  const gridColumnsStyle: CSSObject = {};
  for (let i = gridColumns; i >= 0; i--) {
    if (i === 0) {
      gridColumnsStyle[`${componentCls}${sizeCls}-${i}`] = {
        display: 'none',
      };
      gridColumnsStyle[`${componentCls}-push-${i}`] = {
        insetInlineStart: 'auto',
      };
      gridColumnsStyle[`${componentCls}-pull-${i}`] = {
        insetInlineEnd: 'auto',
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-push-${i}`] = {
        insetInlineStart: 'auto',
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-pull-${i}`] = {
        insetInlineEnd: 'auto',
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-offset-${i}`] = {
        marginInlineStart: 0,
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-order-${i}`] = {
        order: 0,
      };
    } else {
      gridColumnsStyle[`${componentCls}${sizeCls}-${i}`] = [
        {
          display: 'block',
          flex: `0 0 ${(i / gridColumns) * 100}%`,
          maxWidth: `${(i / gridColumns) * 100}%`,
        },
      ];
      gridColumnsStyle[`${componentCls}${sizeCls}-push-${i}`] = {
        insetInlineStart: `${(i / gridColumns) * 100}%`,
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-pull-${i}`] = {
        insetInlineEnd: `${(i / gridColumns) * 100}%`,
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-offset-${i}`] = {
        marginInlineStart: `${(i / gridColumns) * 100}%`,
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-order-${i}`] = {
        order: i,
      };
    }
  }

  return gridColumnsStyle;
};

const genColSpanStyle = (token: GridColToken, sizeCls: string): CSSObject => genLoopGridColumnsStyle(token, sizeCls);

const genGridMediaStyle = (token: GridColToken, screenSize: number, sizeCls: string): CSSObject => {
  if (sizeCls === '-xs') {
    return genColSpanStyle(token, '-xs');
  } else {
    return {
      [`@media (min-width: ${unit(screenSize)})`]: {
        ...genColSpanStyle(token, sizeCls),
      },
    };
  }
};

const getMediaSize = (token: AliasToken) => {
  const mediaSizesMap = {
    xs: token.screens.XS,
    sm: token.screens.SM,
    md: token.screens.MD,
    lg: token.screens.LG,
    xl: token.screens.XL,
    xxl: token.screens.XXL,
  } as const;

  return mediaSizesMap;
};

const genGridStyle: GenerateStyle<GridToken, CSSObject> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'flex',
      flexFlow: 'row wrap',

      '&-rtl': {
        direction: 'rtl',
      },

      '&-no-wrap': {
        flexWrap: 'nowrap',
      },
    },
  };
};

const genRowStyle: GenerateStyle<GridToken, CSSObject> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      '&-align-start': {
        alignItems: 'flex-start',
      },
      '&-align-center': {
        alignItems: 'center',
      },
      '&-align-end': {
        alignItems: 'flex-end',
      },
      '&-justify-start': {
        justifyContent: 'flex-start',
      },
      '&-justify-center': {
        justifyContent: 'center',
      },
      '&-justify-end': {
        justifyContent: 'flex-end',
      },
      '&-justify-space-around': {
        justifyContent: 'space-around',
      },
      '&-justify-space-between': {
        justifyContent: 'space-between',
      },
    },
  };
};

const genColStyle: GenerateStyle<GridToken, CSSObject> = token => {
  const { componentCls, euiCls } = token;

  return {
    [componentCls]: {
      position: 'relative',
      boxSizing: 'border-box',
    },
  };
};

// ============================== Export ==============================
const prepareComponentToken: GetDefaultToken<'Grid'> = token => ({});

export const useRowStyle = genStyleHooks(
  'Grid',
  token => {
    const gridToken = mergeToken<GridToken>(token, {});
    return [genGridStyle(gridToken), genRowStyle(gridToken)];
  },
  prepareComponentToken,
);

export const useColStyle = genStyleHooks(
  'Grid',
  token => {
    const gridToken: GridColToken = mergeToken<GridColToken>(token, {
      gridColumns: 24,
    });

    const gridMediaSizesMap: Record<string, number> = getMediaSize(gridToken);

    return [
      genColStyle(gridToken),
      genColSpanStyle(gridToken, ''),
      Object.keys(gridMediaSizesMap)
        .map(key => genGridMediaStyle(gridToken, gridMediaSizesMap[key], `-${key}`))
        .reduce((pre, cur) => ({ ...pre, ...cur }), {}),
    ];
  },
  prepareComponentToken,
);
