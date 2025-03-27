import { FullToken, GenerateStyle } from '@/_theme/internal';

interface ButtonToken extends FullToken<'Button'> {}

const genBtnTypeStyle = (btnTypeCls: string, token: ButtonToken, status: string) => {
  const { componentCls } = token;
  return {
    [`> ${componentCls}:not(:last-child)`]: {
      [`&${btnTypeCls}${componentCls}-secondary`]: {
        borderRight: `${token.lineWidth}px ${token.lineType} ${token[`secondary${status}ColorBgHover`]}`,
        '&:active': {
          transform: 'initial',
        },
      },

      [`&${btnTypeCls}${componentCls}-primary`]: {
        borderRight: `${token.lineWidth}px ${token.lineType} ${token[`primary${status}ColorBgHover`]}`,
        '&:active': {
          transform: 'initial',
        },
      },

      [`&${btnTypeCls}${componentCls}-dashed`]: {
        '&:active': {
          transform: 'initial',
        },
      },

      [`&${btnTypeCls}${componentCls}-outline`]: {
        '&:active': {
          transform: 'initial',
        },
      },

      [`&${btnTypeCls}${componentCls}-text`]: {
        '&:active': {
          transform: 'initial',
        },
      },
    },

    [`&-rtl > ${componentCls}:not(:last-child)`]: {
      [`&${btnTypeCls}${componentCls}-secondary`]: {
        borderRight: `${token.lineWidth}px ${token.lineType} transparent`,
      },

      [`&${btnTypeCls}${componentCls}-primary`]: {
        borderRight: `${token.lineWidth}px ${token.lineType} transparent`,
      },
    },

    [`&-rtl > ${componentCls}:not(:first-child)`]: {
      [`&${btnTypeCls}${componentCls}-secondary`]: {
        borderRight: `${token.lineWidth}px ${token.lineType} ${token[`secondary${status}ColorBgHover`]}`,
      },

      [`&${btnTypeCls}${componentCls}-primary`]: {
        borderRight: `${token.lineWidth}px ${token.lineType} ${token[`secondary${status}ColorBgHover`]}`,
      },
    },

    [`> ${componentCls}:not(:first-child)`]: {
      [`&${btnTypeCls}${componentCls}-secondary`]: {
        '&:active': {
          transform: 'initial',
        },
      },

      [`&${btnTypeCls}${componentCls}-primary`]: {
        '&:active': {
          transform: 'initial',
        },
      },

      [`&${btnTypeCls}${componentCls}-dashed`]: {
        marginLeft: `-${token.lineWidth}px`,
        '&:active': {
          transform: 'initial',
        },
      },

      [`&${btnTypeCls}${componentCls}-outline`]: {
        marginLeft: `-${token.lineWidth}px`,
        '&:active': {
          transform: 'initial',
        },
      },

      [`&${btnTypeCls}${componentCls}-text`]: {
        '&:active': {
          transform: 'initial',
        },
      },
    },
  };
};

const genGroupStyle: GenerateStyle<ButtonToken> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-group`]: [
      {
        position: 'relative',
        display: 'inline-flex',

        // Border
        [`> ${componentCls}:not(:last-child)`]: {
          borderStartEndRadius: 0,
          borderEndEndRadius: 0,
        },

        [`> ${componentCls}:not(:first-child)`]: {
          borderStartStartRadius: 0,
          borderEndStartRadius: 0,
        },

        [`&-rtl`]: {
          direction: 'rtl',
        },
      },

      // Border Color
      genBtnTypeStyle(`${componentCls}-default`, token, ''),
      genBtnTypeStyle(`${componentCls}-success`, token, 'Success'),
      genBtnTypeStyle(`${componentCls}-danger`, token, 'Danger'),
      genBtnTypeStyle(`${componentCls}-warning`, token, 'Warning'),
    ],
  };
};

export default genGroupStyle;
