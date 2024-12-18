import { TinyColor } from '@ctrl/tinycolor';
import type { EuiTokenProviderProps, PresetColorType, SeedToken } from '../interface';

export const scheme: EuiTokenProviderProps['scheme'] = !!window.matchMedia('(prefers-color-scheme: dark)')?.matches
  ? 'dark'
  : 'light';

export const defaultPresetColors: PresetColorType = {
  blue: '#1677FF',
  purple: '#722ED1',
  cyan: '#13C2C2',
  green: '#00B41A',
  magenta: '#EB2F96',
  pink: '#EB2F96',
  red: '#FF4D4F',
  orange: '#FA8C16',
  yellow: '#FADB14',
  volcano: '#FA541C',
  geekblue: '#2F54EB',
  gold: '#FAAD14',
  lime: '#A0D911',
};

const seedToken: SeedToken = {
  // preset color palettes
  colors: defaultPresetColors,

  // Color
  colorPrimary: '#1677ff',
  colorSuccess: '#00b41a',
  colorWarning: '#FA8C16',
  colorError: '#f5222d',
  colorInfo: '#1677ff',
  colorLink: '#1677ff',
  colorBlack: '#000',
  colorWhite: '#FFF',
  colorWhiteSecondary: new TinyColor('#FFF').setAlpha(0.75).toRgbString(),
  colorBgMask: new TinyColor('#000').setAlpha(0.45).toRgbString(),
  colorTextBase: '',
  colorBgBase: '',

  // Font
  fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
'Noto Color Emoji'`,
  fontFamilyCode: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`,
  fontSize: 14,

  // Line
  lineWidth: 1,
  lineType: 'solid',

  // Radius
  borderRadius: 4,

  // Size
  sizeUnit: 4,
  sizeStep: 4,

  // Base
  baseHeight: 32,

  // zIndex
  zIndexBase: 0,
  zIndexPopupBase: 1000,

  // Motion
  motion: true,
  motions: {
    unit: 0.1,
    base: 0,
    linear: 'cubic-bezier(0, 0, 1, 1)',
    standard: 'cubic-bezier(0.34, 0.69, 0.1, 1)',
    overshoot: 'cubic-bezier(0.3, 1.3, 0.3, 1)',
    decelerate: 'cubic-bezier(0.4, 0.8, 0.74, 1)',
    accelerate: 'cubic-bezier(0.26, 0, 0.6, 0.2)',
    durationFast: '',
    durationMid: '',
    durationSlow: '',
  },

  // box-shaodw
  shadows: {
    MD: `
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05)
  `,
    XS: `
    0 1px 2px 0 rgba(0, 0, 0, 0.03),
    0 1px 6px -1px rgba(0, 0, 0, 0.02),
    0 2px 4px 0 rgba(0, 0, 0, 0.02)
  `,
  },
};
export default seedToken;
