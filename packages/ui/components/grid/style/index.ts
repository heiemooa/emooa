import type { FullToken, GenerateStyle, GetDefaultToken } from '@/_theme/internal';
import { genStyleHooks, mergeToken } from '@/_theme/internal';
import { CSSObject } from '@/_cssinjs';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {}

interface GridToken extends FullToken<'Grid'> {}

const genGridStyle: GenerateStyle<GridToken, CSSObject> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'flex',
      flexFlow: 'row wrap',

      '&-rtl': {
        direction: 'rtl',
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
      [`${euiCls}-col`]: {
        position: 'relative',
        boxSizing: 'border-box',
      },
    },
  };
};

// ============================== Export ==============================
const prepareComponentToken: GetDefaultToken<'Grid'> = token => ({});
export default genStyleHooks(
  'Grid',
  token => {
    const gridToken = mergeToken<GridToken>(token, {});
    return [genGridStyle(gridToken), genRowStyle(gridToken), genColStyle(gridToken)];
  },
  prepareComponentToken,
);
