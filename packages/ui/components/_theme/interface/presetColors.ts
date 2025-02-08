import { ColorNeutralBaseen } from './base/colors';

export const PresetColors = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
  'gray',
] as const;

export type PresetColorKey = (typeof PresetColors)[number];

export type PresetColorType = Record<PresetColorKey, string>;

type ColorPaletteKeyIndex = 1 | 2 | 3 | 4 | 5 | 6;

export type ColorPalettes = {
  [key in `${keyof PresetColorType}${ColorPaletteKeyIndex}`]: string;
};

type ColorMap = Record<ColorPaletteKeyIndex, string>;
export type GenerateColorMap = (baseColor: string) => ColorMap;
export type GenerateNeutralColorMap = (bgBaseColor: string, textBaseColor: string) => ColorNeutralBaseen;
