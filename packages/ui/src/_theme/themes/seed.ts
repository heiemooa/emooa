import type { PresetColorType, SeedToken } from '../interface';

export const defaultPresetColors: PresetColorType = {
  blue: '#1677ff',
  purple: '#722ED1',
  cyan: '#13C2C2',
  green: '#52C41A',
  magenta: '#EB2F96',
  pink: '#eb2f96',
  red: '#ff4d4f',
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
  colorSuccess: '#52c41a',
  colorWarning: '#faad14',
  colorError: '#f5222d',
  colorInfo: '#1677ff',
  colorLink: '',
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
  sizePopupArrow: 16,

  // Base
  baseHeight: 32,

  // zIndex
  zIndexBase: 0,
  zIndexPopupBase: 1000,

  // Image
  opacityImage: 1,

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
};
export default seedToken;
